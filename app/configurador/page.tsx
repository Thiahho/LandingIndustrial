"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { NavBar } from "@/components/NavBar";
import { SectionHeading } from "@/components/SectionHeading";
import { SiteFooter } from "@/components/SiteFooter";
import { contactInfo, services } from "@/lib/site-data";

export default function ConfiguradorPage() {
  const searchParams = useSearchParams();
  const initialAnswers = useMemo(
    () => ({
      companyType: searchParams.get("empresa") ?? "",
      mainNeed: searchParams.get("necesidad") ?? "",
      location: searchParams.get("zona") ?? "",
    }),
    [searchParams],
  );
  const [answers, setAnswers] = useState({
    companyType: initialAnswers.companyType,
    sector: "",
    mainNeed: initialAnswers.mainNeed,
    location: initialAnswers.location,
    sites: "",
    urgency: "",
  });
  const [lead, setLead] = useState({
    name: "",
    company: "",
    whatsapp: "",
    email: "",
    detail: "",
  });
  const recommended = services.slice(0, 3);
  const leadMessage = useMemo(() => {
    const lines = [
      "Hola, quiero configurar una solución de seguridad.",
      "",
      `Tipo de empresa: ${answers.companyType || "No especificado"}`,
      `Sector: ${answers.sector || "No especificado"}`,
      `Necesidad principal: ${answers.mainNeed || "No especificado"}`,
      `Zona o sedes: ${answers.location || "No especificado"}`,
      `Cantidad de sedes: ${answers.sites || "No especificado"}`,
      `Urgencia: ${answers.urgency || "No especificado"}`,
      "",
      `Nombre: ${lead.name || "No especificado"}`,
      `Empresa: ${lead.company || "No especificado"}`,
      `WhatsApp: ${lead.whatsapp || "No especificado"}`,
      `Email: ${lead.email || "No especificado"}`,
      `Detalle adicional: ${lead.detail || "No especificado"}`,
    ];
    return lines.join("\n");
  }, [answers, lead]);
  const whatsappUrl = useMemo(() => {
    const url = new URL(contactInfo.whatsapp);
    url.searchParams.set("text", leadMessage);
    return url.toString();
  }, [leadMessage]);
  const mailtoUrl = useMemo(() => {
    const subject = "Configurador - Solicitud de contacto";
    return `mailto:${contactInfo.commercialEmail}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(leadMessage)}`;
  }, [leadMessage]);

  return (
    <div className="min-h-screen bg-[#0b1110] text-white">
      <NavBar />
      <main className="mx-auto flex w-[min(1200px,92vw)] flex-col gap-12 pb-24 pt-28">
        <SectionHeading
          eyebrow="Configurador"
          title="Respondé tres pasos y te recomendamos la mejor solución."
          description="Pensado para empresas que buscan una respuesta directa sin perder tiempo."
        />

        <section className="grid gap-6">
          <div className="grid gap-4 rounded-3xl border border-white/10 bg-[#0e1716]/95 p-6 md:grid-cols-3">
            <label className="grid gap-2 text-sm text-am-silver">
              Tipo de empresa
              <select
                value={answers.companyType}
                onChange={(event) =>
                  setAnswers((prev) => ({
                    ...prev,
                    companyType: event.target.value,
                  }))
                }
                className="rounded-2xl border border-white/10 bg-[#0b1110] px-4 py-3 text-sm text-white"
              >
                <option value="">Seleccionar</option>
                <option value="industria">Industria</option>
                <option value="logistica">Logística</option>
                <option value="retail">Retail</option>
                <option value="oficinas">Oficinas</option>
                <option value="otros">Otro</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm text-am-silver">
              Sector principal
              <select
                value={answers.sector}
                onChange={(event) =>
                  setAnswers((prev) => ({ ...prev, sector: event.target.value }))
                }
                className="rounded-2xl border border-white/10 bg-[#0b1110] px-4 py-3 text-sm text-white"
              >
                <option value="">Seleccionar</option>
                <option value="logistica">Logística y distribución</option>
                <option value="industria">Industria</option>
                <option value="comercial">Comercial y retail</option>
                <option value="oficinas">Oficinas corporativas</option>
                <option value="servicios">Servicios críticos</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm text-am-silver">
              Necesidad principal
              <select
                value={answers.mainNeed}
                onChange={(event) =>
                  setAnswers((prev) => ({
                    ...prev,
                    mainNeed: event.target.value,
                  }))
                }
                className="rounded-2xl border border-white/10 bg-[#0b1110] px-4 py-3 text-sm text-white"
              >
                <option value="">Seleccionar</option>
                <option value="vigilancia-fisica">Vigilancia física</option>
                <option value="seguridad-electronica">
                  Seguridad electrónica
                </option>
                <option value="monitoreo">Monitoreo 24/7</option>
                <option value="investigaciones">Investigaciones</option>
                <option value="mixto">Necesidad combinada</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm text-am-silver md:col-span-2">
              Zona o sedes
              <input
                type="text"
                value={answers.location}
                onChange={(event) =>
                  setAnswers((prev) => ({
                    ...prev,
                    location: event.target.value,
                  }))
                }
                placeholder="Ej: CABA + GBA, interior, múltiples sedes"
                className="rounded-2xl border border-white/10 bg-[#0b1110] px-4 py-3 text-sm text-white placeholder:text-am-muted"
              />
            </label>
            <label className="grid gap-2 text-sm text-am-silver">
              Cantidad de sedes
              <select
                value={answers.sites}
                onChange={(event) =>
                  setAnswers((prev) => ({ ...prev, sites: event.target.value }))
                }
                className="rounded-2xl border border-white/10 bg-[#0b1110] px-4 py-3 text-sm text-white"
              >
                <option value="">Seleccionar</option>
                <option value="1">1 sede</option>
                <option value="2-5">2 a 5 sedes</option>
                <option value="6-10">6 a 10 sedes</option>
                <option value="11+">Más de 10 sedes</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm text-am-silver md:col-span-3">
              Urgencia
              <select
                value={answers.urgency}
                onChange={(event) =>
                  setAnswers((prev) => ({
                    ...prev,
                    urgency: event.target.value,
                  }))
                }
                className="rounded-2xl border border-white/10 bg-[#0b1110] px-4 py-3 text-sm text-white"
              >
                <option value="">Seleccionar</option>
                <option value="inmediata">Inmediata (menos de 7 días)</option>
                <option value="corto-plazo">Corto plazo (30 días)</option>
                <option value="planificado">Planificado (60-90 días)</option>
              </select>
            </label>
          </div>
          <div className="grid gap-4 rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:grid-cols-2">
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-am-primaryStrong">
                Paso final
              </p>
              <h3 className="text-xl font-semibold">Enviá el lead a ventas.</h3>
              <p className="text-sm text-am-muted">
                Completá estos datos para que el equipo comercial reciba contexto
                y te contacte rápido.
              </p>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <label className="grid gap-2 text-sm text-am-silver">
                Nombre y apellido
                <input
                  type="text"
                  required
                  value={lead.name}
                  onChange={(event) =>
                    setLead((prev) => ({ ...prev, name: event.target.value }))
                  }
                  className="rounded-2xl border border-white/10 bg-[#0b1110] px-4 py-3 text-sm text-white"
                />
              </label>
              <label className="grid gap-2 text-sm text-am-silver">
                Empresa
                <input
                  type="text"
                  required
                  value={lead.company}
                  onChange={(event) =>
                    setLead((prev) => ({
                      ...prev,
                      company: event.target.value,
                    }))
                  }
                  className="rounded-2xl border border-white/10 bg-[#0b1110] px-4 py-3 text-sm text-white"
                />
              </label>
              <label className="grid gap-2 text-sm text-am-silver">
                WhatsApp
                <input
                  type="tel"
                  required
                  value={lead.whatsapp}
                  onChange={(event) =>
                    setLead((prev) => ({
                      ...prev,
                      whatsapp: event.target.value,
                    }))
                  }
                  className="rounded-2xl border border-white/10 bg-[#0b1110] px-4 py-3 text-sm text-white"
                />
              </label>
              <label className="grid gap-2 text-sm text-am-silver">
                Email comercial
                <input
                  type="email"
                  value={lead.email}
                  onChange={(event) =>
                    setLead((prev) => ({ ...prev, email: event.target.value }))
                  }
                  className="rounded-2xl border border-white/10 bg-[#0b1110] px-4 py-3 text-sm text-white"
                />
              </label>
              <label className="grid gap-2 text-sm text-am-silver md:col-span-2">
                Detalle adicional
                <textarea
                  rows={3}
                  value={lead.detail}
                  onChange={(event) =>
                    setLead((prev) => ({ ...prev, detail: event.target.value }))
                  }
                  className="rounded-2xl border border-white/10 bg-[#0b1110] px-4 py-3 text-sm text-white"
                />
              </label>
            </div>
          </div>
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
              href={whatsappUrl}
              className="inline-flex items-center justify-center rounded-full bg-am-primary px-6 py-3 text-sm font-extrabold uppercase tracking-[0.18em] text-black"
            >
              Enviar por WhatsApp
            </a>
            <a
              href={mailtoUrl}
              className="inline-flex items-center justify-center rounded-full bg-am-primary px-6 py-3 text-sm font-extrabold uppercase tracking-[0.18em] text-black"
            >
              Enviar por email
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
