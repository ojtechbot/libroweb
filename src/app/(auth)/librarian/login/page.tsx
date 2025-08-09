

"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, KeyRound, Loader2, Library } from "lucide-react";
import { PasswordInput } from "@/components/ui/password-input";
import { librarianLoginAction } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/components/auth-provider";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


const initialState = {
    error: undefined,
    success: undefined,
    user: undefined,
};


function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button className="w-full" type="submit" disabled={pending}>
      {pending && <Loader2 className="animate-spin" />}
      Sign in
    </Button>
  );
}

export default function LibrarianLoginPage() {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, login } = useAuth();
  const [state, formAction] = useActionState(librarianLoginAction, initialState);
  const errorParam = searchParams.get('error');


  useEffect(() => {
    if (state.error) {
        toast({
          title: "Login Failed",
          description: state.error,
          variant: "destructive",
        });
    }
    if (state.success && state.user) {
      login(state.user);
      router.replace("/librarian");
    }
  }, [state, toast, router, login]);

  useEffect(() => {
    if (user && (user.role === 'librarian' || user.role === 'admin')) {
      router.replace("/librarian");
    }
  }, [user, router]);


  return (
     <div className="flex min-h-screen items-center justify-center bg-muted/40">
        <Card className="w-full max-w-sm">
        <form action={formAction}>
            <CardHeader className="text-center">
                <div className="mx-auto bg-primary rounded-full p-3 w-fit text-primary-foreground mb-2">
                    <Library className="h-8 w-8" />
                </div>
                <CardTitle className="text-2xl font-headline">Librarian Portal</CardTitle>
                <CardDescription>
                    Enter your librarian credentials below.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
             {errorParam === 'unauthorized' && !state.error && (
                <Alert variant="destructive">
                    <AlertTitle>Unauthorized</AlertTitle>
                    <AlertDescription>You do not have permission to access this page.</AlertDescription>
                </Alert>
            )}
            <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="librarian@libroweb.io"
                    required
                    className="pl-10"
                    defaultValue="librarian@libroweb.io"
                />
                </div>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <PasswordInput id="password" name="password" required className="pl-10" placeholder="••••••••" defaultValue="Librarian123" />
                </div>
            </div>
            </CardContent>
            <CardFooter className="flex flex-col">
            <SubmitButton />
            </CardFooter>
        </form>
        </Card>
     </div>
  );
}
