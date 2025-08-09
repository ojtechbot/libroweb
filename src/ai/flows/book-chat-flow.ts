
'use server';
/**
 * @fileOverview A conversational AI flow for recommending books.
 * This flow acts as a helpful librarian, using tools to find books
 * from the library's catalog.
 *
 * - bookChat - The main function that powers the conversational chat.
 * - BookChatInput - The input type for the bookChat function (conversation history).
 * - BookChatOutput - The return type for the bookChat function (the AI's response).
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';
import { getBooks, type Book } from '@/lib/data';

// Tool: Define a tool for the AI to find books in the catalog.
const findBooksTool = ai.defineTool(
  {
    name: 'findBooks',
    description: 'Finds books from the library catalog based on title, author, or category.',
    inputSchema: z.object({
      query: z.string().describe('The search query (e.g., title, author, or keyword).'),
      category: z.string().optional().describe('The category to filter by (e.g., "Science", "History").'),
    }),
    outputSchema: z.array(z.object({
        id: z.string(),
        title: z.string(),
        author: z.string(),
        category: z.string(),
    })),
  },
  async (input) => {
    console.log(`[Tool] Finding books with query: "${input.query}"`);
    const allBooks = await getBooks();
    const results = allBooks
      .filter((book) => {
        const matchesQuery =
          book.title.toLowerCase().includes(input.query.toLowerCase()) ||
          book.author.toLowerCase().includes(input.query.toLowerCase());
        const matchesCategory =
          !input.category || book.category.toLowerCase() === input.category.toLowerCase();
        return matchesQuery && matchesCategory;
      })
      .slice(0, 5) // Return top 5 matches
      .map(book => ({ id: book.id, title: book.title, author: book.author, category: book.category })); // Return only essential info

    return results;
  }
);


const BookChatInputSchema = z.object({
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.string(),
  })),
  user: z.object({
    name: z.string(),
  }).optional(),
});
export type BookChatInput = z.infer<typeof BookChatInputSchema>;

// Use a simple string for the output, as the AI will format book lists itself.
const BookChatOutputSchema = z.string();
export type BookChatOutput = z.infer<typeof BookChatOutputSchema>;


const bookChatPrompt = ai.definePrompt({
    name: 'bookChatPrompt',
    model: 'googleai/gemini-pro',
    system: `You are an expert librarian and a friendly AI assistant for LibroWeb.
- Your goal is to help users discover books from the library's catalog and educate them.
- Be conversational, user-friendly, and helpful.
- To find books, you MUST use the findBooks tool. Do not invent books.
- When you recommend books from the tool, present them as a clear, easy-to-read list formatted in Markdown.
- If the tool returns no results, inform the user and ask if they would like to try a different search.
- Keep your responses concise and informative.`,
    tools: [findBooksTool],
    input: { schema: BookChatInputSchema },
    output: { schema: BookChatOutputSchema },
    prompt: (input) => `
        ${input.user ? `You are chatting with ${input.user.name}. Address them by name when appropriate.` : 'You are chatting with a guest user.'}

        Here is the conversation history:
        ${input.history.map(msg => `${msg.role}: ${msg.content}`).join('\n')}
        
        Please provide the next response.
    `,
});

const bookChatFlow = ai.defineFlow(
  {
    name: 'bookChatFlow',
    inputSchema: BookChatInputSchema,
    outputSchema: BookChatOutputSchema,
  },
  async (input) => {
    const {output} = await bookChatPrompt(input);
    return output || "I'm sorry, I couldn't come up with a response.";
  }
);


export async function bookChat(input: BookChatInput): Promise<BookChatOutput> {
  return bookChatFlow(input);
}
