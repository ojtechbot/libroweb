
'use client';

import { useEffect, useState } from "react";
import { getBorrowedBooks, getFavoriteBooks, getBorrowingHistory } from "@/app/actions";
import DashboardStats from "@/components/dashboard-stats";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type Book } from "@/lib/data";
import { useAuth } from "@/components/auth-provider";
import { Loader2 } from "lucide-react";

export default function StatsPage() {
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
          console.error("Error fetching stats data:", error);
        } finally {
          setDataLoading(false);
        }
      } else if (!loading) {
        setDataLoading(false);
      }
    }
    fetchData();
  }, [user, loading]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Reading Analytics</CardTitle>
          <CardDescription>
            A visualization of your interaction and habits with the library.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading || dataLoading ? (
            <div className="flex justify-center items-center h-96">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <DashboardStats
              borrowedBooks={borrowedBooks}
              favoriteBooks={favoriteBooks}
              borrowingHistory={borrowingHistory.map(h => h.book)}
              isLoading={loading || dataLoading}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
