import Link from "next/link";
import { notFound } from "next/navigation";
import { NavBar } from "@/components/NavBar";
import { SectionHeading } from "@/components/SectionHeading";
import { SiteFooter } from "@/components/SiteFooter";
import { buildCloudinaryUrl } from "@/lib/cloudinary";
import { caseStudies, sectors, services } from "@/lib/site-data";

type SectorDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function SectorDetailPage({ params }: SectorDetailPageProps) {
  const { slug } = await params;
  const sector = sectors.find((item) => item.slug === slug);
  if (!sector) {
    notFound();
  }

  const recommendedServices = services.filter((service) =>
    sector.services.includes(service.slug),
  );
  const relatedCases = caseStudies.filter((item) =>
    sector.cases.includes(item.slug),
  );

  return (
    <div className="min-h-screen bg-[#0b1110] text-white">
      <NavBar />
      <main className="mx-auto flex w-[min(1200px,92vw)] flex-col gap-12 pb-24 pt-28">
        <section className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="space-y-6">
            <p className="eyebrow">Sectores</p>
            <h1 className="text-4xl font-extrabold md:text-5xl">
              {sector.title}
            </h1>
            <p className="text-lg text-am-silver">
              Entendemos los riesgos específicos del sector y diseñamos soluciones a medida.
            </p>
            <a
              href={`mailto:ventas@empresa.com?subject=Quiero%20una%20soluci%C3%B3n%20para%20${encodeURIComponent(
                sector.title,
              )}`}
              className="inline-flex items-center justify-center rounded-full bg-am-primary px-6 py-3 text-sm font-extrabold uppercase tracking-[0.18em] text-black"
            >
              Quiero una solución para este sector
            </a>
          </div>
          <div className="overflow-hidden rounded-3xl border border-white/10">
            <img
              src={buildCloudinaryUrl(sector.image)}
              alt={sector.title}
              className="h-full w-full object-cover"
            />
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4 rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h2 className="text-xl font-semibold">Riesgos típicos</h2>
            <ul className="grid gap-2 text-sm text-am-muted">
              {sector.risks.map((risk) => (
                <li key={risk}>• {risk}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-4 rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h2 className="text-xl font-semibold">Tecnologías clave</h2>
            <ul className="grid gap-2 text-sm text-am-muted">
              {sector.technologies.map((tech) => (
                <li key={tech}>• {tech}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="space-y-6">
          <SectionHeading
            eyebrow="Servicios recomendados"
            title="Servicios recomendados para este sector"
            description="Soluciones probadas que respondieron a riesgos similares."
            align="left"
          />
          <div className="grid gap-4 md:grid-cols-2">
            {recommendedServices.map((service) => (
              <Link
                key={service.slug}
                href={`/soluciones/${service.slug}`}
                className="rounded-3xl border border-white/10 bg-[#0e1716]/95 p-6 transition hover:border-am-primary"
              >
                <h3 className="text-lg font-semibold">{service.title}</h3>
                <p className="mt-2 text-sm text-am-muted">{service.summary}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <SectionHeading
            eyebrow="Casos reales"
            title="Proyectos similares en este sector"
            description="Implementaciones con resultados tangibles en operaciones reales."
            align="left"
          />
          <div className="grid gap-4 md:grid-cols-2">
            {relatedCases.map((item) => (
              <Link
                key={item.slug}
                href={`/casos-reales/${item.slug}`}
                className="rounded-3xl border border-white/10 bg-[#0e1716]/95 p-6 transition hover:border-am-primary"
              >
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-am-muted">{item.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
