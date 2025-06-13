import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // Base styles with Tailwind utilities and custom CSS variables
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md  text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50  [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4  shrink-0 [&_svg]:shrink-0  outline-none focus:outline-none focus-visible:outline-none  focus-visible:ring-0 focus-visible:border-none  ring-0 border-none  hover:border-none hover:ring-0  aria-invalid:ring-0 aria-invalid:border-none  dark:aria-invalid:ring-0",
  {
    variants: {
      variant: {
        none: "",
        default:
          "bg-[var(--color-primary)] text-[var(--color-primary-foreground)] shadow-sm hover:bg-[var(--color-primary)]/90",
        destructive:
          "bg-[var(--color-destructive)] text-[var(--color-destructive-foreground)] shadow-sm hover:bg-[var(--color-destructive)]/90 focus-visible:ring-[var(--color-destructive)]/20 dark:focus-visible:ring-[var(--color-destructive)]/40 dark:bg-[var(--color-destructive)]/60",
        outline:
          "border border-[var(--color-border)] bg-[var(--color-background)] shadow-sm hover:bg-[var(--color-accent)] hover:text-[var(--color-accent-foreground)] dark:bg-[var(--color-input)]/30 dark:border-[var(--color-input)] dark:hover:bg-[var(--color-input)]/50",
        secondary:
          "bg-[var(--color-secondary)] text-[var(--color-secondary-foreground)] shadow-sm hover:bg-[var(--color-secondary)]/80",
        ghost:
          "hover:bg-[var(--color-accent)] hover:text-[var(--color-accent-foreground)] dark:hover:bg-[var(--color-accent)]/50",
        link: "text-[var(--color-primary)] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-[var(--radius-sm)] gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-[var(--radius-lg)] px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))} // Uses cn to merge classes
      {...props}
    />
  );
}

export { Button };