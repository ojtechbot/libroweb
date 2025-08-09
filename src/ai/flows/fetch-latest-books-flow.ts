
'use server';
/**
 * @fileOverview A flow for fetching the latest books from the local database.
 *
 * - fetchLatestBooks - A function that fetches the latest books.
 */

import { getBooks, type Book } from '@/lib/data';

/**
 * Fetches the 8 newest books from the database.
 * It filters for books that are marked as new.
 * @returns A promise that resolves to an array of the latest books.
 */
export async function fetchLatestBooks(): Promise<Book[]> {
    try {
        const allBooks = await getBooks();
        // Filter for books that are marked as new and take the first 8
        const latestBooks = allBooks.filter(book => book.isNew).slice(0, 8);
        return latestBooks;
    } catch (error) {
        console.error("Error fetching latest books from local data:", error);
        return []; // Return an empty array in case of an error
    }
}
