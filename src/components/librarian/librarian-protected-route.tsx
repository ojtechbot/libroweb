

"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../auth-provider";
import { ReactNode, useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function LibrarianProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (!user) {
      router.replace('/librarian/login');
      return;
    }

    const isAuthorized = user.role === "librarian" || user.role === "admin";
    if (!isAuthorized) {
        router.replace("/librarian/login?error=unauthorized");
    }

  }, [user, authLoading, router]);

  const isAuthorized = user?.role === "librarian" || user?.role === "admin";
  if (authLoading || !user || !isAuthorized) {
    return (
       <div className="fixed inset-0 flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }
  
  return <>{children}</>;
}
