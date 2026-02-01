import Link from "next/link";
import { notFound } from "next/navigation";
import { NavBar } from "@/components/NavBar";
import { SectionHeading } from "@/components/SectionHeading";
import { SiteFooter } from "@/components/SiteFooter";
import { buildCloudinaryUrl } from "@/lib/cloudinary";
import { caseStudies, services } from "@/lib/site-data";

type ServiceDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) {
    notFound();
  }

  const relatedCases = caseStudies.filter((item) =>
    service.cases.includes(item.slug),
  );

  return (
    <div className="min-h-screen bg-[#0b1110] text-white">
      <NavBar />
      <main className="mx-auto flex w-[min(1200px,92vw)] flex-col gap-12 pb-24 pt-28">
        <section className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="space-y-6">
            <p className="eyebrow">Soluciones</p>
            <h1 className="text-4xl font-extrabold md:text-5xl">
              {service.title}
            </h1>
            <p className="text-lg text-am-silver">{service.summary}</p>
            <div className="flex flex-wrap gap-3">
              <a
                href={`mailto:ventas@empresa.com?subject=Quiero%20cotizar%20${encodeURIComponent(service.title)}`}
                className="inline-flex items-center justify-center rounded-full bg-am-primary px-6 py-3 text-sm font-extrabold uppercase tracking-[0.18em] text-black"
              >
                Quiero cotizar este servicio
              </a>
              <Link
                href="/configurador"
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-am-silver"
              >
                Probar configurador
              </Link>
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl border border-white/10">
            <img
              src={buildCloudinaryUrl(service.image)}
              alt={service.title}
              className="h-full w-full object-cover"
            />
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4 rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h2 className="text-xl font-semibold">¿Qué problema resuelve?</h2>
            <ul className="grid gap-2 text-sm text-am-muted">
              {service.problems.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-4 rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h2 className="text-xl font-semibold">Cómo funciona</h2>
            <ol className="grid gap-2 text-sm text-am-muted">
              {service.steps.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4 rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h2 className="text-xl font-semibold">Qué incluye</h2>
            <ul className="grid gap-2 text-sm text-am-muted">
              {service.includes.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-4 rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h2 className="text-xl font-semibold">Ideal para</h2>
            <ul className="grid gap-2 text-sm text-am-muted">
              {service.idealFor.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="space-y-6">
          <SectionHeading
            eyebrow="Galería"
            title="Imágenes del servicio en operación"
            description="Fotografías de referencia y esquemas explicativos del servicio."
            align="left"
          />
          <div className="grid gap-4 md:grid-cols-3">
            {service.gallery.map((image) => (
              <img
                key={image}
                src={buildCloudinaryUrl(image)}
                alt={`Galería de ${service.title}`}
                className="h-48 w-full rounded-3xl border border-white/10 object-cover"
                loading="lazy"
              />
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <SectionHeading
            eyebrow="Ítems del servicio"
            title="Detalle de cada componente operativo"
            description="Accedé a la ficha específica de cada ítem con su alcance y descripción."
            align="left"
          />
          <div className="grid gap-4 md:grid-cols-3">
            {service.itemsDetails.map((item) => (
              <Link
                key={item.slug}
                href={`/soluciones/${service.slug}/items/${item.slug}`}
                className="rounded-3xl border border-white/10 bg-[#0e1716]/95 p-5 transition hover:border-am-primary"
              >
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-am-muted">{item.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4 rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h2 className="text-xl font-semibold">Tecnologías que usamos</h2>
            <ul className="grid gap-2 text-sm text-am-muted">
              {service.technologies.map((tech) => (
                <li key={tech}>
                  <Link href={tech} className="text-am-primaryStrong">
                    {tech}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4 rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h2 className="text-xl font-semibold">Casos reales relacionados</h2>
            <ul className="grid gap-2 text-sm text-am-muted">
              {relatedCases.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/casos-reales/${item.slug}`}
                    className="text-am-primaryStrong"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-xl font-semibold">Preguntas frecuentes</h2>
          <div className="mt-4 grid gap-4">
            {service.faqs.map((faq) => (
              <div key={faq.question}>
                <p className="font-semibold text-white">{faq.question}</p>
                <p className="text-sm text-am-muted">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
