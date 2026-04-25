import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { readDatabase, writeDatabase } from "@/lib/db";

export async function POST(request: Request) {
  const body = await request.json();
  const db = await readDatabase();
  db.leads.unshift({
    id: `lead-${Date.now()}`,
    ...body,
    createdAt: new Date().toISOString(),
  });
  await writeDatabase(db);

  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const port = Number(process.env.SMTP_PORT || 587);

  if (host && user && pass) {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM || user,
      to: db.settings.email,
      subject: `Novo contato do site - ${body.name}`,
      html: `
        <h2>Novo lead recebido</h2>
        <p><strong>Nome:</strong> ${body.name}</p>
        <p><strong>Telefone:</strong> ${body.phone}</p>
        <p><strong>E-mail:</strong> ${body.email}</p>
        <p><strong>Empresa:</strong> ${body.company}</p>
        <p><strong>Serviço:</strong> ${body.service}</p>
        <p><strong>Mensagem:</strong> ${body.message}</p>
      `,
    });
  }

  return NextResponse.json({ ok: true });
}
