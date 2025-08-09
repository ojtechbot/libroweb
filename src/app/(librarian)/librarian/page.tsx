
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getBooks } from "@/lib/data";
import { getBookRequests } from "@/app/actions";
import { Library, GitPullRequest } from "lucide-react";

export default async function LibrarianDashboardPage() {
    const books = await getBooks();
    const requests = await getBookRequests();

    const stats = [
        {
            title: "Total Books",
            value: books.length,
            icon: Library,
            description: "Number of books available in the catalog.",
        },
        {
            title: "Pending Requests",
            value: requests.filter(r => r.status === 'pending').length,
            icon: GitPullRequest,
            description: "Number of pending book requests.",
        },
    ]

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl md:text-4xl font-headline font-bold">Librarian Dashboard</h1>
                <p className="text-muted-foreground">Manage book requests and library operations.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                {stats.map((stat) => (
                    <Card key={stat.title}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                            <stat.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-muted-foreground">{stat.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
             <Card>
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>A log of recent librarian actions will be shown here.</CardDescription>
                </CardHeader>
                <CardContent>
                   <div className="text-center text-muted-foreground p-8">
                        <p>No recent activity to display.</p>
                   </div>
                </CardContent>
            </Card>
        </div>
    )
}
