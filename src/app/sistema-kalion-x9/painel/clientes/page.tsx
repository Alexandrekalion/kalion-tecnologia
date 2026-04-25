import { AdminShell } from "@/components/admin/admin-shell";
import { EntityManager } from "@/components/admin/entity-manager";
import { readDatabase } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function ClientsPage() {
  const db = await readDatabase();
  return (
    <AdminShell title="Clientes" description="Cadastre, edite e pesquise clientes com dados completos e histórico operacional.">
      <EntityManager
        title="Cliente"
        resource="clients"
        initialItems={db.clients}
        fields={[
          { key: "name", label: "Nome" },
          { key: "phone", label: "Telefone" },
          { key: "email", label: "E-mail" },
          { key: "document", label: "CPF/CNPJ" },
          { key: "address", label: "Endereço" },
          { key: "notes", label: "Observações", type: "textarea" },
        ]}
      />
    </AdminShell>
  );
}
