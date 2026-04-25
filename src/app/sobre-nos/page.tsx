import { SectionHeading } from "@/components/section-heading";
import { SiteShell } from "@/components/site-shell";

const values = [
  "Excelência técnica com execução organizada",
  "Soluções sob medida para cada operação",
  "Segurança, estabilidade e clareza no atendimento",
  "Evolução contínua com foco em resultado",
];

export default function AboutPage() {
  return (
    <SiteShell>
      <section className="px-4 pb-16 pt-12 sm:px-6 lg:px-8 lg:pt-20">
        <div className="mx-auto max-w-7xl space-y-12">
          <SectionHeading
            eyebrow="Sobre nós"
            title="Estrutura profissional para empresas que precisam de tecnologia com confiança"
            description="A Kalion Tecnologia nasceu para unir presença digital, infraestrutura, suporte e segurança em uma operação sóbria, moderna e confiável."
          />
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
            <article className="hud-panel rounded-[2rem] p-8">
              <h3 className="text-2xl uppercase text-white">Nossa história</h3>
              <p className="mt-4 text-lg leading-8 text-slate-300">
                Atuamos no atendimento a pequenas e médias empresas, comércios, clínicas, escritórios e condomínios,
                entregando projetos que combinam desenvolvimento web, infraestrutura de redes, suporte técnico,
                segurança eletrônica e automação de processos.
              </p>
              <div className="mt-8 space-y-6">
                <div className="rounded-[1.5rem] border border-cyan-400/15 bg-white/4 p-5">
                  <p className="text-sm tracking-[0.16em] text-cyan-300 uppercase">Missão</p>
                  <p className="mt-2 text-slate-300">Transformar necessidades operacionais em soluções tecnológicas claras, eficientes e escaláveis.</p>
                </div>
                <div className="rounded-[1.5rem] border border-cyan-400/15 bg-white/4 p-5">
                  <p className="text-sm tracking-[0.16em] text-cyan-300 uppercase">Visão</p>
                  <p className="mt-2 text-slate-300">Ser referência regional em soluções tecnológicas integradas com alto padrão de atendimento e entrega.</p>
                </div>
              </div>
            </article>
            <article className="hud-panel rounded-[2rem] p-8">
              <h3 className="text-2xl uppercase text-white">Linha do tempo</h3>
              <div className="mt-8 space-y-6">
                {[
                  ["Base técnica", "Experiência prática em TI, suporte, infraestrutura e monitoramento."],
                  ["Expansão de serviços", "Integração entre segurança eletrônica, redes, automação e desenvolvimento web."],
                  ["Posicionamento premium", "Criação de uma presença institucional moderna, confiável e preparada para crescer."],
                ].map(([title, text], index) => (
                  <div key={title} className="relative pl-10">
                    <div className="absolute left-0 top-1.5 h-4 w-4 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(41,208,255,0.6)]" />
                    {index < 2 ? <div className="absolute left-[7px] top-6 h-20 w-px bg-cyan-400/30" /> : null}
                    <h4 className="text-xl text-white">{title}</h4>
                    <p className="mt-2 text-slate-300">{text}</p>
                  </div>
                ))}
              </div>
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {values.map((item) => (
                  <div key={item} className="rounded-2xl border border-cyan-400/15 bg-[#091221] px-4 py-4 text-slate-200">
                    {item}
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
