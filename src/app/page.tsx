import { Button } from "@/components/ui/button";
import { Book, Search, History, Lightbulb, BookCopy } from "lucide-react";
import Link from 'next/link';
import SearchForm from "@/components/search-form";
import LatestBooksCarousel from "@/components/latest-books-carousel";
import { cn } from "@/lib/utils";
import { fetchLatestBooks } from "@/ai/flows/fetch-latest-books-flow";
import { getBooks } from "@/lib/data";

const categories = [
  { name: "Science", icon: Lightbulb },
  { name: "History", icon: History },
  { name: "Engineering", icon: BookCopy },
  { name: "Literature", icon: Book },
];

export default async function Home() {
  const latestBooks = await fetchLatestBooks();
  const allBooks = await getBooks();
  const allCategories = ['all', ...Array.from(new Set(allBooks.map(book => book.category)))];

  return (
    <div className="flex flex-col">
      <section className="relative w-full py-20 md:py-32 lg:py-40 bg-primary/10">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold text-foreground tracking-tight">
            Welcome to the Online Library Portal
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground">
            Your gateway to a world of knowledge. Search, borrow, and read from our vast collection of e-books and materials.
          </p>
          <div className="mt-8 max-w-2xl mx-auto">
            <SearchForm books={allBooks} categories={allCategories} />
          </div>
        </div>
      </section>

      <section id="latest-books" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-headline font-bold text-center mb-10">Latest Books</h2>
          {latestBooks.length > 0 ? (
            <LatestBooksCarousel books={latestBooks} />
          ) : (
            <p className="text-center text-muted-foreground">Could not fetch latest books at this time.</p>
          )}
          <div className="text-center mt-12">
            <Button asChild variant="outline">
              <Link href="/search">View All Books</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="categories" className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-headline font-bold text-center mb-10">Explore Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {categories.map((category) => (
              <Link href={`/search?category=${category.name.toLowerCase()}`} key={category.name} className="group">
                <div className="bg-card p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 hover:bg-accent/20">
                  <div className="mb-4 inline-block p-3 rounded-full bg-gradient-to-r from-red-500 to-violet-500 text-white">
                     <category.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-lg font-semibold font-headline">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
