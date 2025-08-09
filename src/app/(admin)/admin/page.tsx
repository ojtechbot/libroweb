
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getUsers } from "@/app/actions";
import { getBooks } from "@/lib/data";
import { Users, Library } from "lucide-react";

export default async function AdminDashboardPage() {
    const users = await getUsers();
    const books = await getBooks();

    const stats = [
        {
            title: "Total Users",
            value: users.length,
            icon: Users,
            description: "Number of registered users in the system.",
        },
        {
            title: "Total Books",
            value: books.length,
            icon: Library,
            description: "Number of books available in the catalog.",
        },
    ]

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl md:text-4xl font-headline font-bold">Admin Dashboard</h1>
                <p className="text-muted-foreground">An overview of the LibroWeb application.</p>
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
                    <CardDescription>A log of recent events will be shown here.</CardDescription>
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
