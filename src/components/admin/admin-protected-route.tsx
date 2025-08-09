

"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../auth-provider";
import { ReactNode, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export default function AdminProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (authLoading) {
      return; 
    }

    if (!user) {
      router.replace('/admin/login');
      return;
    }
    
    if (user.role !== 'admin') {
        router.replace("/admin/login?error=unauthorized");
    }

  }, [user, authLoading, router]);

  if (authLoading || !user || user.role !== 'admin') {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return <>{children}</>;
}
