import Link from "next/link";
import Image from "next/image";
import { type Book } from "@/lib/data";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import FavoriteButton from "./favorite-button";
import { Skeleton } from "@/components/ui/skeleton";

interface BookCardProps {
  book: Book;
  priority?: boolean;
}

export default function BookCard({ book, priority = false }: BookCardProps) {
  // Generate OpenLibrary cover URL using ISBN if available, otherwise use placeholder
  const getCoverUrl = () => {
    if (book.coverUrl) return book.coverUrl;
    
    // Fallback to placeholder with book title
    return `https://placehold.co/300x450/e6eaf0/4681c4?text=${encodeURIComponent(book.title.substring(0, 30))}`;
  };

  const coverImage = getCoverUrl();

  return (
    <div className="h-full group relative">
      <Link 
        href={`/book/${book.id}`}
        className="block h-full"
        aria-label={`View details for ${book.title} by ${book.author}`}
      >
        <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <CardHeader className="p-0 relative aspect-[2/3]">
            <Image
              src={coverImage}
              alt={`Cover of ${book.title} by ${book.author}`}
              width={300}
              height={450}
              className="w-full h-full object-cover"
              data-ai-hint={book['data-ai-hint']}
              priority={priority}
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMDAgNDUwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTZlYWYwIi8+PC9zdmc+"
            />
            {book.isNew && (
              <Badge 
                className="absolute top-2 right-2 bg-accent text-accent-foreground"
                aria-hidden="true"
              >
                New
              </Badge>
            )}
          </CardHeader>
          <CardContent className="p-4 flex-grow">
            <CardTitle className="text-lg font-headline leading-tight group-hover:text-primary transition-colors duration-300 line-clamp-2">
              {book.title}
            </CardTitle>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <p className="text-sm text-muted-foreground line-clamp-1">
              {book.author}
            </p>
          </CardFooter>
        </Card>
      </Link>
      <div className="absolute top-2 left-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <FavoriteButton bookId={book.id} />
      </div>
    </div>
  );
}

// Optional: Skeleton loader for loading states
export function BookCardSkeleton() {
  return (
    <div className="h-full">
      <Card className="h-full flex flex-col overflow-hidden">
        <CardHeader className="p-0 aspect-[2/3]">
          <Skeleton className="w-full h-full" />
        </CardHeader>
        <CardContent className="p-4 flex-grow space-y-2">
          <Skeleton className="h-5 w-3/4" />
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Skeleton className="h-4 w-1/2" />
        </CardFooter>
      </Card>
    </div>
  );
}
