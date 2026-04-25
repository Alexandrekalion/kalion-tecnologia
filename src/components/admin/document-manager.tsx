"use client";

import jsPDF from "jspdf";
import { useMemo, useState } from "react";
import type { Client, Settings } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { currency, formatDate } from "@/lib/utils";

type DocumentType = "budgets" | "orders" | "warranties";

type LineItem = {
  description: string;
  quantity: number;
  unitPrice: number;
};

type Theme = {
  accent: [number, number, number];
  accentSoft: [number, number, number];
  title: string;
  docLabel: string;
  leftSection: string;
  rightSection: string;
  footerTint: [number, number, number];
};

const THEMES: Record<DocumentType, Theme> = {
  budgets: {
    accent: [11, 83, 176],
    accentSoft: [231, 239, 252],
    title: "ORÇAMENTO",
    docLabel: "Orçamento Nº:",
    leftSection: "DADOS DO CLIENTE",
    rightSection: "DADOS DO ORÇAMENTO",
    footerTint: [10, 99, 255],
  },
  orders: {
    accent: [11, 108, 58],
    accentSoft: [230, 246, 236],
    title: "PEDIDO",
    docLabel: "Pedido Nº:",
    leftSection: "DADOS DO CLIENTE",
    rightSection: "DADOS DO PEDIDO",
    footerTint: [22, 163, 74],
  },
  warranties: {
    accent: [95, 31, 155],
    accentSoft: [243, 236, 250],
    title: "GARANTIA",
    docLabel: "Garantia Nº:",
    leftSection: "DADOS DO CLIENTE",
    rightSection: "DADOS DA GARANTIA",
    footerTint: [168, 85, 247],
  },
};

async function loadImageDataUrl(src: string) {
  const response = await fetch(src);
  const blob = await response.blob();
  return await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

function safeDate(value: unknown) {
  if (!value) return "-";
  try {
    return formatDate(String(value));
  } catch {
    return String(value);
  }
}

function drawHeader(pdf: jsPDF, theme: Theme, number: string, createdAt: string, extraLineLabel: string, extraLineValue: string) {
  const [r, g, b] = theme.accent;
  pdf.setFillColor(r, g, b);
  pdf.roundedRect(24, 24, 547, 84, 10, 10, "F");

  pdf.setFillColor(249, 249, 251);
  pdf.roundedRect(270, 38, 288, 76, 18, 18, "F");

  pdf.setTextColor(255, 255, 255);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(22);
  pdf.text(theme.title, 42, 74);

  pdf.setTextColor(r, g, b);
  pdf.setFontSize(16);
  pdf.text(theme.docLabel, 388, 58, { align: "right" });
  pdf.text(number || "-", 540, 58, { align: "right" });

  pdf.setTextColor(40, 40, 40);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(11);
  pdf.text("Data:", 420, 80, { align: "right" });
  pdf.text(createdAt, 540, 80, { align: "right" });
  pdf.text(extraLineLabel, 420, 102, { align: "right" });
  pdf.text(extraLineValue, 540, 102, { align: "right" });
}

function drawInfoCard(
  pdf: jsPDF,
  x: number,
  y: number,
  w: number,
  title: string,
  rows: Array<[string, string]>,
  color: [number, number, number],
  layout: "inline" | "stacked" = "inline",
) {
  pdf.setTextColor(...color);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(11);
  pdf.text(title, x, y);

  let cursor = y + 24;
  pdf.setTextColor(28, 28, 28);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);

  rows.forEach(([label, value]) => {
    if (layout === "stacked") {
      pdf.setFont("helvetica", "bold");
      pdf.text(label, x, cursor);
      pdf.setFont("helvetica", "normal");
      const wrapped = pdf.splitTextToSize(value || "-", w);
      pdf.text(wrapped, x, cursor + 14);
      cursor += 28 + (wrapped.length - 1) * 10;
      return;
    }

    const labelWidth = 92;
    const valueX = x + labelWidth;
    pdf.setFont("helvetica", "bold");
    pdf.text(label, x, cursor);
    pdf.setFont("helvetica", "normal");
    const wrapped = pdf.splitTextToSize(value || "-", w - labelWidth);
    pdf.text(wrapped, valueX, cursor);
    cursor += 20 + (wrapped.length - 1) * 10;
  });
}

