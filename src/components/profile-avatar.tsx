
"use client";

import { useState, useRef, useEffect, useTransition } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Loader2, User, Camera, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "./auth-provider";
import { getUserProfile, updateUserProfileAction } from "@/app/actions";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { generateAvatar } from "@/ai/flows/generate-avatar-flow";

const DEFAULT_AVATAR = "data:image/jpeg;base64,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";

interface ProfileAvatarProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function ProfileAvatar({ className = "", size = "md" }: ProfileAvatarProps) {
  const { toast } = useToast();
  const { user, reload } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isGenerateOpen, setIsGenerateOpen] = useState(false);
  const [generatePrompt, setGeneratePrompt] = useState("");
  const [isGenerating, startGeneratingTransition] = useTransition();

  const sizeClasses = {
    sm: "h-16 w-16",
    md: "h-24 w-24",
    lg: "h-32 w-32",
  };

  const iconSizes = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  };

  useEffect(() => {
    async function fetchAvatar() {
      if (user) {
        const profile = await getUserProfile(user.uid);
        setAvatarUrl(profile?.avatarUrl || DEFAULT_AVATAR);
      } else {
        setAvatarUrl(DEFAULT_AVATAR);
      }
    }
    fetchAvatar();
  }, [user]);

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };
  
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to update your profile picture.",
        variant: "destructive",
      });
      return;
    }

    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.match(/image\/(jpeg|png)/)) {
      toast({ title: "Invalid file type", description: "Please upload a JPEG or PNG.", variant: "destructive" });
      return;
    }
    if (file.size > 2 * 1024 * 1024) { // 2MB limit
      toast({ title: "File too large", description: "Image must be smaller than 2MB.", variant: "destructive" });
      return;
    }

    setUploading(true);

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result as string;
      try {
        await updateUserProfileAction(user.uid, { avatarUrl: base64String });
        setAvatarUrl(base64String);
        reload(); // Reload auth context to reflect avatar change
        toast({ title: "Success", description: "Profile picture updated!" });
      } catch (error) {
        console.error("Error updating avatar:", error);
        toast({ title: "Error", description: "Failed to update profile picture.", variant: "destructive" });
      } finally {
        setUploading(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    };
    reader.readAsDataURL(file);
  };
  
  const handleGenerateAvatar = async () => {
    if (!user) return;
    startGeneratingTransition(async () => {
        try {
            const result = await generateAvatar({ prompt: generatePrompt });
            await updateUserProfileAction(user.uid, { avatarUrl: result.avatarDataUri });
            setAvatarUrl(result.avatarDataUri);
            reload();
            toast({ title: "Avatar Generated!", description: "Your new AI-powered avatar is ready." });
            setIsGenerateOpen(false);
            setGeneratePrompt("");
        } catch (error) {
            console.error("Error generating avatar:", error);
            toast({ title: "Generation Failed", description: "Could not generate avatar. Please check the console for details.", variant: "destructive" });
        }
    });
  }

  return (
    <>
        <div className={`relative group ${className}`}>
        <Avatar className={`${sizeClasses[size]} transition-opacity duration-300 ${uploading ? "opacity-50" : ""}`}>
            <AvatarImage 
            src={avatarUrl || DEFAULT_AVATAR} 
            alt="User avatar" 
            className="object-cover"
            />
            <AvatarFallback className="bg-muted">
            <User className={`${iconSizes[size]} text-muted-foreground`} />
            </AvatarFallback>
        </Avatar>

        <div 
            className={`absolute inset-0 bg-black/40 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${uploading ? "opacity-100" : ""}`}
            aria-hidden={!uploading}
        >
            <div className="flex gap-2">
                <Button
                    size="icon"
                    variant="ghost"
                    className="text-white hover:bg-white/20 hover:text-white"
                    onClick={handleFileSelect}
                    disabled={uploading}
                    aria-label={uploading ? "Uploading profile picture" : "Change profile picture"}
                >
                    {uploading ? (
                    <Loader2 className="h-6 w-6 animate-spin" />
                    ) : (
                    <Camera className="h-6 w-6" />
                    )}
                </Button>
                <Button
                    size="icon"
                    variant="ghost"
                    className="text-white hover:bg-white/20 hover:text-white"
                    onClick={() => setIsGenerateOpen(true)}
                    disabled={uploading}
                    aria-label="Generate avatar with AI"
                >
                   <Sparkles className="h-6 w-6" />
                </Button>
            </div>
            <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/png, image/jpeg"
            aria-hidden="true"
            />
        </div>
        </div>

        <Dialog open={isGenerateOpen} onOpenChange={setIsGenerateOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Generate AI Avatar</DialogTitle>
                    <DialogDescription>
                        Describe the avatar you want to create. Be creative!
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-2">
                    <Label htmlFor="prompt">Prompt</Label>
                    <Input 
                        id="prompt" 
                        value={generatePrompt} 
                        onChange={(e) => setGeneratePrompt(e.target.value)}
                        placeholder="e.g., a cartoon robot reading a book"
                    />
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsGenerateOpen(false)} disabled={isGenerating}>Cancel</Button>
                    <Button onClick={handleGenerateAvatar} disabled={isGenerating || !generatePrompt}>
                       {isGenerating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Generate
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </>
  );
}
