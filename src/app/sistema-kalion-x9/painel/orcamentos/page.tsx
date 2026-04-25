import { AdminShell } from "@/components/admin/admin-shell";
import { DocumentManager } from "@/components/admin/document-manager";
import { readDatabase } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function BudgetsPage() {
  const db = await readDatabase();
  return (
    <AdminShell title="Orçamentos" description="Crie propostas comerciais com itens, validade, prazo, valor total e geração de PDF.">
      <DocumentManager type="budgets" title="Orçamento" initialItems={db.budgets as unknown as Array<Record<string, unknown>>} clients={db.clients} settings={db.settings} />
    </AdminShell>
  );
}
