import { AdminShell } from "@/components/admin/admin-shell";
import { EntityManager } from "@/components/admin/entity-manager";
import { readDatabase } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function ProjectsAdminPage() {
  const db = await readDatabase();
  return (
    <AdminShell title="Projetos e Portfólio" description="Cadastre trabalhos para alimentar o portfólio público com imagem, descrição, tecnologias e vídeo.">
      <EntityManager
        title="Projeto"
        resource="projects"
        initialItems={db.projects}
        fields={[
          { key: "name", label: "Nome" },
          { key: "category", label: "Categoria" },
          { key: "cover", label: "Imagem de capa", type: "file", accept: "image/png,image/jpeg,image/webp,image/svg+xml", helpText: "Envie uma imagem do computador para a capa do projeto." },
          { key: "technologies", label: "Tecnologias" },
          { key: "excerpt", label: "Resumo", type: "textarea" },
          { key: "description", label: "Descrição completa", type: "textarea" },
          { key: "externalUrl", label: "Link externo" },
          { key: "videoUrl", label: "Vídeo", type: "file", accept: "video/mp4,video/webm,video/ogg,video/quicktime", helpText: "Opcional: envie um vídeo do projeto. Se preferir, depois eu também posso adicionar suporte para embed do YouTube." },
          { key: "featured", label: "Em destaque", type: "checkbox" },
        ]}
      />
    </AdminShell>
  );
}
