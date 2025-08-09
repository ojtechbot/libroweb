"use client";

import { type Book as BookType } from "@/lib/data";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, BookOpen, Lock } from "lucide-react";
import BookCard from "@/components/book-card";
import { useAuth } from "@/components/auth-provider";
import { useToast } from "@/hooks/use-toast";
import BorrowButton from "@/components/borrow-button";

interface BookClientPageProps {
  book: BookType;
  relatedBooks: BookType[];
}

export default function BookClientPage({ book, relatedBooks }: BookClientPageProps) {
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  
  const handleDownload = () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "You must be logged in to download books.",
        variant: "destructive",
      });
      router.push("/login");
    } else {
      // In a real app, this would initiate a file download.
      toast({
        title: "Download Started",
        description: `Your download for "${book.title}" has started.`,
      });
    }
  };
  
  const coverImage = book.coverUrl || `https://placehold.co/400x600`;

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
        <div className="md:col-span-1">
          <div className="sticky top-24">
            <Image
              src={coverImage}
              alt={`Cover of ${book.title}`}
              width={400}
              height={600}
              className="rounded-lg shadow-xl w-full"
              data-ai-hint={book['data-ai-hint']}
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <Badge variant="secondary" className="mb-2">{book.category}</Badge>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-headline font-bold mb-2">
            {book.title}
          </h1>
          <p className="text-xl text-muted-foreground mb-6">by {book.author}</p>

          <p className="text-lg leading-relaxed mb-8">{book.summary}</p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button size="lg" className="w-full sm:w-auto">
              <BookOpen className="mr-2 h-5 w-5" />
              Read Online
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto" onClick={handleDownload}>
              {user ? <Download className="mr-2 h-5 w-5" /> : <Lock className="mr-2 h-5 w-5" />}
              Download
            </Button>
            <BorrowButton bookId={book.id} />
          </div>

          <div>
            <h3 className="text-2xl font-headline font-bold mb-4 border-b pb-2">Book Details</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><strong>Author:</strong> {book.author}</li>
              <li><strong>Category:</strong> {book.category}</li>
              <li><strong>Publisher:</strong> Digital Press</li>
              <li><strong>Language:</strong> English</li>
            </ul>
          </div>
        </div>
      </div>

      {relatedBooks.length > 0 && (
        <div className="mt-16 pt-12 border-t">
          <h2 className="text-3xl font-headline font-bold text-center mb-10">Related Books</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedBooks.map((relatedBook) => (
              <BookCard key={relatedBook.id} book={relatedBook} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
