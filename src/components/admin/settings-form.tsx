"use client";

import { useState } from "react";
import type { Settings } from "@/lib/types";
import { Button } from "@/components/ui/button";

export function SettingsForm({ initialSettings }: { initialSettings: Settings }) {
  const [settings, setSettings] = useState(initialSettings);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState("");

  const fields: Array<{ key: keyof Settings; label: string; type?: "text" | "email" | "textarea" }> = [
    { key: "companyName", label: "Nome da empresa" },
    { key: "tagline", label: "Slogan" },
    { key: "email", label: "E-mail", type: "email" },
    { key: "phone", label: "Telefone" },
    { key: "whatsapp", label: "WhatsApp" },
    { key: "linkedin", label: "LinkedIn" },
    { key: "address", label: "Endereço", type: "textarea" },
    { key: "cnpj", label: "CNPJ" },
  ];

  async function handleSubmit(formData: FormData) {
    setSaving(true);
    setSaved("");

    const payload = Object.fromEntries(
      fields.map((field) => [field.key, String(formData.get(field.key) || "")]),
    ) as Settings;

    const response = await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setSaving(false);
    if (!response.ok) return;

    const next = await response.json();
    setSettings(next);
    setSaved("Configurações salvas com sucesso.");
  }

  return (
    <div className="grid gap-8 xl:grid-cols-[430px_1fr]">
      <form action={handleSubmit} className="hud-panel rounded-[2rem] p-6">
        <h2 className="text-2xl uppercase text-white">Editar configurações</h2>
        <div className="mt-6 space-y-4">
          {fields.map((field) => (
            <label key={field.key} className="block">
              <span className="mb-2 block text-sm tracking-[0.16em] text-cyan-200 uppercase">{field.label}</span>
              {field.type === "textarea" ? (
                <textarea
                  name={field.key}
                  rows={4}
                  defaultValue={settings[field.key]}
                  className="w-full rounded-2xl border border-cyan-400/20 bg-[#091221] px-4 py-3 outline-none"
                />
              ) : (
                <input
                  type={field.type || "text"}
                  name={field.key}
                  defaultValue={settings[field.key]}
                  className="w-full rounded-2xl border border-cyan-400/20 bg-[#091221] px-4 py-3 outline-none"
                />
              )}
            </label>
          ))}
        </div>
        {saved ? <p className="mt-4 text-sm text-emerald-300">{saved}</p> : null}
        <div className="mt-6">
          <Button type="submit" disabled={saving}>
            {saving ? "Salvando..." : "Salvar configurações"}
          </Button>
        </div>
      </form>

      <div className="hud-panel rounded-[2rem] p-8">
        <h2 className="text-2xl uppercase text-white">Prévia atual</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {fields.map((field) => (
            <div key={field.key} className="rounded-[1.5rem] border border-cyan-400/12 bg-[#081221] p-5">
              <p className="text-sm tracking-[0.16em] text-cyan-300 uppercase">{field.label}</p>
              <p className="mt-3 text-lg text-slate-200 break-words">{settings[field.key]}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
