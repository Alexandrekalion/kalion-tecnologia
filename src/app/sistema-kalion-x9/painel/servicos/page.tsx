import { AdminShell } from "@/components/admin/admin-shell";
import { EntityManager } from "@/components/admin/entity-manager";
import { readDatabase } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function ServicesAdminPage() {
  const db = await readDatabase();
  return (
    <AdminShell title="Produtos e Serviços" description="Base para montagem de documentos, propostas, pedidos e catálogo de serviços.">
      <EntityManager
        title="Serviço"
        resource="services"
        initialItems={db.services}
        fields={[
          { key: "name", label: "Nome" },
          { key: "category", label: "Categoria" },
          { key: "price", label: "Preço", type: "number" },
          { key: "description", label: "Descrição", type: "textarea" },
        ]}
      />
    </AdminShell>
  );
}
