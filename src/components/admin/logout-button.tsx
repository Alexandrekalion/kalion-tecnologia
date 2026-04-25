"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/sistema-kalion-x9");
    router.refresh();
  }

  return (
    <Button variant="ghost" onClick={handleLogout}>
      Sair
    </Button>
  );
}
