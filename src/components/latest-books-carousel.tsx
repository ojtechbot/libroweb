"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { type Book } from "@/lib/data";
import BookCard from "./book-card";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface LatestBooksCarouselProps {
  books: Book[];
}

export default function LatestBooksCarousel({ books }: LatestBooksCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const autoplayPlugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));
  const isMobile = useIsMobile();
  
  useEffect(() => {
    if (!api) return;
    
    setCurrent(api.selectedScrollSnap());
    
    const onSelect = () => {
        setCurrent(api.selectedScrollSnap());
    };
    
    api.on("select", onSelect);
    
    return () => {
        api.off("select", onSelect);
    };
  }, [api]);
  
  const handleMouseEnter = useCallback(() => {
    autoplayPlugin.current.stop();
  }, []);
  
  const handleMouseLeave = useCallback(() => {
    autoplayPlugin.current.play();
  }, []);

  return (
    <div 
      className="relative w-full max-w-6xl mx-auto group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[autoplayPlugin.current]}
        className="w-full"
      >
        <CarouselContent>
          {books.map((book, index) => (
            <CarouselItem 
              key={book.id} 
              className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
            >
              <div className="p-1 h-full">
                <BookCard 
                  book={book} 
                  priority={index < 5}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10 hidden sm:flex h-12 w-12 text-foreground bg-background/50 hover:bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity" />
        <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10 hidden sm:flex h-12 w-12 text-foreground bg-background/50 hover:bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity" />
      </Carousel>

      {isMobile && (
        <div className="flex justify-center gap-2 mt-4">
            {books.slice(0, 5).map((_, index) => (
            <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`h-2 rounded-full transition-all ${
                current === index
                    ? "bg-primary w-4"
                    : "bg-muted w-2"
                }`}
                aria-label={`Go to slide ${index + 1}`}
            />
            ))}
        </div>
      )}
    </div>
  );
}
