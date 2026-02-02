import Link from "next/link";
import { notFound } from "next/navigation";
import { NavBar } from "@/components/NavBar";
import { SectionHeading } from "@/components/SectionHeading";
import { SiteFooter } from "@/components/SiteFooter";
import { buildCloudinaryUrl } from "@/lib/cloudinary";
import { services } from "@/lib/site-data";

type ServicePageProps = {
  params: Promise<{ service: string }>;
};

export default async function ServicePage({ params }: ServicePageProps) {
  const { service: serviceSlug } = await params;
  const service = services.find((item) => item.slug === serviceSlug);

  if (!service) {
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
          <Link href="/#servicios" className="hover:text-white">
            Servicios
          </Link>
          <span>/</span>
          <span className="text-white">{service.title}</span>
        </div>

        <section className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="space-y-6">
            <p className="eyebrow">Servicio</p>
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
                href="/#servicios"
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-am-silver"
              >
                Ver todos los servicios
              </Link>
            </div>
          </div>
          <div className="h-64 overflow-hidden rounded-3xl border border-white/10 lg:h-80">
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
            <h2 className="text-xl font-semibold">Problemas que resolvemos</h2>
            <ul className="grid gap-2 text-sm text-am-muted">
              {service.problems.map((problem) => (
                <li key={problem}>• {problem}</li>
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

        <section className="rounded-3xl border border-white/10 bg-[#0e1716]/95 p-6">
          <h2 className="mb-6 text-2xl font-semibold">Detalle operativo</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {service.itemsDetails.map((item) => (
              <article
                key={item.slug}
                className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-white/[0.04] p-5"
              >
                <h3 className="text-lg font-semibold text-white">
                  {item.title}
                </h3>
                <p className="text-sm text-am-muted">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4 rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h2 className="text-xl font-semibold">Cómo trabajamos</h2>
            <ol className="grid gap-2 text-sm text-am-muted">
              {service.steps.map((step, index) => (
                <li key={step}>
                  <span className="font-bold text-am-primaryStrong">{index + 1}.</span> {step}
                </li>
              ))}
            </ol>
          </div>
          <div className="space-y-4 rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h2 className="text-xl font-semibold">El servicio incluye</h2>
            <ul className="grid gap-2 text-sm text-am-muted">
              {service.includes.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        </section>

        {service.tips.length > 0 && (
          <section className="rounded-3xl border border-am-primary/40 bg-am-primary/10 p-6">
            <h2 className="mb-4 text-xl font-semibold">Tips informativos</h2>
            <ul className="grid gap-3 text-sm text-am-silver md:grid-cols-2">
              {service.tips.map((tip) => (
                <li key={tip} className="flex items-start gap-2">
                  <span className="mt-0.5 text-am-primaryStrong">✓</span>
                  {tip}
                </li>
              ))}
            </ul>
          </section>
        )}

        {service.faqs.length > 0 && (
          <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h2 className="mb-6 text-2xl font-semibold">Preguntas frecuentes</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {service.faqs.map((faq) => (
                <article key={faq.question} className="space-y-2">
                  <h3 className="font-semibold text-white">{faq.question}</h3>
                  <p className="text-sm text-am-muted">{faq.answer}</p>
                </article>
              ))}
            </div>
          </section>
        )}

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
