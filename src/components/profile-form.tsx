
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { findUserByEmail, getUserProfile, updateUserProfileAction } from "@/app/actions";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "./auth-provider";
import { Skeleton } from "./ui/skeleton";

// Updated schema with optional email
const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  email: z.string().email("Please enter a valid email.").optional().or(z.literal('')),
  bio: z.string().max(160).min(4),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function ProfileForm() {
  const { user, reload } = useAuth();
  const [loading, setLoading] = useState(true);
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: "",
      email: "",
      bio: "",
    },
    mode: "onChange",
  });
  
  useEffect(() => {
    async function fetchProfile() {
      if (user) {
        try {
          const profile = await getUserProfile(user.uid);
          if (profile) {
            form.reset({
              username: profile.username || profile.name || "",
              email: profile.email || "",
              bio: profile.bio || "I love reading!",
            });
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
          toast({
            title: "Error",
            description: "Could not fetch your profile data.",
            variant: "destructive",
          });
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    }
    fetchProfile();
  }, [user, form]);

  async function onSubmit(data: ProfileFormValues) {
    if (!user) {
      toast({ 
        title: "Error", 
        description: "You must be logged in to update your profile.", 
        variant: "destructive" 
      });
      return;
    }
    try {
      // Check if email is being changed to an existing one
      if (data.email && data.email !== user.email) {
          const existingUser = await findUserByEmail(data.email);
          if (existingUser && existingUser.uid !== user.uid) {
              form.setError("email", { message: "This email is already in use." });
              return;
          }
      }

      await updateUserProfileAction(user.uid, { 
        username: data.username, 
        name: data.username, 
        email: data.email,
        bio: data.bio 
      });
      reload(); // Reload auth context to reflect changes everywhere
      toast({
        title: "Success",
        description: "Your profile has been updated.",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    }
  }

  const { isSubmitting, isValid } = form.formState;

  if (loading) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-10 w-1/2" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-10 w-1/2" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-10 w-32" />
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Your username" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name. It can be your real name or a
                pseudonym.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input 
                  type="email"
                  placeholder="Your email address" 
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Your email address is optional.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                You can <span>@mention</span> other users and organizations to
                link to them.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button 
          type="submit" 
          disabled={isSubmitting || !isValid}
          className="w-full sm:w-auto"
        >
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Update profile
        </Button>
      </form>
    </Form>
  );
}
