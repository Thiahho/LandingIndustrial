import { NavBar } from "@/components/NavBar";
import { SectionHeading } from "@/components/SectionHeading";
import { SiteFooter } from "@/components/SiteFooter";

export default function TrabajaPage() {
  return (
    <div className="min-h-screen bg-[#0b1110] text-white">
      <NavBar />
      <main className="mx-auto flex w-[min(1200px,92vw)] flex-col gap-12 pb-24 pt-28">
        <SectionHeading
          eyebrow="Trabajá con nosotros"
          title="Postulaciones simples, rápidas y ordenadas."
          description="Completá los datos y adjuntá tu CV para iniciar el proceso."
        />

        <section className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <form className="space-y-4 rounded-3xl border border-white/10 bg-[#0e1716]/95 p-6">
            <h2 className="text-xl font-semibold">Formulario de CV</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                { id: "nombre", label: "Nombre/s", type: "text" },
                { id: "apellido", label: "Apellido/s", type: "text" },
                { id: "email", label: "Email", type: "email" },
                { id: "dni", label: "DNI", type: "text" },
                { id: "nacimiento", label: "Fecha de nacimiento", type: "date" },
                { id: "puesto", label: "Puesto requerido", type: "text" }
              ].map((field) => (
                <label key={field.id} className="grid gap-2 text-sm">
                  {field.label}
                  <input
                    id={field.id}
                    name={field.id}
                    type={field.type}
                    className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-am-primary focus:outline-none"
                    required
                  />
                </label>
              ))}
            </div>

            <label className="grid gap-2 text-sm">
              Adjuntar CV
              <input
                type="file"
                name="cv"
                className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white file:mr-4 file:rounded-full file:border-0 file:bg-am-primary file:px-4 file:py-2 file:text-xs file:font-bold file:uppercase file:tracking-[0.18em] file:text-black"
              />
            </label>

            <div className="grid gap-4 md:grid-cols-2">
              {[
                { id: "calle", label: "Calle", type: "text" },
                { id: "numero", label: "Número", type: "text" },
                { id: "piso", label: "Piso", type: "text" },
                { id: "depto", label: "Depto.", type: "text" },
                { id: "localidad", label: "Localidad", type: "text" },
                { id: "partido", label: "Partido", type: "text" },
                { id: "cp", label: "C.P.", type: "text" }
              ].map((field) => (
                <label key={field.id} className="grid gap-2 text-sm">
                  {field.label}
                  <input
                    id={field.id}
                    name={field.id}
                    type={field.type}
                    className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-am-primary focus:outline-none"
                  />
                </label>
              ))}
            </div>

            <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.03] p-4 text-sm text-am-muted">
              reCAPTCHA para filtrar bots (integración pendiente).
            </div>

            <button
              type="button"
              className="inline-flex w-full items-center justify-center rounded-full bg-am-primary px-6 py-3 text-sm font-extrabold uppercase tracking-[0.18em] text-black"
            >
              Enviar CV
            </button>
          </form>

          <aside className="space-y-6 rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h3 className="text-lg font-semibold">Canales de contacto</h3>
            <div className="grid gap-2 text-sm text-am-muted">
              <p>
                <strong className="text-white">Teléfono:</strong> (011) 5671-4600
              </p>
              <p>
                <strong className="text-white">Email RR.HH.:</strong>{" "}
                incorporaciones@amseguridad.com.ar
              </p>
              <p>
                <strong className="text-white">Horario:</strong> Lun a Vie · 09:00
                a 18:00
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-am-muted">
              Si ya enviaste tu CV, nuestro equipo te contactará en caso de
              avanzar con la búsqueda.
            </div>
          </aside>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
