import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

function sanitizeFilename(name: string) {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9.\-_]+/g, "-")
    .replace(/-+/g, "-")
    .toLowerCase();
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file");
  const kind = String(formData.get("kind") || "image");
  const resource = String(formData.get("resource") || "general");

  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ message: "Arquivo inválido." }, { status: 400 });
  }

  const allowed = kind === "video"
    ? ["video/mp4", "video/webm", "video/ogg", "video/quicktime"]
    : ["image/png", "image/jpeg", "image/webp", "image/svg+xml"];

  if (!allowed.includes(file.type)) {
    return NextResponse.json({ message: "Tipo de arquivo não permitido." }, { status: 400 });
  }

  const ext = path.extname(file.name) || (kind === "video" ? ".mp4" : ".png");
  const safeName = `${Date.now()}-${sanitizeFilename(path.basename(file.name, ext))}${ext}`;
  const relativeDir = path.join("uploads", resource);
  const targetDir = path.join(process.cwd(), "public", relativeDir);
  await fs.mkdir(targetDir, { recursive: true });

  const buffer = Buffer.from(await file.arrayBuffer());
  const targetFile = path.join(targetDir, safeName);
  await fs.writeFile(targetFile, buffer);

  return NextResponse.json({
    ok: true,
    url: `/${relativeDir.replace(/\\/g, "/")}/${safeName}`,
  });
}
