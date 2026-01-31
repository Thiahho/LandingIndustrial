import { NavBar } from "@/components/NavBar";
import { SectionHeading } from "@/components/SectionHeading";
import { SiteFooter } from "@/components/SiteFooter";
import { mission, values, vision } from "@/lib/site-data";
import { useId, useState } from "react";
import { TimelineHorizontal, type TimelineItem } from "@/components/TimeLineHorizontal";

export default function NosotrosPage() {
  const habilitaciones = [
    {
      title: "Ciudad Autónoma de Buenos Aires",
      detail: "Disposición Nro. DI-2016-47-DGSPR."
    },
    {
      title: "Provincia de Buenos Aires",
      detail: "Resolución Nro. 73778 - 31/01/1993 - OPGSP."
    },
    {
      title: "Provincia de Santa Fe",
      detail: "Resolución Nro. 0050 – 01/08/2013 - DPSP."
    },
    {
      title: "Legítimo Usuario Colectivo",
      detail: "Resolución Nro. 217.506 - ANMaC."
    },
    {
      title: "Prefectura Naval Argentina",
      detail: "Código PBIP inclusive - Registro Matriz N°: 922."
    }
  ];
  const clientes = [
    "Logística y distribución",
    "Retail y comercios",
    "Industria y plantas productivas",
    "Consorcios y barrios cerrados",
    "Instituciones educativas",
    "Entidades públicas"
  ];
   const timeline = [
    {
      year: "1991",
      title: "Nace una nueva historia",
      description:
        "Fue en el barrio de Flores, entre muebles reciclados en una modesta oficina que comenzaba a escribirse esta historia."
    },
    {
      year: "1994",
      title: "Una lechuza para AM",
      description:
        "Surge la lechuza como símbolo de la empresa. Se crea el primer logo. Luego comienzan los ploteos a los primeros móviles y se diseñan los primeros uniformes de vigiladores con el flamante logo de la empresa."
    },
    {
      year: "1998",
      title: "¡Hola Morón!",
      description:
        "Gracias al incesante incremento de la actividad la oficina que vio nacer a la empresa no fue suficiente. Es por ello que se adquiere la propiedad que hasta el día de hoy es sede central."
    },
    {
      year: "2000",
      title: "La tecnología de nuestro lado",
      description:
        "La constante demanda de seguridad por parte de la sociedad, nos hizo pensar en la posibilidad de incorporar la tecnología a lo que mejor sabemos hacer. Es así que nace la “División Electrónica”. La pujante AM ya está preparada para brindar servicios de monitoreo de alarmas, sistemas CCTV y control satelital de vehículos."
    },
    {
      year: "2003",
      title: "Nueva Sucursal",
      description:
        "Se habilita una nueva sucursal, sito en Juana Manso 1661, Ciudad Autónoma de Buenos Aires."
    },
    {
      year: "2008",
      title: "Aires de Incesante Prosperidad",
      description:
        "En estos años AM continuaba en franca expansión; mayor dotación de personal, vehículos y equipos. Gradualmente las empresas multinacionales comenzaron a ver a AM Seguridad como una opción acertada en seguridad. Esto fue el resultado de la transparencia, la prolijidad y la vocación de servicio; principios rectores hasta el presente."
    },
    {
      year: "2011",
      title: "Se suman dos nuevos integrantes",
      description:
        "La creciente dimensión de la actividad tuvo su correlato en las dimensiones físicas de las instalaciones. AM adquiere un nuevo inmueble que lo transforma en base operativa para el servicio de Custodias de Mercaderías. Nace así el CENOP “Central Operativa”. Se habilita una nueva sucursal en la Ciudad de Rosario, lo que posibilitó desplegar el abanico de servicios de seguridad física en toda la provincia de Santa Fe."
    },
    {
      year: "2014",
      title: "ISO 9001",
      description:
        "Logramos la prestigiosa certificación ISO 9001. Esta garantiza la calidad y el consistente desempeño de los servicios que brindamos."
    }
  ];

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
              Un equipo profesional con foco en seguridad física, electrónica e
              investigaciones corporativas. Priorizamos la respuesta inmediata
              y el cumplimiento normativo.
            </p>
          </article>
          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h2 className="text-xl font-semibold">Diferenciales</h2>
            <ul className="mt-2 grid gap-2 text-sm text-am-muted">
              <li>• Respuesta rápida y protocolos auditables.</li>
              <li>• Integración de seguridad física y monitoreo.</li>
              <li>• Equipo entrenado y cobertura 24/7.</li>
              <li>• Tecnología aplicada y autogestión de contenidos.</li>
            </ul>
          </article>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h2 className="text-xl font-semibold">Nuestra historia</h2>
            <p className="mt-2 text-sm text-am-muted">
              Nacimos como empresa de seguridad física y evolucionamos hacia un
              modelo integral con monitoreo remoto, tecnología aplicada y
              equipos especializados para entornos de alta exigencia.
            </p>
          </article>
          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h2 className="text-xl font-semibold">Clientes que confían</h2>
            <ul className="mt-2 grid gap-2 text-sm text-am-muted">
              {clientes.map((cliente) => (
                <li key={cliente}>• {cliente}</li>
              ))}
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
            eyebrow="Línea de tiempo"
            title="Evolución con foco tecnológico y crecimiento sostenido."
            description="Una trayectoria marcada por innovación, nuevas sedes y mejora continua."
            align="left"
          />
          <TimelineHorizontal timeline={timeline} />
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

        <section
          id="habilitaciones"
          className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
        >
          <h2 className="text-xl font-semibold">Habilitaciones</h2>
          <p className="mt-2 text-sm text-am-muted">
            Dirección administrativa: Av. Corrientes 1234, CABA.
          </p>
          <ul className="mt-4 grid gap-2 text-sm text-am-muted">
            {habilitaciones.map((item) => (
              <li key={item.title}>
                <strong className="text-white">{item.title}:</strong>{" "}
                {item.detail}
              </li>
            ))}
          </ul>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {habilitaciones.map((item) => (
              <article
                key={item.title}
                className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-[#0e1716]/95 p-5"
              >
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-am-primaryStrong">
                  Imagen de habilitación
                </p>
                <h3 className="text-base font-semibold text-white">
                  {item.title}
                </h3>
                <p className="text-sm text-am-muted">
                  Disponible para cargar.
                </p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
   );
}