function drawTable(
  pdf: jsPDF,
  type: DocumentType,
  items: LineItem[],
  startY: number,
  accent: [number, number, number],
) {
  const colXs = type === "warranties" ? [44, 82, 395, 448, 504] : [44, 82, 372, 418, 488];
  const widths = type === "warranties" ? [38, 313, 53, 72] : [38, 290, 46, 70, 74];
  const labels = type === "warranties"
    ? ["#", "DESCRIÇÃO", "QTD", "GARANTIA"]
    : ["#", "DESCRIÇÃO", "QTD", "VALOR UNIT.", "VALOR TOTAL"];

  pdf.setDrawColor(204, 211, 219);
  pdf.setFillColor(238, 238, 241);
  pdf.rect(40, startY, 515, 28, "FD");

  pdf.setTextColor(34, 34, 34);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(9);
  labels.forEach((label, index) => {
    pdf.text(label, colXs[index] + 6, startY + 18);
  });

  const rows = Math.max(items.length, type === "budgets" ? 5 : 4);
  let y = startY + 28;

  for (let i = 0; i < rows; i += 1) {
    pdf.setFillColor(255, 255, 255);
    pdf.rect(40, y, 515, 28, "FD");
    for (let j = 0; j < widths.length; j += 1) {
      pdf.line(colXs[j + 1] ?? 555, y, colXs[j + 1] ?? 555, y + 28);
    }

    const item = items[i];
    if (item) {
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(8.8);
      pdf.setTextColor(25, 25, 25);
      pdf.text(String(i + 1), 54, y + 18);
      pdf.text(pdf.splitTextToSize(item.description, widths[1] - 12), 88, y + 16);
      pdf.text(String(item.quantity), type === "warranties" ? 470 : 430, y + 18, { align: "center" });
      if (type === "warranties") {
        pdf.text("12 meses", 528, y + 18, { align: "center" });
      } else {
        pdf.text(currency(item.unitPrice), 472, y + 18, { align: "right" });
        pdf.text(currency(item.unitPrice * item.quantity), 548, y + 18, { align: "right" });
      }
    }

    y += 28;
  }

  pdf.setDrawColor(...accent);
  pdf.setLineWidth(0.6);
  pdf.rect(40, startY, 515, rows * 28 + 28);

  return y;
}

function drawSummaryBox(pdf: jsPDF, type: DocumentType, totalValue: number, startY: number, accent: [number, number, number]) {
  if (type === "warranties") return;

  const [r, g, b] = accent;
  const x = 410;
  const rows = [
    ["SUBTOTAL:", currency(totalValue)],
    ["DESCONTO:", "R$ 0,00"],
    [type === "orders" ? "PAGAMENTO:" : "FRETE:", type === "orders" ? "-" : "R$ 0,00"],
  ];

  let y = startY;
  rows.forEach(([label, value]) => {
    pdf.setFillColor(244, 244, 245);
    pdf.rect(x, y, 145, 26, "F");
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(8.5);
    pdf.setTextColor(40, 40, 40);
    pdf.text(label, x + 10, y + 17);
    pdf.setFont("helvetica", "normal");
    pdf.text(value, x + 135, y + 17, { align: "right" });
    y += 26;
  });

  pdf.setFillColor(r, g, b);
  pdf.rect(x, y, 145, 28, "F");
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(11);
  pdf.setTextColor(255, 255, 255);
  pdf.text("TOTAL:", x + 10, y + 18);
  pdf.text(currency(totalValue), x + 135, y + 18, { align: "right" });
}

function drawFooter(pdf: jsPDF, settings: Settings, accent: [number, number, number], logoDataUrl: string) {
  const [r, g, b] = accent;
  pdf.setFillColor(8, 12, 24);
  pdf.roundedRect(24, 742, 547, 76, 8, 8, "F");

  pdf.setDrawColor(r, g, b);
  pdf.setLineWidth(1);
  pdf.line(24, 742, 571, 742);
  pdf.setLineWidth(0.4);
  pdf.line(420, 742, 470, 818);
  pdf.line(452, 742, 500, 818);
  pdf.line(486, 742, 534, 818);

  pdf.setTextColor(255, 255, 255);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(11);
  pdf.text("Tecnologia que conecta.", 44, 776);
  pdf.text("Soluções que transformam.", 44, 794);

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(9.5);
  pdf.text(settings.phone, 64, 814);
  pdf.text(settings.email, 64, 830);
  pdf.text("www.kaliontecnologia.com.br", 64, 846);

  pdf.setDrawColor(r, g, b);
  pdf.setFillColor(r, g, b);
  pdf.circle(50, 811, 2.6, "F");
  pdf.circle(50, 827, 2.6, "F");
  pdf.circle(50, 843, 2.6, "F");

  if (logoDataUrl) {
    pdf.addImage(logoDataUrl, "PNG", 258, 762, 110, 50);
  } else {
    pdf.setTextColor(255, 255, 255);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(22);
    pdf.text("Kalion", 310, 795, { align: "center" });
  }
}

