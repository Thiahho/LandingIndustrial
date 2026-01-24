import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
  actions?: ReactNode;
};

export function SectionHeading({ eyebrow, title, description, align = "center", actions }: SectionHeadingProps) {
  return (
    <div className={`section-heading ${align === "center" ? "mx-auto text-center" : "text-left"}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p>{description}</p>
      {actions ? <div className="pt-4">{actions}</div> : null}
    </div>
  );
}
