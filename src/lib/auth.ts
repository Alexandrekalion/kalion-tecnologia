import { cookies } from "next/headers";

export const ADMIN_SESSION_COOKIE = "kalion_admin_session";
const ADMIN_USER = process.env.ADMIN_USER;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export function validateAdminCredentials(username: string, password: string) {
  if (!ADMIN_USER || !ADMIN_PASSWORD) {
    return false;
  }
  return username === ADMIN_USER && password === ADMIN_PASSWORD;
}

export async function isAuthenticated() {
  const store = await cookies();
  return store.get(ADMIN_SESSION_COOKIE)?.value === "authenticated";
}