async function createStyledPdf({
  type,
  title,
  item,
  client,
  settings,
}: {
  type: DocumentType;
  title: string;
  item: Record<string, unknown>;
  client?: Client;
  settings: Settings;
}) {
  const pdf = new jsPDF({ unit: "pt", format: "a4" });
  const theme = THEMES[type];
  const [r, g, b] = theme.accent;
  const logo = await loadImageDataUrl("/brand/kalion-logo-header.png").catch(() => "");

  pdf.setFillColor(247, 247, 249);
  pdf.rect(0, 0, 595, 842, "F");
  pdf.setDrawColor(220, 225, 232);
  pdf.roundedRect(20, 20, 555, 802, 10, 10, "S");
  pdf.setFillColor(255, 255, 255);
  pdf.roundedRect(24, 24, 547, 794, 8, 8, "F");

  const rightMeta =
    type === "budgets"
      ? ["Validade:", String(item.validity || "-")]
      : type === "orders"
        ? ["Pagamento:", String(item.paymentMethod || "-")]
        : ["Validade:", String(item.term || "-")];

  drawHeader(
    pdf,
    theme,
    String(item.number || "-"),
    safeDate(item.createdAt),
    rightMeta[0],
    rightMeta[1],
  );

  drawInfoCard(pdf, 48, 164, 216, theme.leftSection, [
    ["Cliente:", client?.name || "-"],
    ["CNPJ:", client?.document || "-"],
    ["Telefone:", client?.phone || "-"],
    ["E-mail:", client?.email || settings.email],
    ["Endereço:", client?.address || settings.address],
  ], [r, g, b]);

  const rightRows: Array<[string, string]> =
    type === "budgets"
      ? [
          ["Elaborado por:", "Administrador"],
          ["Condição de Pagamento:", String(item.status || "30 dias")],
          ["Forma de Pagamento:", "Boleto / PIX"],
          ["Prazo de Entrega:", String(item.deadline || "-")],
        ]
      : type === "orders"
        ? [
            ["Data do Pedido:", safeDate(item.createdAt)],
            ["Previsão de Entrega:", String(item.status || "-")],
            ["Condição de Pagamento:", String(item.paymentMethod || "-")],
            ["Vendedor:", "Administrador"],
          ]
        : [
            ["Tipo de Garantia:", String(item.status || "12 meses")],
            ["Início da Garantia:", safeDate(item.createdAt)],
            ["Término da Garantia:", String(item.term || "-")],
            ["Responsável:", settings.companyName],
          ];

  drawInfoCard(pdf, 310, 164, 214, theme.rightSection, rightRows, [r, g, b], "stacked");

  const itemsTitle =
    type === "budgets"
      ? "ITENS DO ORÇAMENTO"
      : type === "orders"
        ? "ITENS DO PEDIDO"
        : "PRODUTOS / SERVIÇOS GARANTIDOS";

  pdf.setTextColor(r, g, b);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(11);
  pdf.text(itemsTitle, 48, 340);

  const endTableY = drawTable(pdf, type, (item.items as LineItem[]) || [], 356, [r, g, b]);
  drawSummaryBox(pdf, type, Number(item.total || 0), endTableY + 8, [r, g, b]);

  pdf.setTextColor(r, g, b);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(11);
  pdf.text(type === "warranties" ? "TERMOS DA GARANTIA" : "OBSERVAÇÕES", 48, type === "warranties" ? 562 : 646);

  pdf.setTextColor(34, 34, 34);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(9);

  if (type === "warranties") {
    const notes = [
      "A garantia cobre defeitos de desenvolvimento e funcionamento relacionados ao escopo contratado.",
      "Não cobre alterações solicitadas após a entrega final.",
      "Não cobre problemas causados por mau uso, quedas, vírus ou terceiros.",
      "O suporte será realizado via e-mail, WhatsApp ou sistema de chamados.",
    ];
    let y = 582;
    notes.forEach((note) => {
      pdf.text("✓", 50, y);
      pdf.text(pdf.splitTextToSize(note, 290), 64, y);
      y += 24;
    });

    pdf.setFillColor(...theme.accentSoft);
    pdf.roundedRect(470, 580, 84, 72, 6, 6, "F");
    pdf.setTextColor(r, g, b);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(10);
    pdf.text("IMPORTANTE", 512, 596, { align: "center" });
    pdf.setTextColor(50, 50, 50);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(8.2);
    pdf.text(pdf.splitTextToSize("Apresente este documento para solicitar atendimento durante o período de garantia.", 68), 478, 616);
  } else {
    const noteLines = pdf.splitTextToSize(String(item.notes || "Documento gerado automaticamente pelo sistema. Valores sujeitos à alteração sem aviso prévio."), 300);
    pdf.text(noteLines, 48, 666);
  }

  pdf.setDrawColor(120, 120, 120);
  pdf.line(52, 720, 258, 720);
  pdf.line(430, 720, 528, 720);
  pdf.setTextColor(50, 50, 50);
  pdf.setFontSize(9);
  pdf.text("Assinatura do Cliente", 155, 736, { align: "center" });
  pdf.text("Data: ____/____/______", 478, 736, { align: "center" });

  drawFooter(pdf, settings, [r, g, b], logo);
  pdf.save(`${String(item.number || title)}.pdf`);
}

