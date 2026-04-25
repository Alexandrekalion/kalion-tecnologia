import { NextResponse } from "next/server";
import { readDatabase, writeDatabase } from "@/lib/db";
import { slugify } from "@/lib/utils";

const resources = new Set(["clients", "services", "projects", "budgets", "orders", "warranties", "users"]);

export async function PUT(request: Request, context: { params: Promise<{ resource: string; id: string }> }) {
  const { resource, id } = await context.params;
  if (!resources.has(resource)) {
    return NextResponse.json({ message: "Recurso não encontrado." }, { status: 404 });
  }

  const db = await readDatabase();
  const payload = await request.json();
  const collection = db[resource as keyof typeof db] as Array<Record<string, unknown>>;
  const index = collection.findIndex((item) => item.id === id);

  if (index === -1) {
    return NextResponse.json({ message: "Registro não encontrado." }, { status: 404 });
  }

  const nextItem = { ...collection[index], ...payload, id };
  if (resource === "projects" && typeof nextItem.name === "string") {
    nextItem.slug = slugify(nextItem.name);
  }
  collection[index] = nextItem;
  await writeDatabase(db);
  return NextResponse.json(nextItem);
}

export async function DELETE(_: Request, context: { params: Promise<{ resource: string; id: string }> }) {
  const { resource, id } = await context.params;
  if (!resources.has(resource)) {
    return NextResponse.json({ message: "Recurso não encontrado." }, { status: 404 });
  }

  const db = await readDatabase();
  const collection = db[resource as keyof typeof db] as Array<Record<string, unknown>>;
  db[resource as keyof typeof db] = collection.filter((item) => item.id !== id) as never;
  await writeDatabase(db);
  return NextResponse.json({ ok: true });
}
