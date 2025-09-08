/**
 * Input Component – Shadcn UI Wrapper
 *
 * A reusable, styled input field built on top of the native HTML <input> element.
 * Designed for consistent styling, accessibility, and integration with form libraries.
 *
 * 🔧 Props:
 * - All standard HTML input attributes (type, placeholder, value, onChange, etc.)
 * - `className`: Optional Tailwind classes to override or extend default styles
 *
 * 🧠 Usage:
 * ```tsx
 * <Input
 *   type="text"
 *   placeholder="Enter your name"
 *   value={name}
 *   onChange={(e) => setName(e.target.value)}
 * />
 * ```
 *
 * ✅ Features:
 * - Tailwind-based styling for consistent UI
 * - Focus ring and disabled state support
 * - `forwardRef` for compatibility with React Hook Form and other libraries
 * - Utility `cn()` used to merge custom classes
 *
 * 📦 Dependencies:
 * - `cn()` from `@/lib/utils` – utility to merge class names
 *
 * 🛡️ Security & Accessibility:
 * - Keyboard accessible
 * - Focus-visible ring for clarity
 * - Prevents interaction when disabled
 *
 * 📁 Location:
 * - `components/ui/input.tsx`
 *
 * 🔄 Last Updated: 2025-09-08
 */


import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
