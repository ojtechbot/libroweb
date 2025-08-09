
'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import SearchForm from '@/components/search-form';
import SearchResults from '@/components/search-results';
import { getBooks } from '@/lib/data';
import { useEffect, useState } from 'react';
import type { Book } from '@/lib/data';
import { BookCardSkeleton } from '@/components/book-card';

function SearchPageContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const category = searchParams.get('category') || 'all';
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBooks() {
      setLoading(true);
      const allBooks = await getBooks();
      setBooks(allBooks);
      setLoading(false);
    }
    fetchBooks();
  }, []);

  const categories = ['all', ...Array.from(new Set(books.map(book => book.category)))];
  const skeletonCount = 10;

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl md:text-4xl font-headline font-bold">Search Our Collection</h1>
        <p className="text-muted-foreground max-w-2xl">Use the filters below to find the perfect book for you. You can search by title, author, or browse by category.</p>
        <div className="max-w-2xl pt-4">
          <SearchForm initialQuery={query} initialCategory={category} categories={categories} books={books} />
        </div>
      </div>
      
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {Array.from({ length: skeletonCount }).map((_, index) => (
            <BookCardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <SearchResults books={books} query={query} category={category} />
      )}
    </div>
  );
}


export default function SearchPage() {
  return (
    <Suspense>
      <SearchPageContent />
    </Suspense>
  )
}
