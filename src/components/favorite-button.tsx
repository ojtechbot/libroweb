
'use client';

import { useState, useEffect, useTransition } from 'react';
import { Heart } from 'lucide-react';
import { Button } from './ui/button';
import { useAuth } from './auth-provider';
import { toggleFavoriteAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface FavoriteButtonProps {
  bookId: string;
}

export default function FavoriteButton({ bookId }: FavoriteButtonProps) {
  const { user, reload } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (user?.favorites) {
        setIsFavorite(user.favorites.includes(bookId));
    } else {
        setIsFavorite(false);
    }
  }, [user, bookId]);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
     e.preventDefault();
     e.stopPropagation();

    if (!user) {
      toast({
        title: 'Please log in',
        description: 'You need to be logged in to favorite books.',
        variant: 'destructive',
      });
      router.push('/login');
      return;
    }

    startTransition(async () => {
      const result = await toggleFavoriteAction(user.uid, bookId);
      if (result.error) {
        toast({
          title: 'Error',
          description: result.error,
          variant: 'destructive',
        });
      } else {
        setIsFavorite(result.isFavorite!);
        toast({
          title: result.isFavorite ? 'Added to favorites' : 'Removed from favorites',
        });
        reload(); // This will refresh the user context
      }
    });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full h-8 w-8 bg-white/80 hover:bg-white"
      onClick={handleClick}
      disabled={isPending}
    >
      <Heart
        className={cn(
          'h-4 w-4 transition-all',
          isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-500'
        )}
      />
      <span className="sr-only">Favorite</span>
    </Button>
  );
}
