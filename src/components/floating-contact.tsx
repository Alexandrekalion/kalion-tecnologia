import { Mail, MessageCircle, Phone } from "lucide-react";
import { buildMailUrl, buildPhoneUrl, buildWhatsAppUrl } from "@/lib/public-settings";
import type { Settings } from "@/lib/types";

export function FloatingContact({ settings }: { settings: Settings }) {
  const items = [
    {
      href: buildWhatsAppUrl(settings.whatsapp, "Olá, quero um orçamento da Kalion Tecnologia."),
      label: "WhatsApp",
      icon: MessageCircle,
    },
    {
      href: buildMailUrl(settings.email),
      label: "E-mail",
      icon: Mail,
    },
    {
      href: buildPhoneUrl(settings.phone),
      label: "Telefone",
      icon: Phone,
    },
  ];

  return (
    <div className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 xl:flex">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <a
            key={item.label}
            href={item.href}
            target={item.href.startsWith("http") ? "_blank" : undefined}
            rel={item.href.startsWith("http") ? "noreferrer" : undefined}
            className="group flex items-center gap-3 rounded-2xl border border-cyan-400/20 bg-[#091221]/90 px-4 py-3 text-sm text-slate-200 shadow-[0_0_24px_rgba(41,208,255,0.12)] transition hover:border-cyan-300 hover:bg-cyan-400/10"
          >
            <Icon size={18} className="text-cyan-300" />
            <span className="hidden whitespace-nowrap text-xs tracking-[0.18em] uppercase group-hover:block">{item.label}</span>
          </a>
        );
      })}
    </div>
  );
}
