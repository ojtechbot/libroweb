
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import ProtectedRoute from "@/components/protected-route";
import { User, Book, BarChart2 } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";


const sidebarNavItems = [
  {
    title: "My Books",
    href: "/dashboard",
    icon: Book,
  },
  {
    title: "Statistics",
    href: "/dashboard/stats",
    icon: BarChart2,
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  
  // Determine the active tab. Handle the case where the path is just /dashboard
  const activeTab = sidebarNavItems.find(item => pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href)))?.href || '/dashboard';

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col space-y-8">
           <header className="space-y-2">
             <h1 className="text-3xl md:text-4xl font-headline font-bold">My Dashboard</h1>
             <p className="text-muted-foreground">Your personal space to manage books and track your reading habits.</p>
           </header>
          
           <Tabs value={activeTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 max-w-md">
              {sidebarNavItems.map((item) => (
                 <TabsTrigger value={item.href} key={item.href} asChild>
                    <Link href={item.href}>
                        <item.icon className="mr-0 sm:mr-2 h-4 w-4" />
                        <span className="hidden sm:inline">{item.title}</span>
                    </Link>
                 </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
