
"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Edit } from 'lucide-react';
import { updateBookAction } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { type Book } from "@/lib/data";


const EditBookSchema = z.object({
  title: z.string().min(1, "Title is required."),
  author: z.string().min(1, "Author is required."),
  category: z.string().min(1, "Category is required."),
  summary: z.string().min(10, "Summary must be at least 10 characters."),
  coverUrl: z.string().url("Must be a valid URL.").optional().or(z.literal('')),
});


const initialState = {
  error: undefined,
  success: undefined,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
       {pending && <Loader2 className="animate-spin mr-2" />}
      Update Book
    </Button>
  );
}

interface EditBookFormProps {
    book: Book;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}


export default function EditBookForm({ book, open, onOpenChange }: EditBookFormProps) {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useActionState(updateBookAction.bind(null, book.id), initialState);

  useEffect(() => {
    if (state.error) {
      toast({
        title: "Error",
        description: state.error,
        variant: "destructive",
      });
    }
    if (state.success) {
      toast({
        title: "Success!",
        description: "The book has been updated.",
      });
      onOpenChange(false);
    }
  }, [state, toast, onOpenChange]);
  
   useEffect(() => {
    // Reset form state when dialog is closed
    if (!open) {
       formRef.current?.reset();
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Book Details</DialogTitle>
          <DialogDescription>
            Update the information for "{book.title}".
          </DialogDescription>
        </DialogHeader>
        <form ref={formRef} action={formAction} className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" defaultValue={book.title} required/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="author">Author</Label>
            <Input id="author" name="author" defaultValue={book.author} required/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input id="category" name="category" defaultValue={book.category} required/>
          </div>
           <div className="space-y-2">
            <Label htmlFor="summary">Summary</Label>
            <Textarea id="summary" name="summary" defaultValue={book.summary} rows={5} required/>
          </div>
           <div className="space-y-2">
            <Label htmlFor="coverUrl">Cover Image URL</Label>
            <Input id="coverUrl" name="coverUrl" defaultValue={book.coverUrl} />
          </div>

          <SubmitButton />
        </form>
      </DialogContent>
    </Dialog>
  );
}
