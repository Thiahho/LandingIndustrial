import { NavBar } from "@/components/NavBar";
import { SectionHeading } from "@/components/SectionHeading";
import { SiteFooter } from "@/components/SiteFooter";
import { contactInfo } from "@/lib/site-data";

export default function ContactoPage() {
  return (
    <div className="min-h-screen bg-[#0b1110] text-white">
      <NavBar />
      <main className="mx-auto flex w-[min(1200px,92vw)] flex-col gap-12 pb-24 pt-28">
        <SectionHeading
          eyebrow="Contacto"
          title="Contacto rápido y sin vueltas."
          description="Canales comerciales y soporte para clientes activos."
        />

        <section className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="space-y-6 rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h2 className="text-xl font-semibold">Contacto comercial</h2>
            <a
              href={`mailto:${contactInfo.commercialEmail}`}
              className="inline-flex items-center justify-center rounded-full bg-am-primary px-6 py-3 text-sm font-extrabold uppercase tracking-[0.18em] text-black"
            >
              Escribir a ventas
            </a>
            <div className="grid gap-2 text-sm text-am-muted">
              <p>
                <strong className="text-white">WhatsApp:</strong> {" "}
                <a href={contactInfo.whatsapp} className="text-am-primaryStrong">
                  {contactInfo.phone}
                </a>
              </p>
              <p>
                <strong className="text-white">Email:</strong>{" "}
                {contactInfo.commercialEmail}
              </p>
              <p>
                <strong className="text-white">Horario:</strong> {" "}
                {contactInfo.schedule}
              </p>
              <p>
                <strong className="text-white">Dirección:</strong> {" "}
                {contactInfo.address}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-am-muted">
              <p className="font-semibold text-white">Recursos</p>
              <p className="mt-2">
                Descargá la carta de presentación y compartila con tu equipo de
                compras.
              </p>
            </div>
          </div>

          <form className="space-y-4 rounded-3xl border border-white/10 bg-[#0e1716]/95 p-6">
            <h3 className="text-lg font-semibold">Formulario rápido</h3>
            {[
              { id: "nombre", label: "Nombre y apellido", type: "text" },
              { id: "empresa", label: "Empresa", type: "text" },
              { id: "email", label: "Email corporativo", type: "email" },
              { id: "telefono", label: "Teléfono (opcional)", type: "tel" }
            ].map((field) => (
              <label key={field.id} className="grid gap-2 text-sm">
                {field.label}
                <input
                  id={field.id}
                  name={field.id}
                  type={field.type}
                  className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-am-primary focus:outline-none"
                  required={field.id !== "telefono"}
                />
              </label>
            ))}
            <label className="grid gap-2 text-sm">
              Tipo de consulta
              <select className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white focus:border-am-primary focus:outline-none">
                <option>Servicios</option>
                <option>Tecnología</option>
                <option>Casos reales</option>
                <option>Otro</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm">
              Mensaje
              <textarea
                rows={4}
                className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-am-primary focus:outline-none"
              />
            </label>
            <button
              type="button"
              className="inline-flex w-full items-center justify-center rounded-full bg-am-primary px-6 py-3 text-sm font-extrabold uppercase tracking-[0.18em] text-black"
            >
              Enviar mensaje
            </button>
          </form>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <h3 className="text-lg font-semibold">Trabajá con nosotros</h3>
          <p className="mt-2 text-sm text-am-muted">
            Envianos tu CV a{" "}
            <a
              href="mailto:incorporaciones@amseguridad.com.ar"
              className="text-am-primaryStrong"
            >
              incorporaciones@amseguridad.com.ar
            </a>{" "}
            o completá el formulario en{" "}
            <a href="/trabaja" className="text-am-primaryStrong">
              trabajá con nosotros
            </a>
            .
          </p>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
