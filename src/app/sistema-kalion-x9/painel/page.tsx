import { Activity, ChartNoAxesCombined, FileText, HardDrive, Plus, ShieldCheck, Users } from "lucide-react";
import { AdminShell } from "@/components/admin/admin-shell";
import { readDatabase } from "@/lib/db";
import { currency } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const db = await readDatabase();
  const revenue = db.orders.reduce((sum, order) => sum + order.total, 0);
  const cards = [
    { icon: FileText, label: "Orçamentos", value: db.budgets.length, suffix: "Este mês", bar: "from-cyan-400 to-blue-500" },
    { icon: ShieldCheck, label: "Pedidos", value: db.orders.length, suffix: "Este mês", bar: "from-cyan-400 to-indigo-500" },
    { icon: Activity, label: "Garantias Ativas", value: db.warranties.length, suffix: "Em andamento", bar: "from-cyan-300 to-sky-500" },
    { icon: Users, label: "Clientes", value: db.clients.length, suffix: "Cadastrados", bar: "from-fuchsia-400 to-violet-500" },
    { icon: ChartNoAxesCombined, label: "Receita Mensal", value: currency(revenue), suffix: "Este mês", bar: "from-emerald-300 to-cyan-400" },
  ];
  const latest = [...db.budgets, ...db.orders].slice(0, 5);

  return (
    <AdminShell title="Painel Administrativo" description="Bem-vindo de volta, Administrador!">
      <div className="space-y-8">
        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.label} className="tech-card hud-panel dashboard-block rounded-[2rem] p-5">
                <div className="inline-flex rounded-2xl border border-cyan-400/15 bg-cyan-400/10 p-3 text-cyan-300">
                  <Icon size={24} />
                </div>
                <p className="mt-5 text-sm tracking-[0.16em] text-slate-300 uppercase">{card.label}</p>
                <p className="mt-2 text-[2.15rem] leading-none text-white">{String(card.value)}</p>
                <p className="mt-1 text-sm text-slate-400">{card.suffix}</p>
                <div className={`mt-5 h-1.5 rounded-full bg-[linear-gradient(90deg,var(--tw-gradient-stops))] ${card.bar}`} />
              </div>
            );
          })}
        </section>

        <section className="grid gap-8 xl:grid-cols-[1.22fr_.78fr]">
          <div className="space-y-8">
            <div className="tech-card hud-panel dashboard-block rounded-[2rem] p-6">
              <h2 className="text-xl uppercase text-white">Ações Rápidas</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {[
                  ["Novo Orçamento", "Criar orçamento em PDF", "/sistema-kalion-x9/painel/orcamentos"],
                  ["Novo Pedido", "Gerar pedido em PDF", "/sistema-kalion-x9/painel/pedidos"],
                  ["Nova Garantia", "Emitir garantia em PDF", "/sistema-kalion-x9/painel/garantias"],
                  ["Novo Cliente", "Cadastrar cliente", "/sistema-kalion-x9/painel/clientes"],
                ].map(([title, subtitle, href]) => (
                  <a key={title} href={href} className="rounded-[1.5rem] border border-cyan-400/15 bg-[#081221] px-5 py-5 text-slate-200 shadow-[0_18px_36px_rgba(0,0,0,0.22)] transition hover:border-cyan-300/40">
                    <div className="flex items-center gap-4">
                      <div className="rounded-2xl border border-cyan-400/15 bg-cyan-400/10 p-3 text-cyan-300">
                        <Plus size={18} />
                      </div>
                      <div>
                        <p className="text-lg text-white">{title}</p>
                        <p className="text-sm text-slate-400">{subtitle}</p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="tech-card hud-panel dashboard-block rounded-[2rem] p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl uppercase text-white">Últimos Orçamentos / Pedidos</h2>
                <button className="rounded-full border border-cyan-400/18 px-4 py-2 text-xs uppercase tracking-[0.14em] text-cyan-200">
                  Ver todos
                </button>
              </div>
              <div className="mt-6 overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead className="text-cyan-200">
                    <tr>
                      <th className="px-3 py-3">Nº</th>
                      <th className="px-3 py-3">Tipo</th>
                      <th className="px-3 py-3">Cliente</th>
                      <th className="px-3 py-3">Data</th>
                      <th className="px-3 py-3">Valor</th>
                      <th className="px-3 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {latest.map((item) => {
                      const isBudget = item.id.startsWith("orc");
                      return (
                        <tr key={item.id} className="border-t border-cyan-400/8 text-slate-300">
                          <td className="px-3 py-3">{item.number}</td>
                          <td className="px-3 py-3">{isBudget ? "Orçamento" : "Pedido"}</td>
                          <td className="px-3 py-3">{db.clients.find((client) => client.id === item.clientId)?.name || "-"}</td>
                          <td className="px-3 py-3">{item.createdAt}</td>
                          <td className="px-3 py-3">{currency(item.total)}</td>
                          <td className="px-3 py-3">
                            <span className="rounded-full border border-cyan-400/18 bg-cyan-400/10 px-3 py-1 text-xs uppercase tracking-[0.14em] text-cyan-100">
                              {item.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="tech-card hud-panel dashboard-block rounded-[2rem] p-6">
              <h2 className="text-xl uppercase text-white">Modelos de Documentos</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {[
                  ["ORÇAMENTO", "Padrão Kalion - Azul"],
                  ["PEDIDO", "Padrão Kalion - Verde"],
                  ["GARANTIA", "Padrão Kalion - Roxo"],
                ].map(([title, subtitle], index) => (
                  <div key={title} className="rounded-[1.5rem] border border-cyan-400/15 bg-[#081221] p-4 shadow-[0_18px_40px_rgba(0,0,0,0.22)]">
                    <div className={`h-44 rounded-[1.2rem] border border-white/8 bg-[linear-gradient(180deg,#ffffff,#e8eef7)] p-4 ${index === 1 ? "shadow-[inset_0_-90px_120px_rgba(16,185,129,0.15)]" : ""} ${index === 2 ? "shadow-[inset_0_-90px_120px_rgba(168,85,247,0.12)]" : ""}`}>
                      <div className="flex items-center justify-between text-black">
                        <span className="text-sm font-bold">{title}</span>
                        <span className="text-xs">Kalion</span>
                      </div>
                      <div className="mt-4 space-y-2">
                        <div className="h-2 rounded-full bg-slate-300" />
                        <div className="h-2 w-4/5 rounded-full bg-slate-200" />
                        <div className="h-2 w-3/5 rounded-full bg-slate-200" />
                      </div>
                      <div className="mt-8 h-16 rounded-xl bg-[linear-gradient(90deg,#07101d,#0a63ff)]" />
                    </div>
                    <p className="mt-4 text-sm text-slate-300">{subtitle}</p>
                    <button className="mt-4 w-full rounded-full border border-cyan-400/18 px-4 py-3 text-xs uppercase tracking-[0.14em] text-cyan-100">
                      Usar modelo
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="tech-card hud-panel dashboard-block rounded-[2rem] p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl uppercase text-white">Orçamentos x Pedidos</h2>
                <button className="rounded-full border border-cyan-400/18 px-4 py-2 text-xs uppercase tracking-[0.14em] text-cyan-200">
                  Este mês
                </button>
              </div>
              <div className="mt-6 h-72 rounded-[1.5rem] border border-cyan-400/12 bg-[#081221] p-5 shadow-[inset_0_0_0_1px_rgba(56,189,248,0.04)]">
                <div className="relative h-full">
                  <div className="absolute inset-0 grid grid-rows-5">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <div key={index} className="border-b border-cyan-400/8" />
                    ))}
                  </div>
                  <svg viewBox="0 0 400 220" className="relative h-full w-full">
                    <path d="M10 146 C40 116, 72 128, 100 118 S160 96, 190 100 S250 88, 280 78 S340 92, 390 58" fill="none" stroke="#3B82F6" strokeWidth="4" />
                    <path d="M10 168 C40 158, 72 162, 100 150 S160 148, 190 145 S250 132, 280 124 S340 138, 390 116" fill="none" stroke="#22C55E" strokeWidth="4" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="tech-card hud-panel dashboard-block rounded-[2rem] p-6">
              <div className="flex items-center gap-3">
                <HardDrive className="text-cyan-300" size={22} />
                <h2 className="text-xl uppercase text-white">Armazenamento</h2>
              </div>
              <p className="mt-4 text-slate-300">Você utilizou 42% do armazenamento</p>
              <div className="mt-6 h-3 overflow-hidden rounded-full bg-[#081221]">
                <div className="h-full w-[42%] rounded-full bg-[linear-gradient(90deg,#29d0ff,#0a63ff)]" />
              </div>
              <div className="mt-4 flex items-center justify-between text-sm text-slate-400">
                <span>4.2 GB / 10 GB</span>
                <button className="rounded-full border border-cyan-400/18 px-4 py-2 text-xs uppercase tracking-[0.14em] text-cyan-200">
                  Gerenciar
                </button>
              </div>
            </div>

            <div className="tech-card hud-panel dashboard-block overflow-hidden rounded-[2rem]">
              <div className="grid gap-0 lg:grid-cols-[.9fr_1.1fr]">
                <div className="p-6">
                  <h2 className="text-2xl uppercase text-white">Gere documentos profissionais</h2>
                  <p className="mt-4 text-lg leading-8 text-slate-300">
                    Orçamentos, pedidos e garantias em PDF com a identidade visual da sua empresa.
                  </p>
                  <button className="mt-6 rounded-full border border-cyan-400/18 px-5 py-3 text-sm uppercase tracking-[0.14em] text-cyan-100">
                    Ver Modelos de PDF
                  </button>
                </div>
                <div className="min-h-72 bg-[radial-gradient(circle_at_center,rgba(41,208,255,0.18),transparent_40%),linear-gradient(180deg,#081221,#050b14)] p-6">
                  <div className="ml-auto h-full max-w-72 rounded-[1.5rem] border border-cyan-400/15 bg-[linear-gradient(180deg,#ffffff,#e8eef7)] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
                    <div className="flex items-center justify-between text-black">
                      <span className="text-sm font-bold">Orçamento Kalion</span>
                      <span className="text-xs">KTL</span>
                    </div>
                    <div className="mt-5 space-y-2">
                      <div className="h-2 rounded-full bg-slate-300" />
                      <div className="h-2 w-5/6 rounded-full bg-slate-200" />
                      <div className="h-2 w-3/5 rounded-full bg-slate-200" />
                    </div>
                    <div className="mt-8 grid grid-cols-3 gap-2">
                      <div className="h-12 rounded-lg bg-slate-200" />
                      <div className="h-12 rounded-lg bg-slate-200" />
                      <div className="h-12 rounded-lg bg-slate-200" />
                    </div>
                    <div className="mt-8 h-24 rounded-xl bg-[linear-gradient(120deg,#081221,#0a63ff)]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </AdminShell>
  );
}
