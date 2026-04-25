import { NextResponse } from "next/server";
import { readDatabase, writeDatabase } from "@/lib/db";

export async function GET() {
  const db = await readDatabase();
  return NextResponse.json(db.settings);
}

export async function PUT(request: Request) {
  const db = await readDatabase();
  const payload = await request.json();

  db.settings = {
    ...db.settings,
    companyName: String(payload.companyName || ""),
    tagline: String(payload.tagline || ""),
    email: String(payload.email || ""),
    phone: String(payload.phone || ""),
    whatsapp: String(payload.whatsapp || ""),
    linkedin: String(payload.linkedin || ""),
    address: String(payload.address || ""),
    cnpj: String(payload.cnpj || ""),
  };

  await writeDatabase(db);
  return NextResponse.json(db.settings);
}
