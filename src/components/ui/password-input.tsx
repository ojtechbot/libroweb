"use client"

import * as React from "react"
import { Eye, EyeOff } from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const PasswordInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, ...props }, ref) => {
  const [show, setShow] = React.useState(false)

  return (
    <div className="relative">
      <Input
        type={show ? "text" : "password"}
        className={cn("pr-10", className)}
        ref={ref}
        {...props}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute inset-y-0 right-0 h-full w-10 text-muted-foreground hover:bg-transparent"
        onClick={() => setShow(!show)}
      >
        {show ? <EyeOff /> : <Eye />}
        <span className="sr-only">{show ? "Hide password" : "Show password"}</span>
      </Button>
    </div>
  )
})
PasswordInput.displayName = "PasswordInput"

export { PasswordInput }
