
import { getBooks, type Book } from "@/lib/data";
import { notFound } from "next/navigation";
import BookClientPage from "./book-client-page";
import { recommendBooks, type RecommendBooksInput } from "@/ai/flows/recommend-books-flow";

// Helper function to get a single book
async function getBook(id: string) {
  const books = await getBooks();
  return books.find((b) => b.id === id);
}


export default async function BookPage({ params }: { params: { id: string } }) {
  const book = await getBook(params.id);

  if (!book) {
    notFound();
  }
  
  // AI-powered recommendations
  const recommendationInput: RecommendBooksInput = {
    title: book.title,
    category: book.category,
    bookId: book.id,
  };

  let relatedBooks: Book[] = [];
  try {
    // The flow now returns full book objects, so no need for matching.
    const aiRecommendations = await recommendBooks(recommendationInput);
    if (aiRecommendations) {
        relatedBooks = aiRecommendations.slice(0, 4);
    }
  } catch (error) {
    console.error("Error fetching AI recommendations:", error);
    // Fallback logic: if AI fails, get books from the same category.
    const allBooks = await getBooks();
    relatedBooks = allBooks
     .filter(b => b.category === book.category && b.id !== book.id)
     .slice(0, 4);
  }
  
  // Final check to ensure we have some related books to show
  if (relatedBooks.length === 0) {
     const allBooks = await getBooks();
     relatedBooks = allBooks
      .filter(b => b.category === book.category && b.id !== book.id)
      .slice(0, 4);
  }


  return <BookClientPage book={book} relatedBooks={relatedBooks} />;
}
