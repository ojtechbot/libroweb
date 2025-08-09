
'use client';

import { useState, useTransition, useRef, useEffect } from 'react';
import { Send, User, Bot, Loader2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { bookChat, type BookChatInput } from '@/ai/flows/book-chat-flow';
import { smartReply, type SmartReplyInput } from '@/ai/flows/smart-reply-flow';
import { useAuth } from '@/components/auth-provider';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Markdown from 'react-markdown';


interface Message {
  role: 'user' | 'model';
  content: string;
}

const initialMessages: Message[] = [
    {
        role: 'model',
        content: "Hello! I'm your friendly AI librarian. I can help you find books, answer questions about our catalog, and suggest your next great read. How can I help you today?"
    }
];

export default function ChatPage() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isResponding, setIsResponding] = useState(false);
  const [isFetchingSuggestions, setIsFetchingSuggestions] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  }

  const getSmartReplies = async (currentMessages: Message[]) => {
    if (currentMessages.length === 0) return;
    setIsFetchingSuggestions(true);
    try {
      const result = await smartReply({ history: currentMessages });
      setSuggestions(result.replies);
    } catch (error) {
      console.error("Smart Reply error:", error);
      setSuggestions([]);
    } finally {
        setIsFetchingSuggestions(false);
    }
  };

  const handleSendMessage = (messageContent: string) => {
    if (!messageContent.trim()) return;
    setSuggestions([]);

    const newMessages: Message[] = [...messages, { role: 'user', content: messageContent }];
    setMessages(newMessages);
    setInput('');
    setIsResponding(true);

    const chatInput: BookChatInput = { 
        history: newMessages,
        ...(user && { user: { name: user.name || 'there' } })
    };

    bookChat(chatInput)
      .then(response => {
        const fullResponse: Message[] = [...newMessages, { role: 'model', content: response }];
        setMessages(fullResponse);
        getSmartReplies(fullResponse);
      })
      .catch(error => {
        console.error("Chat Error:", error);
        setMessages(prev => [...prev, { role: 'model', content: "Sorry, I ran into a problem. Please check your API key and try again." }]);
      })
      .finally(() => {
        setIsResponding(false);
      });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage(input);
    }
  };
  
  useEffect(() => {
     if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);


  return (
    <div className="container mx-auto px-4 md:px-6 py-8 flex justify-center">
      <Card className="w-full max-w-3xl h-[calc(100vh-10rem)] flex flex-col">
        <CardHeader className="border-b">
          <CardTitle className="font-headline">AI Librarian Chat</CardTitle>
          <CardDescription>Chat with our AI assistant to find books and get help.</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
          <ScrollArea className="flex-1 p-6" ref={scrollAreaRef}>
            <div className="space-y-6">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    'flex items-start gap-4',
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  {message.role === 'model' && (
                    <Avatar className="border">
                       <AvatarFallback>
                          <Bot />
                       </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      'max-w-prose rounded-lg p-3',
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    )}
                  >
                     <article className="prose dark:prose-invert prose-sm max-w-none">
                        <Markdown>{message.content}</Markdown>
                     </article>
                  </div>
                   {message.role === 'user' && (
                     <Avatar className="border">
                        <AvatarImage src={user?.avatarUrl} />
                        <AvatarFallback>
                           {user ? getInitials(user.name || 'U') : <User />}
                        </AvatarFallback>
                     </Avatar>
                  )}
                </div>
              ))}
               {isResponding && (
                <div className="flex items-start gap-4 justify-start">
                    <Avatar className="border">
                       <AvatarFallback>
                          <Bot />
                       </AvatarFallback>
                    </Avatar>
                    <div className="bg-muted rounded-lg p-3 flex items-center">
                        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                    </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="border-t p-4 bg-background space-y-4">
             {suggestions.length > 0 && (
                 <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground font-semibold">
                       <Sparkles className="h-4 w-4 text-yellow-500" />
                       <span>Suggested Replies</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {suggestions.map((suggestion, index) => (
                            <Button key={index} variant="outline" size="sm" onClick={() => handleSendMessage(suggestion)} disabled={isResponding}>
                                {suggestion}
                            </Button>
                        ))}
                    </div>
                </div>
             )}

            <div className="flex items-center gap-2">
                <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask for a book recommendation..."
                    disabled={isResponding}
                />
                <Button onClick={() => handleSendMessage(input)} disabled={isResponding || !input.trim()}>
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send</span>
                </Button>
            </div>
             {!user && (
                <p className="text-xs text-muted-foreground text-center">
                    <Link href="/login" className="underline text-primary">Login</Link> for a personalized experience.
                </p>
             )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
