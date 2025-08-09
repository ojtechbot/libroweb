
"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, PlusCircle, Type, User as UserIcon, Book, Tag } from 'lucide-react';
import { addBookAction } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";


const AddBookSchema = z.object({
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
      Add Book
    </Button>
  );
}

export default function AddBookForm() {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  const clientAction = async (prevState: any, formData: FormData) => {
    const validatedFields = AddBookSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        const errorMessages = Object.values(validatedFields.error.flatten().fieldErrors).flat().join(' ');
        toast({ title: "Validation Error", description: errorMessages, variant: "destructive" });
        return { error: errorMessages };
    }
    
    return addBookAction(prevState, formData);
  };
  
  const [state, formAction] = useActionState(clientAction, initialState);


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
        description: "The new book has been added.",
      });
      formRef.current?.reset();
      setOpen(false);
    }
  }, [state, toast]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
            <PlusCircle className="mr-2 h-4 w-4"/>
            Add New Book
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add a New Book</DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new book to the catalog.
          </DialogDescription>
        </DialogHeader>
        <form ref={formRef} action={formAction} className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" placeholder="Book Title" required/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="author">Author</Label>
            <Input id="author" name="author" placeholder="Author's Name" required/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input id="category" name="category" placeholder="e.g., Science, History" required/>
          </div>
           <div className="space-y-2">
            <Label htmlFor="summary">Summary</Label>
            <Textarea id="summary" name="summary" placeholder="A brief summary of the book..." rows={5} required/>
          </div>
           <div className="space-y-2">
            <Label htmlFor="coverUrl">Cover Image URL</Label>
            <Input id="coverUrl" name="coverUrl" placeholder="https://placehold.co/300x450" />
          </div>

          <SubmitButton />
        </form>
         <DialogClose asChild>
            <button ref={closeButtonRef} className="hidden">Close</button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
