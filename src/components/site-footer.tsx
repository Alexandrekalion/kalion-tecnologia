import Image from "next/image";
import Link from "next/link";
import { navigation } from "@/lib/site-content";
import type { Settings } from "@/lib/types";

export function SiteFooter({ settings }: { settings: Settings }) {
  return (
    <footer className="border-t border-cyan-400/10 bg-[#040912]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.2fr_.8fr_.8fr] lg:px-8">
        <div className="space-y-4">
          <Image src="/brand/kalion-logo-header.png" alt="Kalion Tecnologia" width={340} height={250} className="h-auto w-36" />
          <p className="max-w-lg text-sm leading-7 text-slate-400">
            Soluções em desenvolvimento web, segurança eletrônica, redes, automação e suporte técnico com padrão premium e foco em resultado real.
          </p>
        </div>
        <div>
          <p className="mb-4 font-semibold tracking-[0.18em] text-cyan-300 uppercase">Navegação</p>
          <div className="space-y-3">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} className="block text-sm text-slate-300 transition hover:text-cyan-300">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-4 font-semibold tracking-[0.18em] text-cyan-300 uppercase">Contato</p>
          <div className="space-y-3 text-sm text-slate-300">
            <p>{settings.email}</p>
            <p>{settings.phone}</p>
            <p>{settings.address}</p>
          </div>
        </div>
      </div>
      <div className="border-t border-cyan-400/10 px-4 py-5 text-center text-xs tracking-[0.18em] text-slate-500 uppercase">
        © 2026 Kalion Tecnologia. Todos os direitos reservados.
      </div>
    </footer>
  );
}
