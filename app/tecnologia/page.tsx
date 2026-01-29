import { NavBar } from "@/components/NavBar";
import { SectionHeading } from "@/components/SectionHeading";
import { SiteFooter } from "@/components/SiteFooter";
import { buildCloudinaryUrl } from "@/lib/cloudinary";
import { technologySections } from "@/lib/site-data";

export default function TecnologiaPage() {
  return (
    <div className="min-h-screen bg-[#0b1110] text-white">
      <NavBar />
      <main className="mx-auto flex w-[min(1200px,92vw)] flex-col gap-12 pb-24 pt-28">
        <SectionHeading
          eyebrow="Tecnología"
          title="Backstage tecnológico que potencia cada servicio."
          description="Equipos, plataformas e integraciones diseñadas para seguridad empresarial y monitoreo continuo."
        />

        <div className="grid gap-10">
          {technologySections.map((section) => (
            <section
              key={section.slug}
              className="rounded-3xl border border-white/10 bg-[#0e1716]/95 p-6"
            >
              <h2 className="text-2xl font-semibold">{section.title}</h2>
              <p className="mt-2 text-sm text-am-muted">
                {section.description}
              </p>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {section.items.map((item) => (
                  <article
                    key={item.title}
                    className="overflow-hidden rounded-3xl border border-white/10 bg-[#0b1110]"
                  >
                    <div className="relative h-32">
                      <img
                        src={buildCloudinaryUrl(item.image)}
                        alt={item.title}
                        className="h-full w-full object-cover opacity-80"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0b1110] via-[#0b1110]/50 to-transparent" />
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <p className="mt-2 text-sm text-am-muted">
                        {item.description}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
