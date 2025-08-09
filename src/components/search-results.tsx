
"use client";

import BookCard from "@/components/book-card";
import { type Book } from "@/lib/data";

interface SearchResultsProps {
  books: Book[];
  query: string;
  category: string;
}

export default function SearchResults({ books, query, category }: SearchResultsProps) {
  const filteredBooks = books.filter((book) => {
    const matchesQuery =
      query === '' ||
      book.title.toLowerCase().includes(query.toLowerCase()) ||
      book.author.toLowerCase().includes(query.toLowerCase());
    const matchesCategory =
      category === "all" || book.category.toLowerCase() === category;
    return matchesQuery && matchesCategory;
  });

  if (filteredBooks.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-semibold mb-2">No Books Found</h2>
        <p className="text-muted-foreground">
          We couldn't find any books matching your search. Try a different query or category.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {filteredBooks.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}
