
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getBooks } from "@/lib/data";
import { BooksTable } from "@/components/admin/books-table";


export default async function AdminBooksPage() {
    const books = await getBooks();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl md:text-4xl font-headline font-bold">Book Management</h1>
                <p className="text-muted-foreground">Add, edit, and manage the book catalog.</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Book Catalog</CardTitle>
                    <CardDescription>A list of all books in the system.</CardDescription>
                </CardHeader>
                <CardContent>
                    <BooksTable books={books} />
                </CardContent>
            </Card>
        </div>
    )
}
