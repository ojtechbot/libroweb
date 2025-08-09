
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getUsers } from "@/app/actions";
import { UsersTable } from "@/components/admin/users-table";


export default async function AdminUsersPage() {
    const users = await getUsers();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl md:text-4xl font-headline font-bold">User Management</h1>
                <p className="text-muted-foreground">View, add, and manage all users.</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Registered Users</CardTitle>
                    <CardDescription>A list of all users in the system.</CardDescription>
                </CardHeader>
                <CardContent>
                    <UsersTable users={users} />
                </CardContent>
            </Card>
        </div>
    )
}
