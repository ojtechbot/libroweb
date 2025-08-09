
"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Book } from "@/lib/data";


interface SearchFormProps {
  initialQuery?: string;
  initialCategory?: string;
  categories: string[];
  books: Book[];
}

export default function SearchForm({ initialQuery = '', initialCategory = 'all', categories = [], books = [] }: SearchFormProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (query) {
      params.set('q', query);
    }
    if (category && category !== 'all') {
      params.set('category', category);
    }
    router.push(`/search?${params.toString()}`);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    const params = new URLSearchParams();
    params.set('q', suggestion);
    if (category && category !== 'all') {
      params.set('category', category);
    }
    router.push(`/search?${params.toString()}`);
  };

  useEffect(() => {
    if (query.length > 0) {
      const bookTitles = books.map(book => book.title);
      const filtered = bookTitles.filter(title =>
        title.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5)); // Limit suggestions
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query, books]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        formRef.current && 
        !formRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    const params = new URLSearchParams();
    if (query) {
      params.set('q', query);
    }
    if (value && value !== 'all') {
      params.set('category', value);
    }
    router.push(`/search?${params.toString()}`);
  }

  return (
    <div className="relative w-full">
      <form 
        ref={formRef}
        onSubmit={handleSubmit} 
        className="flex w-full items-center space-x-2"
      >
        <Select value={category} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
                {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                        {cat === 'all' ? 'All Categories' : cat}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>

        <div className="relative flex-1">
          <Input
            name="search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query.length > 0 && setShowSuggestions(true)}
            placeholder="Search by title or author..."
            className="w-full"
          />
           {showSuggestions && suggestions.length > 0 && (
            <div
              ref={suggestionsRef}
              className={cn(
                "absolute top-full left-0 mt-1 w-full z-50",
                "bg-popover text-popover-foreground rounded-md border shadow-lg",
                "max-h-60 overflow-auto"
              )}
            >
              <ul>
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-accent hover:text-accent-foreground cursor-pointer"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <Button type="submit">
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </form>
    </div>
  );
}
