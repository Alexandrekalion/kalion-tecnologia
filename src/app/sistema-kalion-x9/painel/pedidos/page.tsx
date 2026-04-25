import { AdminShell } from "@/components/admin/admin-shell";
import { DocumentManager } from "@/components/admin/document-manager";
import { readDatabase } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function OrdersPage() {
  const db = await readDatabase();
  return (
    <AdminShell title="Pedidos" description="Formalize vendas e contratações com status, itens, pagamentos e geração de PDF.">
      <DocumentManager type="orders" title="Pedido" initialItems={db.orders as unknown as Array<Record<string, unknown>>} clients={db.clients} settings={db.settings} />
    </AdminShell>
  );
}
