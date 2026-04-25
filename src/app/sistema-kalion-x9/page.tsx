import Image from "next/image";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/login-form";
import { isAuthenticated } from "@/lib/auth";

export default async function AdminLoginPage() {
  if (await isAuthenticated()) {
    redirect("/sistema-kalion-x9/painel");
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(41,208,255,0.18),transparent_30%)]" />
      <div className="relative z-10 grid w-full max-w-6xl gap-10 lg:grid-cols-[1fr_.7fr]">
        <div className="space-y-6 self-center">
          <Image src="/brand/kalion-logo-header.png" alt="Kalion Tecnologia" width={340} height={250} className="h-auto w-44" />
          <p className="section-label">URL restrita</p>
          <h1 className="max-w-3xl text-5xl uppercase text-white sm:text-6xl">Gestão premium para clientes, projetos e documentos</h1>
          <p className="max-w-2xl text-xl leading-8 text-slate-300">
            Painel oculto com dashboard corporativo, emissão de PDF, gestão de portfólio e estrutura pronta para crescimento.
          </p>
          <div className="frame-shell max-w-xl px-5 py-4 text-sm text-slate-300">
            <p className="tracking-[0.18em] uppercase text-cyan-300">Acesso administrativo</p>
            <p className="mt-2">
              Esta área não aparece no menu público e foi criada para operação interna da Kalion Tecnologia.
            </p>
          </div>
        </div>
        <div className="flex justify-center lg:justify-end">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
