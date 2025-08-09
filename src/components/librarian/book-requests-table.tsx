
"use client";

import { useTransition } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Circle, CheckCircle2, XCircle, MoreHorizontal, Check, Ban } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { approveBookRequestAction, rejectBookRequestAction } from "@/app/actions";


interface BookRequest {
    id: string;
    title: string;
    author: string;
    reason?: string;
    userName?: string;
    requestedAt: string;
    status: 'pending' | 'approved' | 'rejected';
}

interface BookRequestsTableProps {
    requests: BookRequest[];
}

const statusConfig = {
    pending: { icon: Circle, color: "bg-yellow-500", label: "Pending" },
    approved: { icon: CheckCircle2, color: "bg-green-500", label: "Approved" },
    rejected: { icon: XCircle, color: "bg-red-500", label: "Rejected" },
}


export function BookRequestsTable({ requests }: BookRequestsTableProps) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const handleApprove = (request: BookRequest) => {
    startTransition(async () => {
        const result = await approveBookRequestAction({ id: request.id, title: request.title, author: request.author });
        if(result.error) {
            toast({ title: "Error", description: result.error, variant: "destructive" });
        } else {
            toast({ title: "Success", description: `Request for "${request.title}" has been approved.` });
        }
    });
  }

  const handleReject = (request: BookRequest) => {
     startTransition(async () => {
        const result = await rejectBookRequestAction(request.id);
         if(result.error) {
            toast({ title: "Error", description: result.error, variant: "destructive" });
        } else {
            toast({ title: "Success", description: `Request for "${request.title}" has been rejected.` });
        }
    });
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Status</TableHead>
            <TableHead>Book Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Requested By</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((request) => {
            const status = statusConfig[request.status] || statusConfig.pending;
            const Icon = status.icon;

            return (
              <TableRow key={request.id}>
                <TableCell>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                               <Icon className={`h-5 w-5 text-white rounded-full p-0.5 ${status.color}`} />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{status.label}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </TableCell>
                <TableCell className="font-medium">{request.title}</TableCell>
                <TableCell>{request.author}</TableCell>
                <TableCell className="text-muted-foreground">{request.userName || 'N/A'}</TableCell>
                <TableCell>
                    {format(new Date(request.requestedAt), "PPP")}
                </TableCell>
                <TableCell className="text-right">
                    {request.status === 'pending' ? (
                         <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0" disabled={isPending}>
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => handleApprove(request)}>
                                   <Check className="mr-2 h-4 w-4" />
                                   Approve
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive" onClick={() => handleReject(request)}>
                                   <Ban className="mr-2 h-4 w-4" />
                                   Reject
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                         <Badge variant={request.status === 'approved' ? 'secondary' : 'destructive'}>
                            {request.status}
                        </Badge>
                    )}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  );
}
