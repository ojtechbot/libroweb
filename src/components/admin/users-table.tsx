
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type UserProfile } from "@/lib/users";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal, Edit, Trash2 } from "lucide-react";


interface UsersTableProps {
    users: UserProfile[];
}

export function UsersTable({ users }: UsersTableProps) {
    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('');
    }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>UID</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.uid}>
              <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                      <Avatar>
                          <AvatarImage src={user.avatarUrl} />
                          <AvatarFallback>{getInitials(user.name || user.email || 'U')}</AvatarFallback>
                      </Avatar>
                      <span>{user.name || 'N/A'}</span>
                  </div>
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                  <Badge variant={user.role === 'admin' ? "destructive" : "secondary"}>
                      {user.role || 'student'}
                  </Badge>
              </TableCell>
              <TableCell className="font-mono text-xs text-muted-foreground">{user.uid}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                           <Edit className="mr-2 h-4 w-4" />
                            Edit User
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                           <Trash2 className="mr-2 h-4 w-4" />
                            Delete User
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
