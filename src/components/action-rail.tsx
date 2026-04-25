import { ChevronUp, Mail, MessageCircle, Phone } from "lucide-react";
import { buildMailUrl, buildPhoneUrl, buildWhatsAppUrl } from "@/lib/public-settings";
import type { Settings } from "@/lib/types";

export function ActionRail({ settings }: { settings: Settings }) {
  const actions = [
    {
      href: buildWhatsAppUrl(settings.whatsapp, "Olá, quero falar com a Kalion Tecnologia."),
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
    <div className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 xl:flex">
      <div className="frame-shell flex flex-col gap-3 px-3 py-4">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <a
              key={action.label}
              href={action.href}
              target={action.href.startsWith("http") ? "_blank" : undefined}
              rel={action.href.startsWith("http") ? "noreferrer" : undefined}
              className="group relative flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/18 bg-[#091221] text-cyan-200 transition hover:border-cyan-300 hover:bg-cyan-400/10"
              aria-label={action.label}
            >
              <Icon size={18} />
              <span className="absolute right-20 hidden rounded-full border border-cyan-400/18 bg-[#091221] px-3 py-1 text-xs tracking-[0.16em] uppercase text-cyan-100 group-hover:block">
                {action.label}
              </span>
            </a>
          );
        })}
        <a
          href="#top"
          className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/18 bg-[#091221] text-cyan-200 transition hover:border-cyan-300 hover:bg-cyan-400/10"
          aria-label="Topo"
        >
          <ChevronUp size={18} />
        </a>
      </div>
    </div>
  );
}
