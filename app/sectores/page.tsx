import Link from "next/link";
import { NavBar } from "@/components/NavBar";
import { SectionHeading } from "@/components/SectionHeading";
import { SiteFooter } from "@/components/SiteFooter";
import { buildCloudinaryUrl } from "@/lib/cloudinary";
import { sectors } from "@/lib/site-data";

export default function SectoresPage() {
  return (
    <div className="min-h-screen bg-[#0b1110] text-white">
      <NavBar />
      <main className="mx-auto flex w-[min(1200px,92vw)] flex-col gap-12 pb-24 pt-28">
        <SectionHeading
          eyebrow="Sectores"
          title="Soluciones alineadas al contexto operativo de cada industria."
          description="Conocemos la realidad de logística, industria, oficinas, retail y edificios corporativos."
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {sectors.map((sector) => (
            <article
              key={sector.slug}
              className="flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0e1716]/95"
            >
              <div className="relative h-40 w-full">
                <img
                  src={buildCloudinaryUrl(sector.image)}
                  alt={sector.title}
                  className="h-full w-full object-cover opacity-80"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1514] via-[#0d1514]/60 to-transparent" />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-6">
                <h3 className="text-lg font-semibold">{sector.title}</h3>
                <ul className="grid gap-2 text-sm text-am-muted">
                  {sector.risks.slice(0, 2).map((risk) => (
                    <li key={risk}>• {risk}</li>
                  ))}
                </ul>
                <Link
                  href={`/sectores/${sector.slug}`}
                  className="mt-auto inline-flex w-fit items-center justify-center rounded-full border border-white/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-am-silver transition hover:border-am-primary hover:text-white"
                >
                  Ver sector
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
