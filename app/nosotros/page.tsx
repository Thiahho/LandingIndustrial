import { NavBar } from "@/components/NavBar";
import { SectionHeading } from "@/components/SectionHeading";
import { SiteFooter } from "@/components/SiteFooter";
import { mission, values, vision } from "@/lib/site-data";

export default function NosotrosPage() {
  return (
    <div className="min-h-screen bg-[#0b1110] text-white">
      <NavBar />
      <main className="mx-auto flex w-[min(1200px,92vw)] flex-col gap-12 pb-24 pt-28">
        <SectionHeading
          eyebrow="Nosotros"
          title="Soluciones de seguridad con foco en compromiso y cumplimiento."
          description="Somos una empresa argentina dedicada a la seguridad física y electrónica, con respuesta inmediata y mejora continua."
        />

        <section className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h2 className="text-xl font-semibold">Quiénes somos</h2>
            <p className="mt-2 text-sm text-am-muted">
              Un equipo profesional con experiencia en operaciones críticas,
              dedicado a construir relaciones de largo plazo con empresas
              medianas y grandes.
            </p>
          </article>
          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h2 className="text-xl font-semibold">Diferenciales</h2>
            <ul className="mt-2 grid gap-2 text-sm text-am-muted">
              <li>• Respuesta rápida y protocolos auditables.</li>
              <li>• Integración de seguridad física y monitoreo.</li>
              <li>• Equipo entrenado y cobertura 24/7.</li>
            </ul>
          </article>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h2 className="text-xl font-semibold">Misión</h2>
            <p className="mt-2 text-sm text-am-muted">{mission}</p>
          </article>
          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h2 className="text-xl font-semibold">Visión</h2>
            <p className="mt-2 text-sm text-am-muted">{vision}</p>
          </article>
        </section>

        <section className="space-y-6">
          <SectionHeading
            eyebrow="Valores"
            title="Principios que guían cada decisión."
            description="Vocación de servicio, dedicación y trabajo en equipo en cada operación."
            align="left"
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {values.map((value) => (
              <article
                key={value.title}
                className="rounded-3xl border border-white/10 bg-[#0e1716]/95 p-5"
              >
                <h3 className="text-base font-semibold text-white">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm text-am-muted">{value.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-xl font-semibold">Certificaciones y normas</h2>
          <ul className="mt-2 grid gap-2 text-sm text-am-muted">
            <li>• Habilitaciones vigentes y normativa local.</li>
            <li>• Protocolos de seguridad y compliance interno.</li>
            <li>• Capacitación continua del equipo.</li>
          </ul>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
