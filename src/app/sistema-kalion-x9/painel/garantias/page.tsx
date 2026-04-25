import { AdminShell } from "@/components/admin/admin-shell";
import { DocumentManager } from "@/components/admin/document-manager";
import { readDatabase } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function WarrantiesPage() {
  const db = await readDatabase();
  return (
    <AdminShell title="Garantias" description="Emita garantias com cobertura, prazo, cliente relacionado e documento em PDF.">
      <DocumentManager type="warranties" title="Garantia" initialItems={db.warranties as unknown as Array<Record<string, unknown>>} clients={db.clients} settings={db.settings} />
    </AdminShell>
  );
}
