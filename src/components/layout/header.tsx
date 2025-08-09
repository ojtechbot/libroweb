
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, LayoutDashboard, Info, Mail, LogOut, User, LogIn, Home, MessageSquare } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/components/auth-provider";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "../theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";


const navLinks = [
  { href: "/", label: "Home", public: true, icon: Home },
  { href: "/search", label: "Search", public: true, icon: Search },
  { href: "/chat", label: "Chat", public: true, icon: MessageSquare },
  { href: "/dashboard", label: "Dashboard", public: false, icon: LayoutDashboard },
  { href: "/about", label: "About", public: true, icon: Info },
  { href: "/contact", label: "Contact", public: true, icon: Mail },
];

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, loading, logout } = useAuth();
  const { toast } = useToast();
  
  const handleLogout = async () => {
    try {
      logout();
      toast({ title: "Success", description: "You have been logged out." });
      setIsMobileMenuOpen(false);
    } catch (error) {
      console.error("Logout Error:", error);
      toast({ title: "Error", description: "Failed to log out. Please try again.", variant: "destructive" });
    }
  };


  const NavLink = ({ href, label, icon: Icon }: { href: string; label: string, icon: React.ElementType }) => (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 text-base font-medium transition-colors hover:text-primary",
        pathname === href ? "text-primary" : "text-muted-foreground"
      )}
      onClick={() => setIsMobileMenuOpen(false)}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </Link>
  );

  const visibleNavLinks = navLinks.filter(link => link.public || !!user);
  
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  }

  // Hide header on admin, librarian, and auth pages
  if (pathname.startsWith('/admin') || pathname.startsWith('/librarian') || pathname.startsWith('/login') || pathname.startsWith('/register')) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
                <SheetHeader className="border-b p-4">
                  <SheetTitle>
                    <Logo />
                  </SheetTitle>
                </SheetHeader>
                <div className="p-4">
                  <nav className="flex flex-col gap-y-4">
                    {visibleNavLinks.map((link) => (
                      <NavLink key={link.href} href={link.href} label={link.label} icon={link.icon} />
                    ))}
                  </nav>

                  <div className="mt-8 border-t pt-6">
                     {loading ? null : user ? (
                        <div className="flex flex-col gap-y-4">
                          <NavLink href="/dashboard/profile" label="Profile" icon={User} />
                          <button
                            onClick={handleLogout}
                            className={cn(
                              "flex items-center gap-2 text-base font-medium transition-colors hover:text-primary text-muted-foreground"
                            )}
                          >
                            <LogOut className="h-5 w-5" />
                            <span>Logout</span>
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-y-4">
                          <NavLink href="/login" label="Login" icon={LogIn} />
                          <NavLink href="/register" label="Register" icon={User} />
                        </div>
                      )}
                  </div>
                </div>
                 <div className="absolute bottom-4 left-4">
                    <ThemeToggle />
                 </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none md:hidden">
            <Logo />
          </div>
          <nav className="hidden items-center gap-6 md:flex">
            {visibleNavLinks.map((link) => (
               <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === link.href ? "text-primary" : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
             {loading ? null : user ? (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                           <Avatar className="h-8 w-8">
                            <AvatarImage src={user.avatarUrl} alt={user.name} />
                            <AvatarFallback>{getInitials(user.name || user.email || 'U')}</AvatarFallback>
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
                        <DropdownMenuItem asChild>
                           <Link href="/dashboard">
                            <LayoutDashboard className="mr-2 h-4 w-4" />
                            Dashboard
                           </Link>
                        </DropdownMenuItem>
                         <DropdownMenuItem asChild>
                           <Link href="/dashboard/profile">
                            <User className="mr-2 h-4 w-4" />
                            Profile
                           </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout}>
                          <LogOut className="mr-2 h-4 w-4" />
                          <span>Log out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Button variant="ghost" asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">Register</Link>
                </Button>
              </div>
            )}
             <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
