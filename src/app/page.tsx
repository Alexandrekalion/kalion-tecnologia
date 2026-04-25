import { ArrowRight, BadgeCheck, Boxes, Camera, Code2, Cuboid, Headset, Rocket, Shield, ShieldCheck, Workflow } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Counter } from "@/components/counter";
import { SiteShell } from "@/components/site-shell";
import { ButtonLink } from "@/components/ui/button";
import { buildWhatsAppUrl, getPublicSettings } from "@/lib/public-settings";
import { techPartners } from "@/lib/site-content";

export const dynamic = "force-dynamic";

const serviceCards = [
  {
    title: "Desenvolvimento Web",
    description: "Sites institucionais, lojas virtuais, sistemas web e painéis administrativos sob medida.",
    icon: Code2,
  },
  {
    title: "Segurança Eletrônica",
    description: "Instalação de câmeras, DVR, NVR, monitoramento em TV e celular com alta definição.",
    icon: Camera,
  },
  {
    title: "Redes e Infraestrutura",
    description: "Cabeamento estruturado, organização de rack, roteadores, switches e muito mais.",
    icon: Workflow,
  },
  {
    title: "Sistemas e Automação",
    description: "Sistemas web, integrações, automação de processos e soluções personalizadas.",
    icon: Boxes,
  },
  {
    title: "Suporte e Manutenção",
    description: "Suporte técnico, manutenção de sistemas, formatação, instalação e configuração completa.",
    icon: Shield,
  },
  {
    title: "Impressão 3D e Tecnologia",
    description: "Impressão 3D, modelagem e prototipagem para diversas necessidades.",
    icon: Cuboid,
  },
];

const highlights = [
  "Atendimento Personalizado",
  "Soluções Sob Medida",
  "Experiência Comprovada",
  "Suporte Rápido e Confiável",
];

