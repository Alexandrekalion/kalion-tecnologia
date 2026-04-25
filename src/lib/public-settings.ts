import { readDatabase } from "@/lib/db";

export async function getPublicSettings() {
  const db = await readDatabase();
  return db.settings;
}

export function onlyDigits(value: string) {
  return value.replace(/\D/g, "");
}

export function buildWhatsAppUrl(whatsapp: string, message: string) {
  const digits = onlyDigits(whatsapp);
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function buildPhoneUrl(phone: string) {
  return `tel:+${onlyDigits(phone)}`;
}

export function buildMailUrl(email: string) {
  return `mailto:${email}`;
}
