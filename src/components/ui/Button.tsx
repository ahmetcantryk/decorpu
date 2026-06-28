import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes, ReactElement } from "react";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-sm font-medium tracking-tight transition-colors duration-200 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-accent text-accent-fg shadow-soft hover:bg-accent-strong",
        accent: "bg-accent text-accent-fg shadow-soft hover:bg-accent-strong",
        dark: "bg-ink text-bg hover:bg-ink-soft",
        outline: "border border-line-strong text-ink hover:border-ink hover:bg-bg-subtle",
        ghost: "text-ink hover:text-accent",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-sm",
        lg: "h-12 px-7 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps): ReactElement {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
