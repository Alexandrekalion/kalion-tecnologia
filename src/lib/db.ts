import { promises as fs } from "fs";
import path from "path";
import type { Database } from "@/lib/types";

const databasePath = path.join(process.cwd(), "data", "kalion-db.json");

async function ensureDatabase() {
  try {
    await fs.access(databasePath);
  } catch {
    await fs.mkdir(path.dirname(databasePath), { recursive: true });
    const initial = await fs.readFile(databasePath, "utf8").catch(() => "");
    if (!initial) {
      throw new Error("Arquivo de banco inicial não encontrado.");
    }
  }
}

export async function readDatabase(): Promise<Database> {
  await ensureDatabase();
  const raw = await fs.readFile(databasePath, "utf8");
  return JSON.parse(raw) as Database;
}

export async function writeDatabase(data: Database) {
  await fs.writeFile(databasePath, JSON.stringify(data, null, 2), "utf8");
}

export async function updateCollection<K extends keyof Database>(
  collection: K,
  updater: (items: Database[K], db: Database) => Database[K],
) {
  const db = await readDatabase();
  db[collection] = updater(db[collection], db);
  await writeDatabase(db);
  return db[collection];
}
