import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
  as?: "h2" | "h3";
  actions?: ReactNode;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  as = "h2",
  actions,
}: SectionHeadingProps) {
  const HeadingTag = as;

  return (
    <div className={`section-heading ${align === "center" ? "mx-auto text-center" : "text-left"}`}>
      <p className="eyebrow">{eyebrow}</p>
      <HeadingTag>{title}</HeadingTag>
      <p>{description}</p>
      {actions ? <div className="pt-4">{actions}</div> : null}
    </div>
  );
}
