import Link from "next/link";
import { NavBar } from "@/components/NavBar";
import { SectionHeading } from "@/components/SectionHeading";
import { SiteFooter } from "@/components/SiteFooter";
import { buildCloudinaryUrl } from "@/lib/cloudinary";
import { services } from "@/lib/site-data";

export default function SolucionesPage() {
  return (
    <div className="min-h-screen bg-[#0b1110] text-white">
      <NavBar />
      <main className="mx-auto flex w-[min(1200px,92vw)] flex-col gap-12 pb-24 pt-28">
        <SectionHeading
          eyebrow="Soluciones"
          title="Catálogo completo de soluciones de seguridad empresarial."
          description="Seleccioná el servicio que necesitás o usá el configurador para recibir una recomendación rápida."
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.slug}
              className="flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0e1716]/95"
            >
              <div className="relative h-40 w-full">
                <img
                  src={buildCloudinaryUrl(service.image)}
                  alt={service.title}
                  className="h-full w-full object-cover opacity-80"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1514] via-[#0d1514]/60 to-transparent" />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-6">
                <h3 className="text-lg font-semibold">{service.title}</h3>
                <p className="text-sm text-am-muted">{service.summary}</p>
                <ul className="grid gap-2 text-sm text-am-silver">
                  {service.problems.slice(0, 2).map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-wrap gap-3">
                  <Link
                    href={`/soluciones/${service.slug}`}
                    className="inline-flex items-center justify-center rounded-full border border-white/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-am-silver transition hover:border-am-primary hover:text-white"
                  >
                    Ver detalle
                  </Link>
                  <Link
                    href="/configurador"
                    className="text-xs font-semibold text-am-primaryStrong"
                  >
                    Probar configurador →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
