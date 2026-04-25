import { cookies } from "next/headers";

export const ADMIN_SESSION_COOKIE = "kalion_admin_session";
const ADMIN_USER = process.env.ADMIN_USER || "administrador";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "LR1a2b3c4567@";

export function validateAdminCredentials(username: string, password: string) {
  return username === ADMIN_USER && password === ADMIN_PASSWORD;
}

export async function isAuthenticated() {
  const store = await cookies();
  return store.get(ADMIN_SESSION_COOKIE)?.value === "authenticated";
}
