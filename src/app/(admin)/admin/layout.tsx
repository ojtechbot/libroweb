
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { User, Book, LogOut, Home, Menu, Users, Library, LayoutDashboard } from "lucide-react";
import AdminProtectedRoute from "@/components/admin/admin-protected-route";
import { useAuth } from "@/components/auth-provider";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";


const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Books",
    href: "/admin/books",
    icon: Library,
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const { user, logout } = useAuth();
  
  const handleLogout = async () => {
    try {
      logout();
      toast({ title: "Success", description: "You have been logged out." });
      setIsMobileMenuOpen(false);
      router.push("/admin/login");
    } catch (error) {
      console.error("Logout Error:", error);
      toast({ title: "Error", description: "Failed to log out. Please try again.", variant: "destructive" });
    }
  };
  
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  }


  return (
    <AdminProtectedRoute>
        <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center">
                 <div className="mr-4 hidden md:flex">
                    <Logo />
                </div>

                <div className="md:hidden">
                    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Toggle Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[300px] p-0 bg-background">
                            <div className="p-4 border-b">
                                <Logo />
                            </div>
                            <div className="p-4">
                                <nav className="flex flex-col gap-y-4">
                                    {sidebarNavItems.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={cn(
                                                "flex items-center gap-2 text-base font-medium transition-colors hover:text-primary",
                                                pathname === item.href ? "text-primary" : "text-muted-foreground"
                                            )}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                            <item.icon className="mr-2 h-4 w-4" />
                                            {item.title}
                                        </Link>
                                    ))}
                                </nav>
                                <div className="mt-8 border-t pt-6">
                                     <button
                                        onClick={handleLogout}
                                        className={cn(
                                        "flex w-full items-center gap-2 text-base font-medium transition-colors hover:text-primary text-muted-foreground"
                                        )}
                                    >
                                        <LogOut className="h-5 w-5" />
                                        <span>Logout</span>
                                    </button>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
                 <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <div className="w-full flex-1 md:w-auto md:flex-none">
                       <div className="md:hidden">
                         <Logo />
                       </div>
                    </div>
                     <div className="hidden items-center gap-2 md:flex">
                        <Button variant="ghost" asChild>
                          <Link href="/">
                            <Home className="mr-2 h-4 w-4" />
                            View Site
                          </Link>
                        </Button>
                        <ThemeToggle />
                        {user && (
                           <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={user.avatarUrl} alt={user.name} />
                                        <AvatarFallback>{getInitials(user.name || user.email || 'A')}</AvatarFallback>
                                    </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="end" forceMount>
                                    <DropdownMenuLabel className="font-normal">
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm font-medium leading-none">{user.name}</p>
                                            <p className="text-xs leading-none text-muted-foreground">
                                            {user.email}
                                            </p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={handleLogout}>
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Log out</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                     </div>
                 </div>
            </div>
        </header>
        <div className="container mx-auto px-4 md:px-6 py-12">
            <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
            <aside className="-mx-4 lg:w-1/5 hidden lg:block">
                <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
                {sidebarNavItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            buttonVariants({ variant: pathname === item.href ? "secondary" : "ghost" }),
                            "justify-start"
                        )}
                        >
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.title}
                    </Link>
                ))}
                </nav>
            </aside>
            <div className="flex-1 lg:max-w-4/5">{children}</div>
            </div>
        </div>
    </AdminProtectedRoute>
  );
}
