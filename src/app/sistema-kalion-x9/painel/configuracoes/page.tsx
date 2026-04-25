import { AdminShell } from "@/components/admin/admin-shell";
import { SettingsForm } from "@/components/admin/settings-form";
import { readDatabase } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const db = await readDatabase();
  return (
    <AdminShell title="Configurações" description="Informações da empresa, contatos principais e identidade usada no sistema.">
      <SettingsForm initialSettings={db.settings} />
    </AdminShell>
  );
}
