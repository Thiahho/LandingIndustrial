import Link from "next/link";
import { notFound } from "next/navigation";
import { NavBar } from "@/components/NavBar";
import { SiteFooter } from "@/components/SiteFooter";
import { buildCloudinaryUrl } from "@/lib/cloudinary";
import { services } from "@/lib/site-data";

type ServiceItemPageProps = {
  params: Promise<{ slug: string; itemSlug: string }>;
};

export default async function ServiceItemPage({ params }: ServiceItemPageProps) {
  const { slug, itemSlug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) {
    notFound();
  }

  const serviceItem = service.itemsDetails.find(
    (item) => item.slug === itemSlug,
  );

  if (!serviceItem) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#0b1110] text-white">
      <NavBar />
      <main className="mx-auto flex w-[min(1200px,92vw)] flex-col gap-10 pb-24 pt-28">
        <section className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="space-y-6">
            <p className="eyebrow">{service.title}</p>
            <h1 className="text-4xl font-extrabold md:text-5xl">
              {serviceItem.title}
            </h1>
            <p className="text-lg text-am-silver">
              {serviceItem.description}
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={`mailto:ventas@empresa.com?subject=Consulta%20sobre%20${encodeURIComponent(
                  serviceItem.title,
                )}`}
                className="inline-flex items-center justify-center rounded-full bg-am-primary px-6 py-3 text-sm font-extrabold uppercase tracking-[0.18em] text-black"
              >
                Hablar con ventas
              </a>
              <Link
                href={`/soluciones/${service.slug}`}
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-am-silver"
              >
                Volver al servicio
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

        <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-xl font-semibold">Descripción detallada</h2>
          <p className="mt-2 text-sm text-am-muted">
            Este ítem es parte del servicio de {service.title}. Si necesitás una
            solución integral, podés revisar el resto de los componentes o
            solicitarnos una propuesta completa.
          </p>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
