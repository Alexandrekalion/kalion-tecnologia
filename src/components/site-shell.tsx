import type { ReactNode } from "react";
import { ActionRail } from "@/components/action-rail";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getPublicSettings } from "@/lib/public-settings";

export async function SiteShell({ children }: { children: ReactNode }) {
  const settings = await getPublicSettings();

  return (
    <div className="page-shell">
      <SiteHeader />
      <ActionRail settings={settings} />
      <main>{children}</main>
      <SiteFooter settings={settings} />
    </div>
  );
}
