"use client";

import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type SharedProps = {
  children: ReactNode;
  variant?: "primary" | "ghost" | "outline";
  className?: string;
};

const styles = {
  primary:
    "pulse-neon bg-[linear-gradient(90deg,#0a63ff,#29d0ff)] text-white shadow-[0_0_24px_rgba(41,208,255,0.25)] hover:scale-[1.01]",
  ghost: "bg-white/5 text-slate-100 hover:bg-white/10 hover:text-cyan-100",
  outline:
    "border border-cyan-400/40 bg-cyan-400/5 text-cyan-100 shadow-[0_0_24px_rgba(41,208,255,0.08)] hover:border-cyan-300 hover:bg-cyan-400/10",
};

export function Button({
  children,
  variant = "primary",
  className,
  ...props
}: SharedProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-semibold tracking-[0.16em] uppercase transition duration-300",
        styles[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  children,
  variant = "primary",
  className,
  href,
  ...props
}: SharedProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-semibold tracking-[0.16em] uppercase transition duration-300",
        styles[variant],
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
