
"use client";

import { useState, useTransition, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, User, MessageSquare, Loader2, Sparkles } from "lucide-react";
import { smartReply, type SmartReplyInput } from "@/ai/flows/smart-reply-flow";

export default function ContactPage() {
  const [message, setMessage] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const handler = setTimeout(() => {
      if (message.length > 10) {
        startTransition(async () => {
          const input: SmartReplyInput = {
            history: [{ role: 'user', content: message }],
          };
          try {
            const result = await smartReply(input);
            setSuggestions(result.replies);
          } catch (error) {
            console.error("Smart Reply error:", error);
            setSuggestions([]);
          }
        });
      } else {
        setSuggestions([]);
      }
    }, 500); // Debounce API calls

    return () => {
      clearTimeout(handler);
    };
  }, [message]);

  const handleSuggestionClick = (suggestion: string) => {
    setMessage(prev => `${prev} ${suggestion}`);
    setSuggestions([]);
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold">
          Get in Touch
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          We&apos;d love to hear from you. Whether you have a question about our
          collection, services, or anything else, our team is ready to answer
          all your questions.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <Card>
          <CardHeader>
            <CardTitle>Send us a message</CardTitle>
            <CardDescription>
              Fill out the form below and we will get back to you as soon as
              possible.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="name" placeholder="Your Name" className="pl-10" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                 <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                 <div className="relative">
                   <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Textarea
                      id="message"
                      placeholder="Your message..."
                      rows={5}
                      className="pl-10"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                 </div>
              </div>

               {isPending && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin"/>
                    <span>Generating suggestions...</span>
                </div>
              )}
              
              {suggestions.length > 0 && (
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground font-semibold">
                       <Sparkles className="h-4 w-4 text-yellow-500" />
                       <span>Smart Reply Suggestions</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {suggestions.map((suggestion, index) => (
                            <Button key={index} variant="outline" size="sm" onClick={() => handleSuggestionClick(suggestion)}>
                                {suggestion}
                            </Button>
                        ))}
                    </div>
                </div>
              )}


              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
        <div className="space-y-8 pt-4">
          <h3 className="text-2xl font-headline font-semibold">
            Contact Information
          </h3>
          <div className="space-y-6 text-muted-foreground">
            <div className="flex items-start gap-4">
              <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-foreground">Our Address</h4>
                <p>123 Library Lane, Knowledge City, 12345</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Mail className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-foreground">Email</h4>
                <p>contact@libroweb.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-foreground">Phone</h4>
                <p>+1 (234) 567-890</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
