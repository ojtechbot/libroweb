import Logo from "@/components/logo";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-secondary">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Logo />
          </div>
          <nav className="flex gap-4 sm:gap-6 mb-4 md:mb-0">
            <Link href="/about" className="text-sm text-muted-foreground hover:text-primary">
              About Us
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
              Terms of Service
            </Link>
          </nav>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} LibroWeb. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
