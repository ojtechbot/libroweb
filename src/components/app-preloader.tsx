"use client";

import { useEffect, useRef } from "react";
import Logo from "@/components/logo";

export default function AppPreloader() {

  useEffect(() => {
    // This effect ensures that once the component mounts,
    // the logic in ThemeProvider can hide it.
    // The main logic is now handled by CSS.
  }, []);

  return (
    <div
      id="preloader"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
    >
      <div id="preloader-logo" className="mb-4">
        <Logo />
      </div>

      <div className="w-48 h-2 bg-muted rounded-full overflow-hidden">
        <div id="preloader-bar" className="h-full bg-primary rounded-full" />
      </div>
    </div>
  );
}
