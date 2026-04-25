import { Camera, Cpu, Fingerprint, Globe, Headset, Network, ScanFace, Shield, Workflow, Wrench } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { SiteShell } from "@/components/site-shell";
import { ButtonLink } from "@/components/ui/button";
import { getPublicSettings, buildWhatsAppUrl } from "@/lib/public-settings";

export const dynamic = "force-dynamic";

const serviceBlocks = [
  {
    icon: Globe,
    title: "Desenvolvimento Web",
    items: ["Sites institucionais", "Lojas virtuais", "Catálogos online", "Sistemas web sob medida", "Painéis administrativos e integrações"],
  },
  {
    icon: Camera,
    title: "Segurança Eletrônica",
    items: ["Instalação de câmeras Intelbras", "DVR e NVR", "Monitoramento por celular e TV", "Projetos organizados e limpos"],
  },
  {
    icon: Network,
    title: "Redes e Infraestrutura",
    items: ["Cabeamento estruturado", "Organização de rack", "Roteadores e switches", "Wi-Fi empresarial", "Diagnóstico de rede"],
  },
  {
    icon: Headset,
    title: "Suporte e Manutenção",
    items: ["Formatação", "Instalação de sistemas", "Manutenção preventiva", "Suporte remoto e presencial", "Otimização de máquinas"],
  },
  {
    icon: Shield,
    title: "Segurança e Monitoramento",
    items: ["Firewall", "Zabbix", "GLPI", "Inventário e controle de ativos", "Segurança de rede"],
  },
  {
    icon: Workflow,
    title: "Automação e Sistemas Web",
    items: ["Automação de processos", "Integrações entre sistemas", "APIs", "Painéis de controle", "Relatórios inteligentes"],
  },
  {
    icon: Cpu,
    title: "Impressão 3D e Prototipagem",
    items: ["Modelagem básica", "Peças funcionais", "Protótipos rápidos", "Apoio para projetos visuais"],
  },
  {
    icon: ScanFace,
    title: "Controle de Acesso e Reconhecimento Facial",
    items: ["Acesso por rosto, cartão ou senha", "Relatórios de entrada e saída", "Integração com sistema", "Uso em empresas e condomínios"],
  },
  {
    icon: Fingerprint,
    title: "Monitoramento Inteligente",
    items: ["Câmeras com IA", "Alertas automáticos", "Identificação e rastreio", "Visibilidade operacional"],
  },
  {
    icon: Wrench,
    title: "Planos de Suporte Fixo",
    items: ["Contratos mensais", "Monitoramento contínuo", "Atualizações", "Preventiva e corretiva", "Atendimento prioritário"],
  },
];

export default function ServicesPage() {
  const settingsPromise = getPublicSettings();
  return settingsPromise.then((settings) => (
    <SiteShell>
      <section className="px-4 pb-20 pt-12 sm:px-6 lg:px-8 lg:pt-20">
        <div className="mx-auto max-w-7xl space-y-12">
          <SectionHeading
            eyebrow="Nossos serviços"
            title="Soluções completas em tecnologia com foco total em conversão"
            description="Design futurista, organização premium e clareza comercial para apresentar tudo o que a Kalion Tecnologia entrega em web, infraestrutura, segurança e automação."
          />
          <div className="grid gap-6 lg:grid-cols-2">
            {serviceBlocks.map((service) => {
              const Icon = service.icon;
              return (
                <article key={service.title} className="hud-panel rounded-[2rem] p-8">
                  <div className="mb-6 inline-flex rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4 text-cyan-300">
                    <Icon size={28} />
                  </div>
                  <h2 className="text-2xl uppercase text-white">{service.title}</h2>
                  <ul className="mt-6 space-y-3 text-lg leading-7 text-slate-300">
                    {service.items.map((item) => (
                      <li key={item} className="rounded-2xl border border-white/6 bg-white/4 px-4 py-3">
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
          <div className="grid gap-4 rounded-[2rem] border border-cyan-400/15 bg-[#081221] p-6 md:grid-cols-3">
            <ButtonLink href="/contato#orcamento">Solicitar Orçamento</ButtonLink>
            <ButtonLink href="/projetos" variant="outline">Ver Portfólio</ButtonLink>
            <ButtonLink href={buildWhatsAppUrl(settings.whatsapp, "Olá, quero conhecer os serviços da Kalion.")} variant="ghost">Falar no WhatsApp</ButtonLink>
          </div>
        </div>
      </section>
    </SiteShell>
  ));
}
