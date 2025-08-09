
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getBookRequests } from "@/app/actions";
import { BookRequestsTable } from "@/components/librarian/book-requests-table";


export default async function BookRequestsPage() {
    const requests = await getBookRequests();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl md:text-4xl font-headline font-bold">Book Requests</h1>
                <p className="text-muted-foreground">Manage book requests submitted by users.</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Submitted Requests</CardTitle>
                    <CardDescription>A list of all book requests from users.</CardDescription>
                </CardHeader>
                <CardContent>
                    <BookRequestsTable requests={requests} />
                </CardContent>
            </Card>
        </div>
    )
}
