
"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Book, User as UserIcon, Edit, Loader2 } from 'lucide-react';
import { requestBookAction } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "./auth-provider";
import { z } from "zod";


const RequestBookSchema = z.object({
  title: z.string().min(1, { message: "Title is required." }),
  author: z.string().min(1, { message: "Author is required." }),
  reason: z.string().optional(),
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
      Submit Request
    </Button>
  );
}

export default function RequestBookForm() {
  const { user } = useAuth();
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [open, setOpen] = useState(false);

  const clientAction = async (prevState: any, formData: FormData) => {
    if (!user) {
        toast({ title: "Authentication Error", description: "You must be logged in to request a book.", variant: "destructive" });
        return { error: "User not authenticated." };
    }

    const validatedFields = RequestBookSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        const errorMessages = Object.values(validatedFields.error.flatten().fieldErrors).flat().join(' ');
        toast({ title: "Validation Error", description: errorMessages, variant: "destructive" });
        return { error: errorMessages };
    }
    
    formData.append('userId', user.uid);
    return requestBookAction(prevState, formData);
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
        description: "Your book request has been submitted.",
      });
      formRef.current?.reset();
      setOpen(false);
    }
  }, [state, toast, setOpen]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Request New Book</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Request a New Book</DialogTitle>
          <DialogDescription>
            Can't find what you're looking for? Let us know and we'll try to add it.
          </DialogDescription>
        </DialogHeader>
        <form ref={formRef} action={formAction} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              <Book className="inline-block mr-2 h-4 w-4 text-muted-foreground" />
              Title
            </Label>
            <Input id="title" name="title" placeholder="Book Title" className="col-span-3" required/>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="author" className="text-right">
              <UserIcon className="inline-block mr-2 h-4 w-4 text-muted-foreground" />
              Author
            </Label>
            <Input id="author" name="author" placeholder="Author's Name" className="col-span-3" required/>
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="reason" className="text-right pt-2">
              <Edit className="inline-block mr-2 h-4 w-4 text-muted-foreground" />
              Reason
            </Label>
            <Textarea id="reason" name="reason" placeholder="Tell us why you'd like to read this book" className="col-span-3" />
          </div>
          <SubmitButton />
        </form>
      </DialogContent>
    </Dialog>
  );
}