export default function HomePage() {
  const settingsPromise = getPublicSettings();
  return settingsPromise.then((settings) => (
    <SiteShell>
      <section className="px-2 pb-8 pt-4 sm:px-4 lg:px-6">
        <div className="mx-auto max-w-[1280px]">
          <div className="frame-shell hero-glow relative overflow-hidden px-5 py-7 sm:px-10 sm:py-9">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(41,208,255,0.18),transparent_18%),linear-gradient(180deg,rgba(6,12,22,0.82),rgba(4,8,14,0.94))]" />
            <div className="absolute left-0 top-20 h-[420px] w-[340px] bg-[linear-gradient(90deg,rgba(18,77,159,0.18),transparent)]" />
            <div className="absolute inset-y-0 left-0 w-[240px] bg-[linear-gradient(90deg,rgba(41,208,255,0.05),transparent)] opacity-70" />
            <div className="absolute right-[10%] top-[7%] h-20 w-56 rounded-full border border-cyan-400/18 bg-cyan-400/8 blur-[1px]" />
            <div className="absolute right-[22%] top-[8%] h-4 w-4 rounded-full bg-cyan-300 shadow-[0_0_20px_rgba(41,208,255,0.95)]" />
            <div className="absolute right-[11%] top-[34%] h-[352px] w-px bg-gradient-to-b from-transparent via-cyan-300 to-transparent shadow-[0_0_20px_rgba(41,208,255,0.9)]" />
            <div className="absolute right-[27%] top-[26%] h-[286px] w-px bg-gradient-to-b from-transparent via-cyan-300 to-transparent shadow-[0_0_18px_rgba(41,208,255,0.74)]" />
            <div className="absolute bottom-9 right-[9%] h-24 w-[43%] rounded-full border border-cyan-400/40 bg-cyan-400/10 shadow-[0_0_44px_rgba(41,208,255,0.28)]" />
            <div className="absolute bottom-[3.75rem] right-[15%] h-42 w-[31%] rounded-full border border-cyan-400/20" />

            <div className="relative z-10 grid gap-6 xl:grid-cols-[.92fr_1.08fr]">
              <div className="flex min-h-[542px] flex-col justify-center pt-2">
                <div className="mb-5 flex items-center gap-3 text-[0.82rem] tracking-[0.14em] uppercase text-slate-200">
                  <span className="text-cyan-300">{"///"}</span>
                  Bem-vindo à Kalion Tecnologia
                  <span className="text-cyan-300">{"///"}</span>
                </div>
                <h1 className="hero-title max-w-[590px] text-[3.35rem] uppercase leading-[0.9] tracking-[-0.03em] text-white md:text-[4.28rem]">
                  Tecnologia que <span className="text-cyan-400">conecta.</span>
                  <br />
                  Soluções que <span className="text-cyan-400">transformam.</span>
                </h1>
                <p className="hero-copy mt-6 max-w-[560px] text-[1.08rem] leading-8 text-slate-300">
                  Desenvolvimento de sites, sistemas web, segurança eletrônica, redes e suporte técnico com excelência e inovação para impulsionar o seu negócio.
                </p>
                <div className="mt-8 flex flex-wrap gap-3.5">
                  <ButtonLink href="/contato#orcamento">Solicitar Orçamento</ButtonLink>
                  <ButtonLink href={buildWhatsAppUrl(settings.whatsapp, "Olá, quero falar com a Kalion Tecnologia.")} variant="outline">
                    Falar no WhatsApp
                  </ButtonLink>
                  <ButtonLink href="/projetos" variant="ghost">
                    Ver Portfólio
                  </ButtonLink>
                </div>
                <div className="mt-7 flex items-center gap-3 text-[0.82rem] tracking-[0.14em] uppercase text-slate-300">
                  <ShieldCheck className="text-cyan-300" size={18} />
                  Garantia e suporte especializado
                </div>
              </div>

              <div className="relative min-h-[542px]">
                <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_70%_22%,rgba(41,208,255,0.12),transparent_20%),linear-gradient(180deg,rgba(4,10,18,0.35),transparent)]" />
                <div className="absolute left-1/2 top-[7%] h-24 w-64 -translate-x-1/2 rounded-full border border-cyan-400/15 bg-cyan-400/6" />
                <div className="absolute bottom-9 left-1/2 h-24 w-[87%] -translate-x-1/2 rounded-full border border-cyan-400/40 bg-cyan-400/10 shadow-[0_0_44px_rgba(41,208,255,0.28)]" />
                <div className="absolute bottom-[3.7rem] left-1/2 h-40 w-[69%] -translate-x-1/2 rounded-full border border-cyan-400/18" />
                <div className="absolute bottom-24 left-[18%] h-60 w-px bg-gradient-to-t from-transparent via-cyan-300 to-transparent shadow-[0_0_20px_rgba(41,208,255,0.9)]" />
                <div className="absolute bottom-[4.5rem] right-[14%] h-72 w-px bg-gradient-to-t from-transparent via-cyan-300 to-transparent shadow-[0_0_20px_rgba(41,208,255,0.9)]" />
                <div className="absolute bottom-[17%] left-1/2 h-52 w-[74%] -translate-x-1/2 bg-[radial-gradient(circle_at_center,rgba(10,99,255,0.28),transparent_65%)]" />
                <div className="relative flex min-h-[542px] items-center justify-center">
                  <Image
                    src="/brand/kalion-logo-hero.png"
                    alt="Kalion Tecnologia"
                    width={820}
                    height={600}
                    className="h-auto w-full max-w-[730px] translate-y-[0.35rem] drop-shadow-[0_0_34px_rgba(41,208,255,0.22)]"
                  />
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-7">
              <div className="frame-shell grid gap-4 bg-[#081221]/90 px-6 py-5 md:grid-cols-2 xl:grid-cols-4">
                {[
                  [Headset, 150, "+", "Clientes Atendidos"],
                  [Rocket, 500, "+", "Projetos Concluídos"],
                  [BadgeCheck, 10, "+", "Anos de Experiência"],
                  [Headset, 24, "/7", "Suporte Especializado"],
                ].map(([Icon, value, suffix, label]) => {
                  const RenderIcon = Icon as typeof Headset;
                  return (
                    <div key={String(label)} className="metric-card flex items-center gap-4 rounded-[1.35rem] border border-cyan-400/10 bg-white/[0.015] px-4 py-3 xl:border-r xl:rounded-none xl:bg-transparent xl:px-0 xl:py-0 xl:pr-4 last:border-r-0">
                      <div className="rounded-2xl border border-cyan-400/15 bg-cyan-400/8 p-3 text-cyan-300">
                        <RenderIcon size={24} />
                      </div>
                      <div>
                        <p className="text-[2.15rem] font-semibold leading-none text-cyan-300">
                          <Counter value={value as number} suffix={suffix as string} />
                        </p>
                        <p className="mt-1 text-[0.72rem] tracking-[0.18em] uppercase text-slate-300">{label as string}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-2 py-10 sm:px-4 lg:px-6">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid gap-8 lg:grid-cols-[1fr_.65fr]">
            <div>
              <p className="text-sm tracking-[0.18em] uppercase text-cyan-300">Nossos Serviços</p>
              <h2 className="mt-3 max-w-[760px] text-[3.1rem] uppercase leading-[1.01] text-white">
                Soluções completas em TI para
                <br />
                sua <span className="text-cyan-400">empresa</span>
              </h2>
            </div>
            <div className="flex flex-col justify-end gap-5">
              <p className="max-w-[430px] text-[1.04rem] leading-8 text-slate-300">
                Oferecemos soluções inteligentes e personalizadas para garantir eficiência, segurança e crescimento para o seu negócio.
              </p>
              <div>
                <ButtonLink href="/servicos" variant="outline" className="min-w-[320px] justify-between">
                  Conhecer todos os serviços
                  <ArrowRight size={16} />
                </ButtonLink>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-6">
            {serviceCards.map((service) => {
              const Icon = service.icon;
              return (
                <article
                  key={service.title}
                  className="tech-card hud-panel relative grid min-h-[332px] grid-rows-[76px_88px_1fr_34px] justify-items-center overflow-hidden rounded-[1.55rem] px-4 py-5 text-center before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top,rgba(41,208,255,0.08),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.018),transparent_24%,transparent_80%,rgba(41,208,255,0.02))] before:opacity-90 before:content-['']"
                >
                  <div className="absolute inset-[12px] rounded-[1.2rem] border border-cyan-400/8" />
                  <div className="absolute left-3 top-3 h-8 w-16 border-l border-t border-cyan-400/18" />
                  <div className="absolute bottom-3 right-3 h-8 w-16 border-b border-r border-cyan-400/18" />
                  <div className="relative z-10 flex h-14 w-14 items-center justify-center self-start rounded-[1.05rem] border border-cyan-400/14 bg-cyan-400/[0.06] text-cyan-300 shadow-[inset_0_0_0_1px_rgba(41,208,255,0.03)]">
                    <Icon size={26} strokeWidth={2.15} />
                  </div>
                  <h3 className="relative z-10 flex w-full max-w-[11rem] items-start justify-center px-1 text-center text-[0.98rem] uppercase leading-[1.12] tracking-[-0.015em] text-white">
                    {service.title}
                  </h3>
                  <p className="relative z-10 flex max-w-[10.7rem] items-start text-center text-[0.8rem] leading-7 text-slate-300">
                    {service.description}
                  </p>
                  <Link href="/servicos" className="relative z-10 inline-flex items-center gap-2 self-end text-[0.72rem] tracking-[0.18em] uppercase text-cyan-300">
                    Saiba Mais <ArrowRight size={15} />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-2 py-10 sm:px-4 lg:px-6">
        <div className="mx-auto grid max-w-[1280px] gap-8 lg:grid-cols-[.95fr_1.05fr]">
          <div className="tech-card hud-panel overflow-hidden rounded-[1.9rem] p-4">
            <div className="relative min-h-[430px] overflow-hidden rounded-[1.5rem] border border-cyan-400/12 bg-[linear-gradient(180deg,#07101d,#050b14)]">
              <Image
                src="/brand/kalion-about-room.png"
                alt="Ambiente tecnológico da Kalion Tecnologia"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,12,22,0.02),rgba(4,8,14,0.06))]" />
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-sm tracking-[0.18em] uppercase text-cyan-300">Quem Somos</p>
            <h2 className="mt-3 max-w-[700px] text-[3rem] leading-[1.05] text-white">
              Tecnologia, inovação e comprometimento
              <br />
              com <span className="text-cyan-400">resultados reais.</span>
            </h2>
            <p className="mt-5 max-w-[720px] text-[1.03rem] leading-8 text-slate-300">
              A Kalion Tecnologia nasceu com o propósito de entregar soluções inteligentes em tecnologia da informação e gestão. Atuamos com desenvolvimento web, segurança eletrônica, infraestrutura de redes e suporte técnico, sempre com foco na qualidade, segurança e satisfação dos nossos clientes.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {highlights.map((item) => (
                <div key={item} className="flex items-center gap-3 text-slate-200">
                  <BadgeCheck size={18} className="text-cyan-300" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <ButtonLink href="/sobre-nos" variant="outline" className="min-w-[310px] justify-between">
                Conhecer mais sobre nós
                <ArrowRight size={16} />
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="px-2 pb-14 pt-6 sm:px-4 lg:px-6">
        <div className="mx-auto max-w-[1280px]">
          <p className="mb-6 text-sm tracking-[0.18em] uppercase text-cyan-300">Tecnologias e Parceiros</p>
          <div className="frame-shell grid gap-4 px-5 py-5 sm:grid-cols-2 lg:grid-cols-8">
            {techPartners.map((partner) => (
              <div key={partner} className="text-center text-[2rem] font-semibold italic text-slate-400/90">
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  ));
}
