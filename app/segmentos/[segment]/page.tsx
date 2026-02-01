import Link from "next/link";
import { notFound } from "next/navigation";
import { NavBar } from "@/components/NavBar";
import { SectionHeading } from "@/components/SectionHeading";
import { SiteFooter } from "@/components/SiteFooter";
import { buildCloudinaryUrl } from "@/lib/cloudinary";
import { segmentDetails } from "@/lib/site-data";

type SegmentPageProps = {
  params: Promise<{ segment: string }>;
};

export default async function SegmentPage({ params }: SegmentPageProps) {
  const { segment: segmentSlug } = await params;
  const segment = segmentDetails.find((item) => item.slug === segmentSlug);
  if (!segment) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#0b1110] text-white">
      <NavBar />
      <main className="mx-auto flex w-[min(1200px,92vw)] flex-col gap-12 pb-24 pt-28">
        <section className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="space-y-6">
            <p className="eyebrow">Segmento</p>
            <h1 className="text-4xl font-extrabold md:text-5xl">
              {segment.title}
            </h1>
            <p className="text-lg text-am-silver">{segment.description}</p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center rounded-full bg-am-primary px-6 py-3 text-sm font-extrabold uppercase tracking-[0.18em] text-black"
              >
                Contacto rápido
              </Link>
              <Link
                href="#categorias"
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-am-silver"
              >
                Ver servicios
              </Link>
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl border border-white/10">
            <img
              src={buildCloudinaryUrl(segment.heroImage)}
              alt={segment.title}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </section>

        <section id="categorias" className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <div className="space-y-8">
            <SectionHeading
              eyebrow="Servicios"
              title="Seleccioná el producto o servicio que necesitás"
              description="Accedé a cada ficha con detalles claros y tips informativos."
              align="left"
            />
            <div className="space-y-8">
              {segment.categories.map((category) => (
                <article
                  key={category.slug}
                  className="rounded-3xl border border-white/10 bg-[#0e1716]/95 p-6"
                >
                  <div className="space-y-2">
                    <h2 className="text-2xl font-semibold">{category.title}</h2>
                    <p className="text-sm text-am-muted">
                      {category.description}
                    </p>
                  </div>
                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    {category.items.map((item) => (
                      <Link
                        key={item.slug}
                        href={`/segmentos/${segment.slug}/${item.slug}`}
                        className="group flex h-full flex-col gap-3 rounded-3xl border border-white/10 bg-white/[0.04] p-5 transition hover:border-am-primary"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <h3 className="text-lg font-semibold text-white">
                            {item.title}
                          </h3>
                          <span className="text-xs font-bold uppercase tracking-[0.2em] text-am-primaryStrong">
                            Ver detalle
                          </span>
                        </div>
                        <p className="text-sm text-am-muted">{item.summary}</p>
                      </Link>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <h3 className="text-lg font-semibold">Menú rápido</h3>
              <ul className="mt-3 grid gap-3 text-sm text-am-silver">
                {segment.categories.flatMap((category) =>
                  category.items.map((item) => (
                    <li key={`${category.slug}-${item.slug}`}>
                      <Link
                        href={`/segmentos/${segment.slug}/${item.slug}`}
                        className="transition hover:text-white"
                      >
                        {item.title}
                      </Link>
                    </li>
                  )),
                )}
              </ul>
            </div>

            <div className="rounded-3xl border border-am-primary/40 bg-am-primary/15 p-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-am-primaryStrong">
                Asesoramiento breve
              </p>
              <p className="mt-3 text-sm text-am-silver">
                Contanos tu contexto y te orientamos en la solución adecuada
                para este segmento.
              </p>
              <Link
                href="/contacto"
                className="mt-4 inline-flex items-center justify-center rounded-full bg-am-primary px-4 py-2 text-xs font-extrabold uppercase tracking-[0.18em] text-black"
              >
                Hablar con un asesor
              </Link>
            </div>
          </aside>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
