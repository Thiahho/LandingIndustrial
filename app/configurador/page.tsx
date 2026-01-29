import Link from "next/link";
import { NavBar } from "@/components/NavBar";
import { SectionHeading } from "@/components/SectionHeading";
import { SiteFooter } from "@/components/SiteFooter";
import { services } from "@/lib/site-data";

export default function ConfiguradorPage() {
  const recommended = services.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#0b1110] text-white">
      <NavBar />
      <main className="mx-auto flex w-[min(1200px,92vw)] flex-col gap-12 pb-24 pt-28">
        <SectionHeading
          eyebrow="Configurador"
          title="Respondé tres pasos y te recomendamos la mejor solución."
          description="Pensado para empresas que buscan una respuesta directa sin perder tiempo."
        />

        <section className="grid gap-6 md:grid-cols-3">
          {["Tipo de empresa", "Problema a resolver", "Sedes y horarios"].map(
            (step, index) => (
              <article
                key={step}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
              >
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-am-primaryStrong">
                  Paso {index + 1}
                </p>
                <h3 className="mt-2 text-lg font-semibold">{step}</h3>
                <p className="mt-2 text-sm text-am-muted">
                  Completá este paso para que podamos orientar la solución.
                </p>
              </article>
            ),
          )}
        </section>

        <section className="rounded-3xl border border-white/10 bg-[#0e1716]/95 p-6">
          <h2 className="text-xl font-semibold">Recomendación inicial</h2>
          <p className="mt-2 text-sm text-am-muted">
            Según los datos habituales de empresas medianas y grandes, estos
            servicios suelen ser los más efectivos.
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {recommended.map((service) => (
              <Link
                key={service.slug}
                href={`/soluciones/${service.slug}`}
                className="rounded-3xl border border-white/10 bg-[#0b1110] p-5 transition hover:border-am-primary"
              >
                <h3 className="text-lg font-semibold">{service.title}</h3>
                <p className="mt-2 text-sm text-am-muted">{service.summary}</p>
              </Link>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="mailto:ventas@empresa.com?subject=Quiero%20esta%20soluci%C3%B3n"
              className="inline-flex items-center justify-center rounded-full bg-am-primary px-6 py-3 text-sm font-extrabold uppercase tracking-[0.18em] text-black"
            >
              Quiero esta solución
            </a>
            <Link
              href="/soluciones"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-am-silver"
            >
              Ver detalle de servicios
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
