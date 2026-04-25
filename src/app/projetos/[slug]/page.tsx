import { ArrowUpRight, PlayCircle } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/site-shell";
import { ButtonLink } from "@/components/ui/button";
import { readDatabase } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const db = await readDatabase();
  const project = db.projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <SiteShell>
      <section className="px-4 pb-20 pt-12 sm:px-6 lg:px-8 lg:pt-20">
        <div className="mx-auto max-w-6xl space-y-10">
          <Link href="/projetos" className="text-sm tracking-[0.16em] uppercase text-cyan-300">
            ← Voltar para projetos
          </Link>
          <div className="grid gap-8 lg:grid-cols-[1fr_.9fr]">
            <div className="space-y-6">
              <span className="section-label">{project.category}</span>
              <h1 className="text-4xl uppercase text-white sm:text-5xl">{project.name}</h1>
              <p className="text-lg leading-8 text-slate-300">{project.description}</p>
              <div className="rounded-[2rem] border border-cyan-400/15 bg-[#081221] p-6">
                <p className="text-sm tracking-[0.16em] text-cyan-300 uppercase">Tecnologias utilizadas</p>
                <p className="mt-3 text-lg leading-8 text-slate-200">{project.technologies}</p>
              </div>
              <div className="flex flex-wrap gap-4">
                <ButtonLink href="/contato#orcamento">Solicitar algo parecido</ButtonLink>
                {project.externalUrl ? (
                  <ButtonLink href={project.externalUrl} variant="outline">
                    Ver link externo
                  </ButtonLink>
                ) : null}
              </div>
            </div>
            <div className="hud-panel overflow-hidden rounded-[2.4rem]">
              <div className="relative aspect-[16/11]">
                <img src={project.cover} alt={project.name} className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="hud-panel rounded-[2rem] p-6">
              <h2 className="text-2xl uppercase text-white">Escopo do projeto</h2>
              <p className="mt-4 text-lg leading-8 text-slate-300">
                Implementação com foco em usabilidade, organização visual, profundidade estética e confiança comercial.
                A estrutura foi pensada para destacar autoridade, clareza e experiência técnica.
              </p>
            </div>
            <div className="hud-panel rounded-[2rem] p-6">
              <h2 className="text-2xl uppercase text-white">Mídias e entregas</h2>
              <div className="mt-4 space-y-4 text-slate-300">
                {project.videoUrl ? (
                  <a href={project.videoUrl} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-2xl border border-cyan-400/15 bg-white/4 px-4 py-4">
                    <PlayCircle className="text-cyan-300" />
                    <span>Abrir vídeo relacionado ao projeto</span>
                  </a>
                ) : (
                  <div className="rounded-2xl border border-cyan-400/15 bg-white/4 px-4 py-4">
                    Projeto sem vídeo associado no momento.
                  </div>
                )}
                {project.externalUrl ? (
                  <a href={project.externalUrl} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-2xl border border-cyan-400/15 bg-white/4 px-4 py-4">
                    <ArrowUpRight className="text-cyan-300" />
                    <span>Visitar referência externa</span>
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
