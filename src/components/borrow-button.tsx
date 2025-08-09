
'use client';

import { useState, useEffect, useTransition } from 'react';
import { BookCheck, BookX } from 'lucide-react';
import { Button } from './ui/button';
import { useAuth } from './auth-provider';
import { toggleBorrowAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface BorrowButtonProps {
  bookId: string;
}

export default function BorrowButton({ bookId }: BorrowButtonProps) {
  const { user, reload } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isBorrowed, setIsBorrowed] = useState(false);

  useEffect(() => {
    if (user?.borrowed) {
        setIsBorrowed(user.borrowed.includes(bookId));
    } else {
        setIsBorrowed(false);
    }
  }, [user, bookId]);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
     e.preventDefault();
     e.stopPropagation();

    if (!user) {
      toast({
        title: 'Please log in',
        description: 'You need to be logged in to borrow books.',
        variant: 'destructive',
      });
      router.push('/login');
      return;
    }

    startTransition(async () => {
      const result = await toggleBorrowAction(user.uid, bookId);
      if (result.error) {
        toast({
          title: 'Error',
          description: result.error,
          variant: 'destructive',
        });
      } else {
        setIsBorrowed(result.isBorrowed!);
        toast({
          title: result.isBorrowed ? 'Book Borrowed!' : 'Book Returned',
          description: result.isBorrowed 
            ? "You can find this book in your dashboard." 
            : "The book has been removed from your borrowed list.",
        });
        reload();
      }
    });
  };

  return (
    <Button
      size="lg"
      variant={isBorrowed ? "secondary" : "default"}
      className="w-full sm:w-auto"
      onClick={handleClick}
      disabled={isPending}
    >
      {isBorrowed ? (
        <>
          <BookX className="mr-2 h-5 w-5" />
          Return Book
        </>
      ) : (
        <>
          <BookCheck className="mr-2 h-5 w-5" />
          Borrow Book
        </>
      )}
    </Button>
  );
}
