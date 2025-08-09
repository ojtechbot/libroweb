
'use client';

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type Book } from "@/lib/data";
import BookCard from "@/components/book-card";
import RequestBookForm from "@/components/request-book-form";
import { getFavoriteBooks, getBorrowedBooks, getBorrowingHistory } from "../actions";
import { format } from "date-fns";
import { useAuth } from "@/components/auth-provider";
import { Loader2, BookHeart, BookUp, History, BookOpenCheck } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const [borrowedBooks, setBorrowedBooks] = useState<Book[]>([]);
  const [favoriteBooks, setFavoriteBooks] = useState<Book[]>([]);
  const [borrowingHistory, setBorrowingHistory] = useState<any[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (user) {
        setDataLoading(true);
        try {
          const [borrowed, favorites, history] = await Promise.all([
            getBorrowedBooks(user.uid),
            getFavoriteBooks(user.uid),
            getBorrowingHistory(user.uid)
          ]);
          setBorrowedBooks(borrowed);
          setFavoriteBooks(favorites);
          setBorrowingHistory(history);
        } catch (error) {
          console.error("Error fetching dashboard data:", error);
        } finally {
          setDataLoading(false);
        }
      } else if (!loading) {
        setDataLoading(false);
      }
    }
    fetchData();
  }, [user, loading]);
  
  if (loading || dataLoading) {
      return (
         <div className="flex justify-center items-center h-64">
             <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
         </div>
      )
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold font-headline">My Library</h2>
        <RequestBookForm />
      </div>

      {/* Borrowed Books Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <BookOpenCheck className="h-5 w-5 text-primary" />
            <CardTitle>Currently Borrowed</CardTitle>
          </div>
          <CardDescription>
            These are the books you currently have on loan.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {borrowedBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {borrowedBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
             <div className="text-center p-8 border-dashed border-2 rounded-lg">
                <p className="text-muted-foreground">You haven&apos;t borrowed any books yet.</p>
             </div>
          )}
        </CardContent>
      </Card>
      
      {/* Favorites Section */}
      <Card>
        <CardHeader>
           <div className="flex items-center gap-2">
            <BookHeart className="h-5 w-5 text-pink-500" />
            <CardTitle>My Favorites</CardTitle>
          </div>
          <CardDescription>
            Your hand-picked collection of favorite books.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {favoriteBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favoriteBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
             <div className="text-center p-8 border-dashed border-2 rounded-lg">
                <p className="text-muted-foreground">You haven&apos;t favorited any books yet.</p>
             </div>
          )}
        </CardContent>
      </Card>

      {/* Borrowing History Section */}
      <Card>
        <CardHeader>
           <div className="flex items-center gap-2">
            <History className="h-5 w-5 text-amber-500" />
            <CardTitle>Borrowing History</CardTitle>
          </div>
          <CardDescription>
            A record of all the books you have borrowed in the past.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {borrowingHistory.length > 0 ? (
            <div className="space-y-4">
              {borrowingHistory.map((item, index) => (
                 <div key={item.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 p-3 rounded-md border bg-muted/50">
                    <div>
                        <p className="font-semibold">{item.book.title}</p>
                        <p className="text-sm text-muted-foreground">{item.book.author}</p>
                    </div>
                    <div className="text-sm text-muted-foreground text-left sm:text-right w-full sm:w-auto">
                        <p>Borrowed: {format(new Date(item.borrowedAt), "PPP")}</p>
                        <p>
                          Returned: {item.returnedAt ? format(new Date(item.returnedAt), "PPP") : 'On Loan'}
                        </p>
                    </div>
                 </div>
              ))}
            </div>
          ) : (
            <div className="text-center p-8 border-dashed border-2 rounded-lg">
              <p className="text-muted-foreground">No borrowing history yet.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
