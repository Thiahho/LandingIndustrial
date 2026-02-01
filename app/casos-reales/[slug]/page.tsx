import Link from "next/link";
import { notFound } from "next/navigation";
import { NavBar } from "@/components/NavBar";
import { SiteFooter } from "@/components/SiteFooter";
import { buildCloudinaryUrl } from "@/lib/cloudinary";
import { caseStudies, services } from "@/lib/site-data";

type CaseDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CaseDetailPage({ params }: CaseDetailPageProps) {
  const { slug } = await params;
  const caseStudy = caseStudies.find((item) => item.slug === slug);
  if (!caseStudy) {
    notFound();
  }

  const relatedServices = services.filter((service) =>
    caseStudy.services.includes(service.slug),
  );

  return (
    <div className="min-h-screen bg-[#0b1110] text-white">
      <NavBar />
      <main className="mx-auto flex w-[min(1200px,92vw)] flex-col gap-12 pb-24 pt-28">
        <section className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="space-y-6">
            <p className="eyebrow">Caso real</p>
            <h1 className="text-4xl font-extrabold md:text-5xl">
              {caseStudy.title}
            </h1>
            <p className="text-lg text-am-silver">{caseStudy.summary}</p>
            <p className="text-sm text-am-muted">
              Resultado: {caseStudy.result}
            </p>
            <a
              href={`mailto:ventas@empresa.com?subject=Quiero%20una%20soluci%C3%B3n%20similar%20a%20${encodeURIComponent(
                caseStudy.title,
              )}`}
              className="inline-flex items-center justify-center rounded-full bg-am-primary px-6 py-3 text-sm font-extrabold uppercase tracking-[0.18em] text-black"
            >
              Quiero una solución similar
            </a>
          </div>
          <div className="overflow-hidden rounded-3xl border border-white/10">
            <img
              src={buildCloudinaryUrl(caseStudy.image)}
              alt={caseStudy.title}
              className="h-full w-full object-cover"
            />
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-xl font-semibold">Servicios implementados</h2>
          <ul className="mt-4 grid gap-2 text-sm text-am-muted">
            {relatedServices.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/soluciones/${service.slug}`}
                  className="text-am-primaryStrong"
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
