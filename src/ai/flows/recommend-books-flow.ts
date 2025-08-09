
'use server';
/**
 * @fileOverview An AI flow for recommending books.
 *
 * - recommendBooks - A function that recommends books based on a given book.
 * - RecommendBooksInput - The input type for the recommendBooks function.
 * - RecommendBooksOutput - The return type for the recommendBooks function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';
import { getBooks, type Book } from '@/lib/data';

const RecommendBooksInputSchema = z.object({
  title: z.string().describe('The title of the book to base recommendations on.'),
  category: z.string().describe('The category of the book.'),
  bookId: z.string().describe('The ID of the book to exclude from recommendations.'),
});
export type RecommendBooksInput = z.infer<typeof RecommendBooksInputSchema>;

// The output can now be a direct array of Book objects
const RecommendBooksOutputSchema = z.array(z.object({
    id: z.string(),
    title: z.string(),
    author: z.string(),
    category: z.string(),
    summary: z.string(),
    coverUrl: z.string(),
}));
export type RecommendBooksOutput = z.infer<typeof RecommendBooksOutputSchema>;


const recommendBooksPrompt = ai.definePrompt({
  name: 'recommendBooksPrompt',
  model: 'googleai/gemini-pro',
  input: { schema: z.object({
      title: z.string(),
      category: z.string(),
      bookId: z.string(),
      catalog: z.array(z.object({
          id: z.string(),
          title: z.string(),
          author: z.string(),
          category: z.string(),
          summary: z.string(),
          coverUrl: z.string(),
      })),
  })},
  output: { schema: RecommendBooksOutputSchema },
  prompt: `You are an expert librarian. A user is currently viewing the book "{{title}}" which is in the "{{category}}" category.

Here is the current catalog of available books:
{{{json catalog}}}

Please recommend exactly 4 other books from the catalog that they might enjoy.
Do NOT recommend the book with the id "{{bookId}}".
Return only the JSON array of the recommended book objects from the catalog, with no other text.`,
});


const recommendBooksFlow = ai.defineFlow(
  {
    name: 'recommendBooksFlow',
    inputSchema: RecommendBooksInputSchema,
    outputSchema: RecommendBooksOutputSchema,
  },
  async (input) => {
    // 1. Fetch all books
    const allBooks = await getBooks();

    // 2. Prepare catalog for the prompt (full book object)
    const catalogForPrompt = allBooks.map(book => ({
        id: book.id,
        title: book.title,
        author: book.author,
        category: book.category,
        summary: book.summary,
        coverUrl: book.coverUrl,
    }));

    // 3. Call the prompt with the book details and the catalog
    const { output } = await recommendBooksPrompt({
        ...input,
        catalog: catalogForPrompt,
    });
    
    if (!output) {
        // Throw an error if the AI fails to produce output
        throw new Error("AI failed to generate recommendations.");
    }
    
    // 4. The output is already an array of book objects.
    // We just need to find the full objects from our original list.
    const recommendedIds = output.map(rec => rec.id);
    const fullRecommendedBooks = allBooks.filter(book => recommendedIds.includes(book.id));

    return fullRecommendedBooks;
  }
);


export async function recommendBooks(input: RecommendBooksInput): Promise<RecommendBooksOutput> {
  return recommendBooksFlow(input);
}
