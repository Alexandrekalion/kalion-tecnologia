import { AdminShell } from "@/components/admin/admin-shell";
import { currency } from "@/lib/utils";
import { readDatabase } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function ReportsPage() {
  const db = await readDatabase();
  const totalBudgets = db.budgets.reduce((sum, item) => sum + item.total, 0);
  const totalOrders = db.orders.reduce((sum, item) => sum + item.total, 0);

  return (
    <AdminShell title="Relatórios" description="Visão resumida de documentos, clientes, serviços e volume financeiro da operação.">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {[
          ["Total em orçamentos", currency(totalBudgets)],
          ["Total em pedidos", currency(totalOrders)],
          ["Clientes cadastrados", String(db.clients.length)],
          ["Projetos no portfólio", String(db.projects.length)],
        ].map(([label, value]) => (
          <div key={label} className="hud-panel rounded-[2rem] p-6">
            <p className="text-sm tracking-[0.16em] text-slate-300 uppercase">{label}</p>
            <p className="mt-4 text-3xl text-white">{value}</p>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
