import type { ReactNode } from "react";
import { Bell, Menu, Search, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { LogoutButton } from "@/components/admin/logout-button";
import { adminModules } from "@/lib/site-content";

export function AdminShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#030711,#08101b)] text-slate-100">
      <div className="grid min-h-screen lg:grid-cols-[290px_1fr]">
        <aside className="border-r border-cyan-400/10 bg-[#050b14]/95 p-6 shadow-[inset_-1px_0_0_rgba(41,208,255,0.05)]">
          <div className="mb-7 flex items-center justify-between">
            <Image src="/brand/kalion-logo-header.png" alt="Kalion Tecnologia" width={340} height={250} className="h-auto w-36" />
            <button className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-400/15 bg-white/5 text-cyan-100">
              <Menu size={18} />
            </button>
          </div>

          <div className="dashboard-block rounded-[1.7rem] border border-cyan-400/14 bg-[#091221] p-4">
            <p className="text-xs tracking-[0.18em] text-cyan-300 uppercase">Navegação</p>
            <nav className="mt-4 space-y-2">
              {adminModules.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-2xl border px-4 py-3 transition ${
                      index === 0
                        ? "border-cyan-400/30 bg-cyan-400/12 text-cyan-100"
                        : "border-transparent text-slate-300 hover:border-cyan-400/20 hover:bg-cyan-400/10 hover:text-cyan-100"
                    }`}
                  >
                    <Icon size={18} />
                    <span>{item.title}</span>
                  </Link>
                );
              })}
              <Link href="/sistema-kalion-x9/painel/relatorios" className="flex items-center gap-3 rounded-2xl px-4 py-3 text-slate-300 transition hover:bg-cyan-400/10 hover:text-cyan-100">
                Relatórios
              </Link>
              <Link href="/sistema-kalion-x9/painel/configuracoes" className="flex items-center gap-3 rounded-2xl px-4 py-3 text-slate-300 transition hover:bg-cyan-400/10 hover:text-cyan-100">
                Configurações
              </Link>
              <Link href="/sistema-kalion-x9/painel/backup" className="flex items-center gap-3 rounded-2xl px-4 py-3 text-slate-300 transition hover:bg-cyan-400/10 hover:text-cyan-100">
                Backup
              </Link>
            </nav>
          </div>

          <div className="dashboard-block mt-8 rounded-[2rem] border border-cyan-400/15 bg-[#091221] p-5 text-sm text-slate-300">
            <Image src="/brand/kalion-logo-header.png" alt="Kalion Tecnologia" width={340} height={250} className="h-auto w-28" />
            <p className="mt-4">Kalion Tecnologia</p>
            <p className="mt-2">CNPJ: 00.000.000/0000-00</p>
            <p className="mt-1">contato@exemplo.com</p>
            <p className="mt-1">(11) 90000-0000</p>
            <p className="mt-1">Sao Jose dos Campos - SP</p>
          </div>
        </aside>

        <div className="px-4 py-6 sm:px-6 lg:px-8">
          <header className="frame-shell hero-glow mb-8 px-6 py-5">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="section-label">Painel administrativo</p>
                <h1 className="mt-3 text-3xl uppercase text-white">{title}</h1>
                <p className="mt-2 text-slate-300">{description}</p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <label className="flex min-w-80 items-center gap-3 rounded-full border border-cyan-400/18 bg-[#091221] px-4 py-[0.82rem] shadow-[0_16px_30px_rgba(0,0,0,0.24)]">
                  <Search size={18} className="text-cyan-300" />
                  <input placeholder="Buscar no sistema..." className="w-full bg-transparent text-slate-100 outline-none placeholder:text-slate-500" />
                </label>
                <button className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-cyan-400/18 bg-[#091221] text-cyan-200 shadow-[0_14px_26px_rgba(0,0,0,0.2)]">
                  <Bell size={18} />
                </button>
                <button className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-cyan-400/18 bg-[#091221] text-cyan-200 shadow-[0_14px_26px_rgba(0,0,0,0.2)]">
                  <Settings size={18} />
                </button>
                <div className="flex items-center gap-3 rounded-full border border-cyan-400/18 bg-[#091221] px-3 py-2 shadow-[0_16px_30px_rgba(0,0,0,0.24)]">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[linear-gradient(180deg,#29d0ff,#0a63ff)] font-semibold text-white">
                    A
                  </div>
                  <div className="pr-2">
                    <p className="text-sm text-white">Administrador</p>
                    <p className="text-xs text-emerald-300">Online</p>
                  </div>
                </div>
                <LogoutButton />
              </div>
            </div>
          </header>
          {children}
        </div>
      </div>
    </div>
  );
}
