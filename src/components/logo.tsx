import Link from "next/link";
import { BookMarked } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
       <div className="p-1.5 rounded-md bg-primary text-primary-foreground">
        <BookMarked className="h-5 w-5" />
      </div>
      <span className="text-xl font-bold font-headline">
        LibroWeb
      </span>
    </Link>
  );
}