export function DocumentManager({
  type,
  title,
  initialItems,
  clients,
  settings,
}: {
  type: DocumentType;
  title: string;
  initialItems: Array<Record<string, unknown>>;
  clients: Client[];
  settings: Settings;
}) {
  const [items, setItems] = useState(initialItems);
  const [lines, setLines] = useState<LineItem[]>([{ description: "", quantity: 1, unitPrice: 0 }]);
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null);

  const total = useMemo(
    () => lines.reduce((sum, line) => sum + Number(line.quantity) * Number(line.unitPrice), 0),
    [lines],
  );

  function generateNumber() {
    const prefix = type === "budgets" ? "ORC" : type === "orders" ? "PED" : "GAR";
    return `${prefix}-${new Date().getFullYear()}-${String(items.length + 1).padStart(3, "0")}`;
  }

  function resetForm() {
    setEditing(null);
    setLines([{ description: "", quantity: 1, unitPrice: 0 }]);
    (document.getElementById(`${type}-form`) as HTMLFormElement | null)?.reset();
  }

  async function submit(formData: FormData) {
    const payload: Record<string, unknown> = {
      number: String(formData.get("number") || generateNumber()),
      clientId: String(formData.get("clientId") || ""),
      status: String(formData.get("status") || ""),
      notes: String(formData.get("notes") || ""),
      createdAt: String(formData.get("createdAt") || new Date().toISOString().slice(0, 10)),
      items: lines,
      total,
    };

    if (type === "budgets") {
      payload.validity = String(formData.get("validity") || "");
      payload.deadline = String(formData.get("deadline") || "");
    }
    if (type === "orders") {
      payload.paymentMethod = String(formData.get("paymentMethod") || "");
    }
    if (type === "warranties") {
      payload.term = String(formData.get("term") || "");
      payload.coverage = String(formData.get("coverage") || "");
    }

    const method = editing ? "PUT" : "POST";
    const url = editing ? `/api/admin/${type}/${editing.id}` : `/api/admin/${type}`;
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) return;
    const result = await response.json();
    if (editing) {
      setItems((current) => current.map((item) => (item.id === result.id ? result : item)));
    } else {
      setItems((current) => [result, ...current]);
    }
    resetForm();
  }

  async function exportPdf(item: Record<string, unknown>) {
    const client = clients.find((entry) => entry.id === item.clientId);
    await createStyledPdf({ type, title, item, client, settings });
  }

  return (
    <div className="grid gap-8 xl:grid-cols-[420px_1fr]">
      <form id={`${type}-form`} action={submit} className="hud-panel rounded-[2rem] p-6">
        <h2 className="text-2xl uppercase text-white">{editing ? `Editar ${title}` : `Novo ${title}`}</h2>
        <div className="mt-6 space-y-4">
          <label className="block">
            <span className="mb-2 block text-sm tracking-[0.16em] text-cyan-200 uppercase">Número</span>
            <input name="number" defaultValue={editing ? String(editing.number || "") : generateNumber()} className="w-full rounded-2xl border border-cyan-400/20 bg-[#091221] px-4 py-3 outline-none" />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm tracking-[0.16em] text-cyan-200 uppercase">Cliente</span>
            <select name="clientId" defaultValue={editing ? String(editing.clientId || "") : ""} className="w-full rounded-2xl border border-cyan-400/20 bg-[#091221] px-4 py-3 outline-none">
              <option value="">Selecione</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>{client.name}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-2 block text-sm tracking-[0.16em] text-cyan-200 uppercase">Status</span>
            <input name="status" defaultValue={editing ? String(editing.status || "") : ""} className="w-full rounded-2xl border border-cyan-400/20 bg-[#091221] px-4 py-3 outline-none" />
          </label>
          {type === "budgets" ? (
            <>
              <input name="validity" placeholder="Validade" className="w-full rounded-2xl border border-cyan-400/20 bg-[#091221] px-4 py-3 outline-none" />
              <input name="deadline" placeholder="Prazo" className="w-full rounded-2xl border border-cyan-400/20 bg-[#091221] px-4 py-3 outline-none" />
            </>
          ) : null}
          {type === "orders" ? (
            <input name="paymentMethod" placeholder="Forma de pagamento" className="w-full rounded-2xl border border-cyan-400/20 bg-[#091221] px-4 py-3 outline-none" />
          ) : null}
          {type === "warranties" ? (
            <>
              <input name="term" placeholder="Prazo da garantia" className="w-full rounded-2xl border border-cyan-400/20 bg-[#091221] px-4 py-3 outline-none" />
              <textarea name="coverage" placeholder="Cobertura" rows={3} className="w-full rounded-2xl border border-cyan-400/20 bg-[#091221] px-4 py-3 outline-none" />
            </>
          ) : null}
          <input type="date" name="createdAt" defaultValue={editing ? String(editing.createdAt || "") : new Date().toISOString().slice(0, 10)} className="w-full rounded-2xl border border-cyan-400/20 bg-[#091221] px-4 py-3 outline-none" />
          <textarea name="notes" placeholder="Observações" rows={4} className="w-full rounded-2xl border border-cyan-400/20 bg-[#091221] px-4 py-3 outline-none" />
          <div className="rounded-[1.6rem] border border-cyan-400/15 bg-[#081221] p-4">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm tracking-[0.16em] text-cyan-300 uppercase">Itens</p>
              <button type="button" className="rounded-full border border-cyan-400/20 px-3 py-2 text-xs uppercase text-cyan-200" onClick={() => setLines((current) => [...current, { description: "", quantity: 1, unitPrice: 0 }])}>
                Adicionar item
              </button>
            </div>
            <div className="space-y-3">
              {lines.map((line, index) => (
                <div key={`${index}-${line.description}`} className="grid gap-3 md:grid-cols-[1fr_90px_120px]">
                  <input
                    value={line.description}
                    onChange={(event) => setLines((current) => current.map((entry, lineIndex) => (lineIndex === index ? { ...entry, description: event.target.value } : entry)))}
                    placeholder="Descrição"
                    className="rounded-2xl border border-cyan-400/20 bg-[#091221] px-4 py-3 outline-none"
                  />
                  <input
                    type="number"
                    value={line.quantity}
                    onChange={(event) => setLines((current) => current.map((entry, lineIndex) => (lineIndex === index ? { ...entry, quantity: Number(event.target.value) } : entry)))}
                    placeholder="Qtd"
                    className="rounded-2xl border border-cyan-400/20 bg-[#091221] px-4 py-3 outline-none"
                  />
                  <input
                    type="number"
                    value={line.unitPrice}
                    onChange={(event) => setLines((current) => current.map((entry, lineIndex) => (lineIndex === index ? { ...entry, unitPrice: Number(event.target.value) } : entry)))}
                    placeholder="Valor"
                    className="rounded-2xl border border-cyan-400/20 bg-[#091221] px-4 py-3 outline-none"
                  />
                </div>
              ))}
            </div>
            <p className="mt-4 text-lg text-cyan-300">Total: {currency(total)}</p>
          </div>
        </div>
        <div className="mt-6 flex gap-3">
          <Button type="submit">{editing ? "Salvar alterações" : "Salvar documento"}</Button>
          <Button type="button" variant="ghost" onClick={resetForm}>
            Limpar
          </Button>
        </div>
      </form>
      <div className="hud-panel rounded-[2rem] p-6">
        <h2 className="text-2xl uppercase text-white">Documentos cadastrados</h2>
        <div className="mt-6 space-y-4">
          {items.map((item) => {
            const client = clients.find((entry) => entry.id === item.clientId);
            return (
              <div key={String(item.id)} className="rounded-[1.6rem] border border-cyan-400/12 bg-[#081221] p-5">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="space-y-2">
                    <h3 className="text-xl text-white">{String(item.number)}</h3>
                    <p className="text-slate-300">Cliente: {client?.name || "-"}</p>
                    <p className="text-slate-400">Status: {String(item.status || "-")} | Total: {currency(Number(item.total || 0))}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button type="button" className="rounded-full border border-cyan-400/20 px-4 py-2 text-xs uppercase text-cyan-200" onClick={() => setEditing(item)}>
                      Editar
                    </button>
                    <button type="button" className="rounded-full border border-emerald-400/20 px-4 py-2 text-xs uppercase text-emerald-200" onClick={() => exportPdf(item)}>
                      Gerar PDF
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
