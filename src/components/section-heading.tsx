import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("space-y-4", align === "center" && "mx-auto max-w-3xl text-center")}>
      <span className={cn("section-label", align === "center" && "justify-center")}>{eyebrow}</span>
      <h2 className="max-w-4xl text-3xl uppercase leading-tight text-white sm:text-4xl lg:text-5xl">{title}</h2>
      {description ? <p className="max-w-2xl text-lg leading-8 text-slate-300">{description}</p> : null}
    </div>
  );
}
