import { Mail, MapPin, Phone, Smartphone } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { SectionHeading } from "@/components/section-heading";
import { SiteShell } from "@/components/site-shell";
import { ButtonLink } from "@/components/ui/button";
import { buildWhatsAppUrl, getPublicSettings } from "@/lib/public-settings";

export const dynamic = "force-dynamic";

export default function ContactPage() {
  const settingsPromise = getPublicSettings();
  return settingsPromise.then((settings) => (
    <SiteShell>
      <section id="orcamento" className="px-4 pb-20 pt-12 sm:px-6 lg:px-8 lg:pt-20">
        <div className="mx-auto max-w-7xl space-y-12">
          <SectionHeading
            eyebrow="Contato"
            title="Solicite orçamento e fale com a Kalion Tecnologia"
            description="Canal rápido para novos projetos, suporte, manutenção, infraestrutura, segurança eletrônica e soluções sob medida."
          />
          <div className="grid gap-8 lg:grid-cols-[.9fr_1.1fr]">
            <div className="space-y-5">
              {[
                { icon: Mail, title: "E-mail profissional", value: settings.email },
                { icon: Phone, title: "Telefone", value: settings.phone },
                { icon: Smartphone, title: "WhatsApp", value: settings.whatsapp },
                { icon: MapPin, title: "Área de atuação", value: settings.address },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="hud-panel rounded-[2rem] p-6">
                    <div className="flex items-start gap-4">
                      <div className="rounded-2xl border border-cyan-400/15 bg-cyan-400/10 p-3 text-cyan-300">
                        <Icon size={22} />
                      </div>
                      <div>
                        <p className="text-sm tracking-[0.16em] text-cyan-300 uppercase">{item.title}</p>
                        <p className="mt-2 text-lg leading-7 text-slate-200">{item.value}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="grid gap-4 md:grid-cols-2">
                <ButtonLink href={buildWhatsAppUrl(settings.whatsapp, "Olá, quero um orçamento da Kalion.")}>WhatsApp</ButtonLink>
                <ButtonLink href={settings.linkedin} variant="outline">LinkedIn</ButtonLink>
              </div>
              <div className="hud-panel overflow-hidden rounded-[2rem] p-2">
                <iframe
                  title="Mapa de atuação"
                  src="https://www.google.com/maps?q=Curitiba%20PR&output=embed"
                  className="h-72 w-full rounded-[1.5rem] border-0"
                  loading="lazy"
                />
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
    </SiteShell>
  ));
}
