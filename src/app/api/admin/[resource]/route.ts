import { NextResponse } from "next/server";
import { readDatabase, writeDatabase } from "@/lib/db";
import { slugify } from "@/lib/utils";

const resources = new Set(["clients", "services", "projects", "budgets", "orders", "warranties", "users"]);

export async function GET(_: Request, context: { params: Promise<{ resource: string }> }) {
  const { resource } = await context.params;
  if (!resources.has(resource)) {
    return NextResponse.json({ message: "Recurso não encontrado." }, { status: 404 });
  }

  const db = await readDatabase();
  return NextResponse.json(db[resource as keyof typeof db]);
}

export async function POST(request: Request, context: { params: Promise<{ resource: string }> }) {
  const { resource } = await context.params;
  if (!resources.has(resource)) {
    return NextResponse.json({ message: "Recurso não encontrado." }, { status: 404 });
  }

  const db = await readDatabase();
  const payload = await request.json();
  const collection = db[resource as keyof typeof db] as Array<Record<string, unknown>>;
  const entity = {
    ...payload,
    id: payload.id || `${resource.slice(0, 3)}-${Date.now()}`,
  };

  if (resource === "projects" && !entity.slug && typeof entity.name === "string") {
    entity.slug = slugify(entity.name);
  }

  collection.unshift(entity);
  await writeDatabase(db);
  return NextResponse.json(entity);
}
