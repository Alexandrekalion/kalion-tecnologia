"use client";

import { ExternalLink, Play, Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Project } from "@/lib/types";

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  const categories = useMemo(
    () => ["Todos", ...Array.from(new Set(projects.map((project) => project.category)))],
    [projects],
  );
  const [selected, setSelected] = useState("Todos");
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () =>
      projects.filter((project) => {
        const byCategory = selected === "Todos" || project.category === selected;
        const byQuery =
          query.trim() === "" ||
          `${project.name} ${project.technologies} ${project.excerpt}`.toLowerCase().includes(query.toLowerCase());
        return byCategory && byQuery;
      }),
    [projects, query, selected],
  );

  return (
    <div className="space-y-8">
      <div className="frame-shell px-4 py-4">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelected(category)}
                className={`rounded-xl border px-5 py-[0.82rem] text-[0.76rem] tracking-[0.16em] uppercase transition ${
                  selected === category
                    ? "border-cyan-300 bg-cyan-400/15 text-cyan-100 shadow-[0_0_18px_rgba(41,208,255,0.18)]"
                    : "border-cyan-400/15 bg-white/5 text-slate-300 hover:border-cyan-400/40"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <label className="flex min-w-full items-center gap-3 rounded-xl border border-cyan-400/20 bg-[#081221] px-4 py-[0.82rem] xl:min-w-[300px]">
            <Search size={18} className="text-cyan-300" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar projeto..."
              className="w-full bg-transparent text-slate-100 outline-none placeholder:text-slate-500"
            />
          </label>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {filtered.map((project) => (
          <article key={project.id} className="tech-card hud-panel dashboard-block group flex flex-col overflow-hidden rounded-[1.7rem]">
            <div className="project-thumb relative aspect-[16/10.7] overflow-hidden border-b border-cyan-400/10">
              <img
                src={project.cover}
                alt={project.name}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute left-4 top-4 rounded-lg border border-cyan-400/30 bg-[#07101d]/92 px-3 py-1 text-[10px] tracking-[0.16em] uppercase text-cyan-200">
                {project.category}
              </div>
              {project.videoUrl ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-full border border-white/30 bg-black/45 p-4 text-white shadow-[0_0_18px_rgba(255,255,255,0.15)]">
                    <Play size={28} fill="currentColor" />
                  </div>
                </div>
              ) : null}
            </div>
            <div className="flex flex-1 flex-col space-y-4 p-5">
              <div>
                <h3 className="min-h-[3.5rem] text-[1.4rem] leading-[1.12] text-white [text-wrap:balance]">{project.name}</h3>
                <p className="mt-3 min-h-[94px] text-[0.92rem] leading-7 text-slate-300">{project.excerpt}</p>
              </div>
              <p className="text-[0.73rem] leading-6 text-slate-400">
                <span className="text-cyan-300">Tecnologias:</span> {project.technologies}
              </p>
              <div className="mt-auto flex gap-3 pt-1.5">
                <Link
                  href={`/projetos/${project.slug}`}
                  className="inline-flex h-12 flex-1 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/8 px-4 text-[0.76rem] tracking-[0.16em] uppercase text-cyan-100 transition hover:bg-cyan-400/14"
                >
                  Ver Detalhes
                </Link>
                <Link
                  href={`/projetos/${project.slug}`}
                  className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-400/20 bg-white/5 text-cyan-100"
                >
                  <ExternalLink size={16} />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
