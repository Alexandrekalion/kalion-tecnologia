"use client";

import { Eye, EyeOff, LockKeyhole, User2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(formData: FormData) {
    const username = String(formData.get("username") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    if (!username || !password) {
      setError("Preencha usuário e senha para continuar.");
      return;
    }

    setLoading(true);
    setError("");
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    setLoading(false);
    if (!response.ok) {
      setError("Usuário ou senha inválidos.");
      return;
    }

    router.push("/sistema-kalion-x9/painel");
    router.refresh();
  }

  return (
    <form action={handleSubmit} className="hud-panel w-full max-w-md rounded-[2rem] p-8">
      <div className="space-y-2">
        <p className="section-label">Acesso restrito</p>
        <h1 className="text-3xl uppercase text-white">Painel Kalion</h1>
        <p className="text-slate-300">Entre com seu login para gerenciar clientes, documentos, projetos e relatórios.</p>
      </div>
      <div className="mt-8 space-y-5">
        <label className="block">
          <span className="mb-2 block text-sm tracking-[0.16em] text-cyan-200 uppercase">Usuário</span>
          <div className="flex items-center rounded-2xl border border-cyan-400/20 bg-[#091221] px-4">
            <User2 size={17} className="text-cyan-300" />
            <input
              name="username"
              autoComplete="username"
              placeholder="Digite seu usuário"
              className="w-full bg-transparent px-3 py-3 outline-none placeholder:text-slate-500"
            />
          </div>
        </label>
        <label className="block">
          <span className="mb-2 block text-sm tracking-[0.16em] text-cyan-200 uppercase">Senha</span>
          <div className="flex items-center rounded-2xl border border-cyan-400/20 bg-[#091221] px-4">
            <LockKeyhole size={17} className="text-cyan-300" />
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Digite sua senha"
              className="w-full bg-transparent px-3 py-3 outline-none placeholder:text-slate-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              className="text-slate-400 transition hover:text-cyan-200"
              aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </label>
      </div>
      {error ? <p className="mt-4 text-sm text-rose-300">{error}</p> : null}
      <p className="mt-4 text-xs leading-6 text-slate-400">
        Acesso interno da Kalion Tecnologia. Use apenas credenciais autorizadas para entrar no painel administrativo.
      </p>
      <Button type="submit" className="mt-8 w-full" disabled={loading}>
        {loading ? "Entrando..." : "Acessar painel"}
      </Button>
    </form>
  );
}
