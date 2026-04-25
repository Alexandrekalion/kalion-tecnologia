"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";

type Field = {
  key: string;
  label: string;
  type?: "text" | "number" | "textarea" | "checkbox" | "file";
  accept?: string;
  helpText?: string;
};

export function EntityManager({
  title,
  resource,
  fields,
  initialItems,
}: {
  title: string;
  resource: string;
  fields: Field[];
  initialItems: Array<Record<string, unknown>>;
}) {
  const [items, setItems] = useState(initialItems);
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function uploadAsset(file: File, kind: "image" | "video") {
    const data = new FormData();
    data.append("file", file);
    data.append("kind", kind);
    data.append("resource", resource);

    const response = await fetch("/api/admin/upload", {
      method: "POST",
      body: data,
    });

    if (!response.ok) {
      throw new Error("Falha ao enviar arquivo.");
    }

    const result = await response.json();
    return String(result.url);
  }

  async function submit(formData: FormData) {
    setUploading(true);
    setError("");

    try {
      const payload: Record<string, unknown> = {};

      for (const field of fields) {
        if (field.type === "checkbox") {
          payload[field.key] = formData.get(field.key) === "on";
        } else if (field.type === "number") {
          payload[field.key] = Number(formData.get(field.key) || 0);
        } else if (field.type === "file") {
          const file = formData.get(field.key);
          const existingValue = String(formData.get(`${field.key}Existing`) || "");

          if (file instanceof File && file.size > 0) {
            const kind = field.accept?.includes("video") ? "video" : "image";
            payload[field.key] = await uploadAsset(file, kind);
          } else {
            payload[field.key] = existingValue;
          }
        } else {
          payload[field.key] = String(formData.get(field.key) || "");
        }
      }

      const method = editing ? "PUT" : "POST";
      const url = editing ? `/api/admin/${resource}/${editing.id}` : `/api/admin/${resource}`;
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Falha ao salvar registro.");
      }

      const item = await response.json();

      if (editing) {
        setItems((current) => current.map((entry) => (entry.id === item.id ? item : entry)));
      } else {
        setItems((current) => [item, ...current]);
      }

      setEditing(null);
      return true;
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Falha ao salvar registro.");
      return false;
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const didSave = await submit(new FormData(form));

    if (didSave) {
      form.reset();
    }
  }

  async function remove(id: string) {
    const response = await fetch(`/api/admin/${resource}/${id}`, { method: "DELETE" });
    if (!response.ok) return;
    setItems((current) => current.filter((item) => item.id !== id));
  }

  return (
    <div className="grid gap-8 xl:grid-cols-[380px_1fr]">
      <form id={`${resource}-form`} onSubmit={handleSubmit} className="hud-panel rounded-[2rem] p-6">
        <h2 className="text-2xl uppercase text-white">{editing ? `Editar ${title}` : `Novo ${title}`}</h2>
        <div className="mt-6 space-y-4">
          {fields.map((field) => (
            <label key={field.key} className="block">
              <span className="mb-2 block text-sm tracking-[0.16em] uppercase text-cyan-200">{field.label}</span>
              {field.type === "textarea" ? (
                <textarea
                  name={field.key}
                  rows={4}
                  defaultValue={editing ? String(editing[field.key] || "") : ""}
                  className="w-full rounded-2xl border border-cyan-400/20 bg-[#091221] px-4 py-3 outline-none"
                />
              ) : field.type === "file" ? (
                <div className="space-y-3">
                  <input
                    type="file"
                    name={field.key}
                    accept={field.accept}
                    className="w-full rounded-2xl border border-cyan-400/20 bg-[#091221] px-4 py-3 text-slate-300 outline-none file:mr-4 file:rounded-full file:border-0 file:bg-cyan-400/15 file:px-4 file:py-2 file:text-cyan-100"
                  />
                  <input
                    type="hidden"
                    name={`${field.key}Existing`}
                    value={editing ? String(editing[field.key] || "") : ""}
                  />
                  {field.helpText ? <p className="text-xs text-slate-400">{field.helpText}</p> : null}
                  {editing?.[field.key] ? (
                    field.accept?.includes("video") ? (
                      <video
                        src={String(editing[field.key])}
                        controls
                        className="w-full rounded-2xl border border-cyan-400/15 bg-black/30"
                      />
                    ) : (
                      <div className="relative h-40 overflow-hidden rounded-2xl border border-cyan-400/15">
                        <img src={String(editing[field.key])} alt={field.label} className="h-full w-full object-cover" />
                      </div>
                    )
                  ) : null}
                </div>
              ) : field.type === "checkbox" ? (
                <input
                  type="checkbox"
                  name={field.key}
                  defaultChecked={Boolean(editing?.[field.key])}
                  className="h-5 w-5 rounded border border-cyan-400/30 bg-[#091221]"
                />
              ) : (
                <input
                  type={field.type || "text"}
                  name={field.key}
                  defaultValue={editing ? String(editing[field.key] || "") : ""}
                  className="w-full rounded-2xl border border-cyan-400/20 bg-[#091221] px-4 py-3 outline-none"
                />
              )}
            </label>
          ))}
        </div>
        {error ? <p className="mt-4 text-sm text-rose-300">{error}</p> : null}
        <div className="mt-6 flex gap-3">
          <Button type="submit" disabled={uploading}>
            {uploading ? "Enviando..." : editing ? "Salvar alteracoes" : "Cadastrar"}
          </Button>
          {editing ? (
            <Button type="button" variant="ghost" onClick={() => setEditing(null)}>
              Cancelar
            </Button>
          ) : null}
        </div>
      </form>
      <div className="hud-panel overflow-hidden rounded-[2rem] p-6">
        <h2 className="text-2xl uppercase text-white">Registros cadastrados</h2>
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-cyan-200">
              <tr>
                {fields.slice(0, 4).map((field) => (
                  <th key={field.key} className="px-3 py-3">
                    {field.label}
                  </th>
                ))}
                <th className="px-3 py-3">Acoes</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={String(item.id)} className="border-t border-cyan-400/8 text-slate-300">
                  {fields.slice(0, 4).map((field) => (
                    <td key={field.key} className="px-3 py-3 align-top">
                      {field.type === "checkbox"
                        ? item[field.key]
                          ? "Sim"
                          : "Nao"
                        : field.type === "file"
                          ? String(item[field.key] ?? "").split("/").pop()
                          : String(item[field.key] ?? "")}
                    </td>
                  ))}
                  <td className="px-3 py-3">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        className="rounded-full border border-cyan-400/20 px-3 py-2 text-xs uppercase text-cyan-200"
                        onClick={() => setEditing(item)}
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        className="rounded-full border border-rose-400/20 px-3 py-2 text-xs uppercase text-rose-200"
                        onClick={() => remove(String(item.id))}
                      >
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
