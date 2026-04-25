"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ButtonLink } from "@/components/ui/button";
import { navigation } from "@/lib/site-content";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header id="top" className="sticky top-0 z-50 px-2 pt-3 sm:px-4 lg:px-6">
      <div className="mx-auto max-w-[1280px]">
        <div className="frame-shell flex items-center justify-between gap-4 px-3 py-3 sm:px-5">
          <Link
            href="/"
            className="relative flex min-w-[138px] items-center justify-center self-stretch rounded-[1.6rem] border border-cyan-400/18 bg-[#050d18] px-4 py-3 sm:min-w-[170px]"
          >
            <Image src="/brand/kalion-logo-header.png" alt="Kalion Tecnologia" width={340} height={250} className="h-auto w-full max-w-[170px]" />
          </Link>

          <nav className="hidden flex-1 items-center justify-center gap-8 lg:flex">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative text-sm font-medium tracking-[0.16em] uppercase text-slate-200 transition hover:text-cyan-300",
                  pathname === item.href &&
                    "text-cyan-300 after:absolute after:-bottom-3 after:left-0 after:h-0.5 after:w-full after:bg-cyan-300 after:shadow-[0_0_14px_rgba(41,208,255,0.8)]",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <ButtonLink href="/contato#orcamento" className="h-13 px-7">
              Solicitar Orçamento
            </ButtonLink>
            <button
              type="button"
              className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/20 bg-[#07111d] text-cyan-100"
              onClick={() => setOpen((value) => !value)}
              aria-label="Abrir menu"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

          <button
            type="button"
            className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/20 bg-[#07111d] text-cyan-100 lg:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label="Abrir menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {open ? (
          <div className="mt-3 lg:hidden">
            <div className="frame-shell px-4 py-4">
              <div className="flex flex-col gap-3">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "rounded-2xl px-4 py-3 text-sm tracking-[0.14em] uppercase text-slate-200 transition",
                      pathname === item.href ? "border border-cyan-400/30 bg-cyan-400/10 text-cyan-300" : "bg-white/5",
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
                <ButtonLink href="/contato#orcamento" className="w-full">
                  Solicitar Orçamento
                </ButtonLink>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
