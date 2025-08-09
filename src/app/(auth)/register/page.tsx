

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
import Link from "next/link";
import { User, Mail, KeyRound, Loader2, AlertCircle } from "lucide-react";
import { PasswordInput } from "@/components/ui/password-input";
import { registerAction } from "@/app/actions";
import { useRouter } from "next/navigation";
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
      Create Account
    </Button>
  );
}


export default function RegisterPage() {
    const router = useRouter();
    const { user, loading, login } = useAuth();
    const [state, formAction] = useActionState(registerAction, initialState);

    useEffect(() => {
        if (user && !loading) {
            router.replace("/dashboard");
        }
    }, [user, loading, router]);

    useEffect(() => {
      if (state.success && state.user) {
        login(state.user);
        router.replace("/dashboard");
      }
    }, [state, router, login]);


    if (loading || user) {
       return (
          <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center py-12">
             <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
      )
    }

    return (
      <Card className="w-full max-w-sm">
        <form action={formAction}>
          <CardHeader>
            <CardTitle className="text-2xl font-headline">Register</CardTitle>
            <CardDescription>
              Create an account to start your journey with LibroWeb.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
             {state.error && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Registration Failed</AlertTitle>
                    <AlertDescription>{state.error}</AlertDescription>
                </Alert>
            )}
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="name" name="name" placeholder="John Doe" required className="pl-10" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                  className="pl-10"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <PasswordInput id="password" name="password" required className="pl-10" placeholder="••••••••" />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <SubmitButton />
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="underline text-primary">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    );
}
