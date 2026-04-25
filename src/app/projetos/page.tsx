import { ProjectsGrid } from "@/components/projects-grid";
import { SiteShell } from "@/components/site-shell";
import { ButtonLink } from "@/components/ui/button";
import { readDatabase } from "@/lib/db";
import { buildWhatsAppUrl } from "@/lib/public-settings";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const db = await readDatabase();
  const settings = db.settings;

  return (
    <SiteShell>
      <section className="px-2 pb-16 pt-4 sm:px-4 lg:px-6">
        <div className="mx-auto max-w-[1280px] space-y-8">
          <div className="frame-shell relative overflow-hidden px-6 py-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(41,208,255,0.12),transparent_16%),linear-gradient(180deg,rgba(5,11,20,0.88),rgba(4,8,15,0.96))]" />
            <div className="relative z-10 grid gap-8 xl:grid-cols-[.95fr_1.05fr]">
              <div className="space-y-6">
                <div className="text-sm tracking-[0.16em] uppercase text-cyan-300">Home &gt; Projetos</div>
                <div>
                  <p className="mb-3 text-sm tracking-[0.18em] uppercase text-cyan-300">Portfólio de Projetos</p>
                  <h1 className="max-w-[640px] text-[3.5rem] uppercase leading-[0.92] tracking-[-0.03em] text-white md:text-[4.45rem]">
                    Conheça alguns
                    <br />
                    <span className="text-cyan-400">trabalhos</span> realizados
                  </h1>
                  <p className="mt-5 max-w-[620px] text-[1.04rem] leading-8 text-slate-300">
                    Soluções desenvolvidas com tecnologia, inovação e foco em resultados.
                    Cada projeto é único, cada cliente é especial.
                  </p>
                </div>
              </div>

              <div className="relative min-h-[264px]">
                <div className="absolute inset-x-[12%] top-6 h-20 rounded-full border border-cyan-400/15 bg-cyan-400/8" />
                <div className="absolute top-12 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(41,208,255,0.85)]" />
                <div className="absolute bottom-5 left-1/2 h-20 w-[74%] -translate-x-1/2 rounded-full border border-cyan-400/35 bg-cyan-400/10 shadow-[0_0_32px_rgba(41,208,255,0.2)]" />
                <div className="absolute bottom-10 left-1/2 h-34 w-[56%] -translate-x-1/2 rounded-full border border-cyan-400/18" />
                <div className="frame-shell hero-glow grid h-full items-center gap-4 bg-transparent px-5 py-5 sm:grid-cols-3">
                  {[
                    ["+150", "Projetos Concluídos"],
                    ["+120", "Clientes Atendidos"],
                    ["+10", "Anos de Experiência"],
                  ].map(([value, label]) => (
                    <div key={label} className="text-center">
                      <p className="text-[2.3rem] leading-none text-cyan-300">{value}</p>
                      <p className="mt-2 text-[0.72rem] tracking-[0.18em] uppercase text-slate-300">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <ProjectsGrid projects={db.projects} />

          <div className="frame-shell grid gap-8 px-8 py-8 lg:grid-cols-[1fr_.95fr]">
            <div>
              <p className="mb-3 text-sm tracking-[0.18em] uppercase text-cyan-300">Tem um projeto em mente?</p>
              <h2 className="text-[3.3rem] uppercase leading-[0.92] tracking-[-0.03em] text-white">
                Vamos tirar do <span className="text-cyan-400">papel!</span>
              </h2>
              <p className="mt-4 max-w-[620px] text-[1.04rem] leading-8 text-slate-300">
                Fale com a Kalion Tecnologia e transforme sua ideia em uma solução tecnológica eficiente, moderna e profissional.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {["Atendimento Personalizado", "Soluções Sob Medida", "Suporte Especializado"].map((item) => (
                  <div key={item} className="rounded-2xl border border-cyan-400/14 bg-[#081221] px-4 py-4 text-sm tracking-[0.08em] text-slate-200">
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-4 self-center">
              <ButtonLink href="/contato#orcamento">Solicitar Orçamento</ButtonLink>
              <ButtonLink href={buildWhatsAppUrl(settings.whatsapp, "Olá, quero apresentar um projeto para a Kalion.")} variant="outline">
                Falar no WhatsApp
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
