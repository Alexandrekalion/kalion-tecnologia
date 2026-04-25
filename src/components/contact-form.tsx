"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";

const schema = z.object({
  name: z.string().min(3, "Informe seu nome."),
  phone: z.string().min(8, "Informe um telefone válido."),
  email: z.string().email("Informe um e-mail válido."),
  company: z.string().min(2, "Informe a empresa."),
  service: z.string().min(2, "Informe o serviço desejado."),
  message: z.string().min(10, "Descreva a necessidade com mais detalhes."),
});

type FormValues = z.infer<typeof schema>;

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(values: FormValues) {
    setStatus("idle");
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      setStatus("error");
      return;
    }

    reset();
    setStatus("success");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="hud-panel rounded-[2rem] p-6 sm:p-8">
      <div className="grid gap-5 md:grid-cols-2">
        {[
          { label: "Nome", key: "name", type: "text" },
          { label: "Telefone", key: "phone", type: "text" },
          { label: "E-mail", key: "email", type: "email" },
          { label: "Empresa", key: "company", type: "text" },
          { label: "Serviço desejado", key: "service", type: "text" },
        ].map((field) => (
          <label key={field.key} className={field.key === "service" ? "md:col-span-2" : ""}>
            <span className="mb-2 block text-sm tracking-[0.18em] text-cyan-200 uppercase">{field.label}</span>
            <input
              type={field.type}
              {...register(field.key as keyof FormValues)}
              className="w-full rounded-2xl border border-cyan-400/20 bg-[#091221] px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-300"
            />
            <span className="mt-2 block min-h-5 text-sm text-rose-300">
              {errors[field.key as keyof FormValues]?.message}
            </span>
          </label>
        ))}
        <label className="md:col-span-2">
          <span className="mb-2 block text-sm tracking-[0.18em] text-cyan-200 uppercase">Mensagem</span>
          <textarea
            rows={6}
            {...register("message")}
            className="w-full rounded-[1.5rem] border border-cyan-400/20 bg-[#091221] px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-300"
          />
          <span className="mt-2 block min-h-5 text-sm text-rose-300">{errors.message?.message}</span>
        </label>
      </div>
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-slate-400">
          {status === "success" ? "Mensagem enviada com sucesso. Vamos retornar em breve." : null}
          {status === "error" ? "Não foi possível enviar agora. Tente novamente em instantes." : null}
        </div>
        <Button type="submit" className="min-w-56" disabled={isSubmitting}>
          {isSubmitting ? <LoaderCircle size={18} className="animate-spin" /> : "Enviar Solicitação"}
        </Button>
      </div>
    </form>
  );
}
