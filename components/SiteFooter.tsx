import Link from "next/link";

const footerLinks = [
  { href: "/soluciones", label: "Soluciones" },
  { href: "/sectores", label: "Sectores" },
  { href: "/tecnologia", label: "Tecnología" },
  { href: "/casos-reales", label: "Casos reales" },
  { href: "/novedades", label: "Novedades" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" }
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#080f0e] py-10">
      <div className="mx-auto flex w-[min(1200px,92vw)] flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-am-primary to-emerald-900 font-extrabold text-black">
            AM
          </div>
          <div className="grid leading-tight">
            <span className="font-semibold">AM Seguridad</span>
            <span className="text-xs text-am-muted">
              Solidez, tecnología y confianza
            </span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 text-sm font-semibold text-am-silver">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full border border-transparent px-4 py-2 hover:border-white/15"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
