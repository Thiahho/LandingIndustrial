import Link from "next/link";
import { notFound } from "next/navigation";
import { NavBar } from "@/components/NavBar";
import { SectionHeading } from "@/components/SectionHeading";
import { SiteFooter } from "@/components/SiteFooter";
import { buildCloudinaryUrl } from "@/lib/cloudinary";
import { segmentDetails } from "@/lib/site-data";

type SegmentServicePageProps = {
  params: { segment: string; service: string };
};

export default function SegmentServicePage({ params }: SegmentServicePageProps) {
  const segment = segmentDetails.find((item) => item.slug === params.segment);
  const service = segment?.categories
    .flatMap((category) => category.items)
    .find((item) => item.slug === params.service);

  if (!segment || !service) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#0b1110] text-white">
      <NavBar />
      <main className="mx-auto flex w-[min(1200px,92vw)] flex-col gap-12 pb-24 pt-28">
        <div className="flex flex-wrap items-center gap-3 text-sm text-am-muted">
          <Link href="/" className="hover:text-white">
            Inicio
          </Link>
          <span>/</span>
          <Link
            href={`/segmentos/${segment.slug}`}
            className="hover:text-white"
          >
            {segment.title}
          </Link>
          <span>/</span>
          <span className="text-white">{service.title}</span>
        </div>

        <section className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="space-y-6">
            <p className="eyebrow">{segment.title}</p>
            <h1 className="text-4xl font-extrabold md:text-5xl">
              {service.title}
            </h1>
            <p className="text-lg text-am-silver">{service.summary}</p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center rounded-full bg-am-primary px-6 py-3 text-sm font-extrabold uppercase tracking-[0.18em] text-black"
              >
                Solicitar información
              </Link>
              <Link
                href={`/segmentos/${segment.slug}`}
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-am-silver"
              >
                Volver al segmento
              </Link>
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl border border-white/10">
            <img
              src={buildCloudinaryUrl(service.image)}
              alt={service.title}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4 rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h2 className="text-xl font-semibold">Descripción del servicio</h2>
            <p className="text-sm text-am-muted">{service.description}</p>
          </div>
          <div className="space-y-4 rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h2 className="text-xl font-semibold">Tips informativos</h2>
            <ul className="grid gap-2 text-sm text-am-muted">
              {service.tips.map((tip) => (
                <li key={tip}>• {tip}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-[#0e1716]/95 p-6">
          <SectionHeading
            eyebrow="Contacto rápido"
            title="¿Querés una propuesta para este servicio?"
            description="Nuestro equipo comercial responde en el día."
            align="left"
            actions={
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center rounded-full bg-am-primary px-5 py-2 text-xs font-extrabold uppercase tracking-[0.18em] text-black"
              >
                Contactar ahora
              </Link>
            }
          />
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
