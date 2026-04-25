import { AdminShell } from "@/components/admin/admin-shell";
import { readDatabase } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function BackupPage() {
  const db = await readDatabase();

  return (
    <AdminShell title="Backup" description="Visão básica do banco local e estratégia inicial para exportação e segurança dos dados.">
      <div className="grid gap-8 xl:grid-cols-[.9fr_1.1fr]">
        <div className="hud-panel rounded-[2rem] p-6">
          <h2 className="text-2xl uppercase text-white">Resumo</h2>
          <div className="mt-6 space-y-3 text-slate-300">
            <p>Clientes: {db.clients.length}</p>
            <p>Serviços: {db.services.length}</p>
            <p>Projetos: {db.projects.length}</p>
            <p>Leads capturados: {db.leads.length}</p>
          </div>
        </div>
        <div className="hud-panel rounded-[2rem] p-6">
          <h2 className="text-2xl uppercase text-white">Estrutura atual</h2>
          <p className="mt-4 text-lg leading-8 text-slate-300">
            O projeto já utiliza armazenamento local em JSON para acelerar implantação e facilitar evolução futura
            para banco de dados relacional, backups automatizados e múltiplos usuários.
          </p>
          <pre className="mt-6 overflow-x-auto rounded-[1.5rem] border border-cyan-400/12 bg-[#081221] p-5 text-xs text-slate-300">
{`data/kalion-db.json
├─ settings
├─ users
├─ clients
├─ services
├─ projects
├─ budgets
├─ orders
├─ warranties
└─ leads`}
          </pre>
        </div>
      </div>
    </AdminShell>
  );
}
