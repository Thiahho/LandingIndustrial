"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { AnimatedSection } from "@/components/AnimatedSection";
import { NavBar } from "@/components/NavBar";
import { SectionHeading } from "@/components/SectionHeading";
import { SiteFooter } from "@/components/SiteFooter";
import {
  CompanyCard,
  NewsCard,
  ResourceCard,
  ServiceCard,
  SolutionCard,
  TechnologyCard,
} from "@/components/cards";
import { apiClient } from "@/lib/api";
import { buildCloudinaryUrl } from "@/lib/cloudinary";
import { caseStudies, mission, values, vision } from "@/lib/site-data";
import type { LandingContent } from "@/lib/types";

type LoadState = "idle" | "loading" | "ready" | "error";

export default function HomePage() {
  const [content, setContent] = useState<LandingContent | null>(null);
  const [state, setState] = useState<LoadState>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();
  const [quickConfig, setQuickConfig] = useState({
    companyType: "",
    mainNeed: "",
    location: "",
  });

  useEffect(() => {
    const load = async () => {
      setState("loading");
      try {
        const data = await apiClient.getContent();
        console.log("API Response (landing):", data);
        console.log("Services from API:", data.services);
        setContent(data);
        setState("ready");
        setErrorMessage("");
      } catch (error) {
        setState("error");
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "No se pudo conectar con la API.",
        );
      }
    };

    load();
  }, []);

  const heroHighlights = useMemo(
    () => content?.hero.highlights.slice(0, 3) ?? [],
    [content?.hero.highlights],
  );
  const heroTitle =
    "AM Seguridad: Soluciones de seguridad física y electrónica 24/7 en Argentina";
  const heroLead =
    "Seguridad electrónica, monitoreo 24/7, CCTV y control de accesos para empresas, industrias y comercios en todo el país.";
  const heroPrimaryCta = "Hablar por WhatsApp ahora";
  const heroSecondaryCta = "Solicitar evaluación de seguridad";
  const heroContactCta = "Ver servicios disponibles";
  const heroImage = content?.hero.imagePublicId
    ? buildCloudinaryUrl(content.hero.imagePublicId)
    : "";
  const segmentos = [
    {
      id: "personas-hogar",
      title: "Personas y hogar",
      description:
        "Soluciones confiables para viviendas, consorcios y barrios cerrados.",
      bullets: [
        "Monitoreo remoto de cámaras y alarmas.",
        "Cerco eléctrico y control perimetral.",
        "Asistencia inmediata ante incidentes."
      ],
      cta: "Ver opciones para hogares",
      href: "/segmentos/personas-hogar"
    },
    {
      id: "negocios-comercios",
      title: "Negocios y comercios",
      description:
        "Protección operativa para locales, depósitos y cadenas comerciales.",
      bullets: [
        "Aperturas y cierres con seguimiento.",
        "Custodias y rondas preventivas.",
        "CCTV con analítica y reportes."
      ],
      cta: "Ver opciones para comercios",
      href: "/segmentos/negocios-comercios"
    },
    {
      id: "empresa-instituciones",
      title: "Empresa e instituciones",
      description:
        "Estructura profesional para operaciones críticas y alta exposición.",
      bullets: [
        "Vigilancia física y custodia logística.",
        "Seguridad patrimonial y medioambiental.",
        "Investigaciones e informes especiales."
      ],
      cta: "Ver opciones para empresas",
      href: "/segmentos/empresa-instituciones"
    }
  ];
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

  const handleQuickConfigChange = (
    field: "companyType" | "mainNeed" | "location",
    value: string,
  ) => {
    setQuickConfig((prev) => ({ ...prev, [field]: value }));
  };

  const handleQuickConfigSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (quickConfig.companyType) {
      params.set("empresa", quickConfig.companyType);
    }
    if (quickConfig.mainNeed) {
      params.set("necesidad", quickConfig.mainNeed);
    }
    if (quickConfig.location) {
      params.set("zona", quickConfig.location);
    }
    const query = params.toString();
    router.push(`/configurador${query ? `?${query}` : ""}`);
  };

  // Loading state
  if (state === "loading" || state === "idle") {
    return (
      <div className="relative min-h-screen">
        <NavBar />
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="text-center space-y-4">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-am-primary border-t-transparent" />
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-am-muted">
              Cargando contenido...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (state === "error" || !content) {
    return (
      <div className="relative min-h-screen">
        <NavBar />
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="mx-auto max-w-md space-y-4 rounded-[28px] border border-red-500/30 bg-red-500/10 p-8 text-center">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-red-500/20">
              <svg
                className="h-8 w-8 text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-white">Error al cargar</h2>
            <p className="text-sm text-red-300">{errorMessage}</p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center justify-center rounded-full bg-red-500/20 px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-red-300 transition hover:bg-red-500/30"
            >
              Reintentar
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Content loaded successfully
  return (
    <div className="relative">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-am-primary focus:px-4 focus:py-2 focus:font-semibold focus:text-black"
      >
        Saltar al contenido
      </a>

      <NavBar />

      <main id="contenido">
        <section
          id="inicio"
          className="relative overflow-hidden pb-32 pt-28 md:pt-36"
        >
          <div className="pointer-events-none absolute inset-0 -z-20">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-40"
              style={{ backgroundImage: `url(${heroImage})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#07100f]/95 via-[#0b1413]/92 to-[#0b1413]/85" />
            <div className="absolute inset-0 bg-hero-overlay opacity-80" />
            <div className="absolute inset-[-40%] bg-hero-grid bg-[size:64px_64px] opacity-15 [transform:rotate(6deg)]" />
          </div>

          <div className="mx-auto grid w-[min(1200px,92vw)] gap-10">
            <motion.div
              className="max-w-3xl space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <p className="eyebrow">{content.hero.eyebrow}</p>
              <h1 className="text-4xl font-extrabold leading-[1.02] md:text-6xl">
                {heroTitle}
              </h1>
              <p className="text-lg text-am-silver md:text-xl">
                {heroLead}
              </p>

              <div className="flex flex-wrap gap-3">
                <a
                  href={content.contact.whatsapp}
                  title="Hablar por WhatsApp con un asesor"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-am-primary px-6 py-3 text-sm font-extrabold uppercase tracking-[0.18em] text-black transition hover:bg-am-primaryStrong"
                >
                  {heroPrimaryCta}
                </a>
                <Link
                  href="#configurador"
                  title="Solicitar evaluación de seguridad"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-am-silver transition hover:border-white/40 hover:text-white"
                >
                  {heroSecondaryCta}
                </Link>
                <Link
                  href="#servicios"
                  title="Ver servicios de seguridad"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-am-silver transition hover:border-am-primary/60 hover:text-white"
                >
                  {heroContactCta}
                </Link>
              </div>
            </motion.div>

            <div className="grid gap-4 md:grid-cols-3">
              {heroHighlights.map((highlight, index) => (
                <motion.div
                  key={highlight.title}
                  className="glass-panel rounded-3xl p-5"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 + index * 0.07 }}
                >
                  <p className="text-base font-bold text-white">
                    {highlight.title}
                  </p>
                  <p className="text-sm text-am-muted">{highlight.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <div className="mx-auto -mt-20 w-[min(1200px,92vw)]">
          <motion.section
            className="grid gap-4 rounded-[28px] border border-white/10 bg-[#0e1917]/95 p-6 shadow-glow md:grid-cols-3 md:p-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            aria-label="Confianza y cumplimiento"
          >
            {[
              {
                title: "Habilitados y auditables",
                text: "Operamos bajo normativa vigente, procesos verificables y protocolos trazables.",
              },
              {
                title: "Respuesta inmediata",
                text: "Protocolos claros para incidentes, prevención activa y coordinación con recursos en campo.",
              },
              {
                title: "Visibilidad total",
                text: "Información útil para decidir rápido y con respaldo operativo, técnico y documental.",
              },
            ].map((item) => (
              <article
                key={item.title}
                className="space-y-2 rounded-3xl border border-white/5 bg-white/[0.03] p-5"
              >
                <h3 className="text-lg font-semibold text-white">
                  {item.title}
                </h3>
                <p className="text-sm text-am-muted">{item.text}</p>
              </article>
            ))}
          </motion.section>
        </div>

        <AnimatedSection id="configurador" className="py-24">
  <div className="mx-auto flex w-[min(1200px,92vw)] flex-col gap-10">
    <SectionHeading
      eyebrow="Configurador"
      title="Configurá tu solución en minutos."
      description="Respondé 2 o 3 preguntas rápidas y te llevamos al configurador completo."
      align="left"
      as="h2"
    />

    <form
      onSubmit={handleQuickConfigSubmit}
      // CAMBIO: grid-cols fluido con alineación vertical centrada (items-center)
      className="grid gap-6 rounded-[28px] border border-white/10 bg-[#0e1716]/95 p-6 lg:grid-cols-[1fr_320px] lg:items-center"
    >
      {/* SECCIÓN DE INPUTS */}
      {/* CAMBIO: Eliminado anchos fijos, ahora es un grid de 3 columnas iguales */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 w-full">
        
        <label className="grid gap-2 text-sm text-am-silver w-full">
          Tipo de empresa
          <select
            className="w-full rounded-2xl border border-white/10 bg-[#0b1110] px-4 py-2 text-sm text-white focus:border-am-primary focus:outline-none focus:ring-1 focus:ring-am-primary"
            value={quickConfig.companyType}
            onChange={(event) =>
              handleQuickConfigChange("companyType", event.target.value)
            }
          >
            <option value="">Seleccionar</option>
            <option value="industria">Industria</option>
            <option value="logistica">Logística</option>
            <option value="retail">Retail</option>
            <option value="oficinas">Oficinas</option>
            <option value="otros">Otro</option>
          </select>
        </label>

        <label className="grid gap-2 text-sm text-am-silver w-full">
          Necesidad principal
          <select
            value={quickConfig.mainNeed}
            onChange={(event) =>
              handleQuickConfigChange("mainNeed", event.target.value)
            }
            // CAMBIO: py-2 para reducir altura
            className="w-full rounded-2xl border border-white/10 bg-[#0b1110] px-4 py-2 text-sm text-white focus:border-am-primary focus:outline-none focus:ring-1 focus:ring-am-primary"
          >
            <option value="">Seleccionar</option>
            <option value="vigilancia-fisica">Vigilancia física</option>
            <option value="seguridad-electronica">Seguridad electrónica</option>
            <option value="monitoreo">Monitoreo 24/7</option>
            <option value="investigaciones">Investigaciones</option>
            <option value="mixto">Necesidad combinada</option>
          </select>
        </label>

        <label className="grid gap-2 text-sm text-am-silver w-full">
          Zona o sedes
          <input
            type="text"
            value={quickConfig.location}
            onChange={(event) =>
              handleQuickConfigChange("location", event.target.value)
            }
            placeholder="Ej: CABA, GBA"
            // CAMBIO: py-2 para reducir altura
            className="w-full rounded-2xl border border-white/10 bg-[#0b1110] px-4 py-2 text-sm text-white placeholder:text-am-muted focus:border-am-primary focus:outline-none focus:ring-1 focus:ring-am-primary"
          />
        </label>
      </div>

      {/* SECCIÓN CAJA DE ACCIÓN (Derecha) */}
      <div className="flex flex-col justify-between gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-5 h-full">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-am-primaryStrong">
              Paso 1 de 2
            </p>
          </div>
          <h3 className="text-base font-semibold text-white leading-tight">
            Seguimos con el configurador completo
          </h3>
          <p className="text-xs text-am-muted leading-relaxed">
            Pedimos más datos y generamos la recomendación personalizada.
          </p>
        </div>
        <button
          type="submit"
          className="inline-flex w-full items-center justify-center rounded-full bg-am-primary px-6 py-2.5 text-sm font-extrabold uppercase tracking-[0.18em] text-black transition hover:bg-am-primaryStrong"
        >
          Continuar
        </button>
      </div>
    </form>
  </div>
</AnimatedSection>
        <AnimatedSection id="servicios" className="py-24">
          <div className="mx-auto flex w-[min(1200px,92vw)] flex-col gap-12">
            <SectionHeading
              eyebrow="Servicios"
              title="Servicios claros, directos y diferenciados."
              description="Seguridad física y electrónica con alcance nacional."
              as="h2"
            />
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {content.services.map((service, index) => (
                <ServiceCard
                  key={service.title}
                  service={service}
                  index={index}
                />
              ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection id="segmentos" className="py-24">
          <div className="mx-auto flex w-[min(1200px,92vw)] flex-col gap-12">
            <SectionHeading
              eyebrow="Segmentos"
              title="Soluciones pensadas para cada tipo de cliente."
              description="Elegí el enfoque según tu contexto operativo."
              align="left"
              as="h2"
            />
            <div className="grid gap-6 lg:grid-cols-3">
              {segmentos.map((segmento) => (
                <article
                  key={segmento.id}
                  id={segmento.id}
                  className="flex h-full flex-col gap-4 rounded-3xl border border-white/10 bg-[#0e1716]/95 p-6"
                >
                  <div>
                    <h3 className="text-xl font-semibold">{segmento.title}</h3>
                    <p className="mt-2 text-sm text-am-muted">
                      {segmento.description}
                    </p>
                  </div>
                  <ul className="grid gap-2 text-sm text-am-silver">
                    {segmento.bullets.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                  <Link
                    href={segmento.href}
                    title={segmento.cta}
                    className="mt-auto inline-flex w-fit items-center justify-center rounded-full border border-white/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-am-silver transition hover:border-am-primary hover:text-white"
                  >
                    {segmento.cta}
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* <AnimatedSection
          id="soluciones"
          className="border-y border-white/10 bg-[#0d1716]/85 py-24"
        >
          <div className="mx-auto grid w-[min(1200px,92vw)] items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <div className="space-y-6">
              <SectionHeading
                eyebrow={content.guidance.eyebrow}
                title={content.guidance.title}
                description={content.guidance.text}
                align="left"
                as="h2"
                actions={
                  <div className="flex flex-wrap gap-2">
                    {content.guidance.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-am-silver"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                }
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {content.solutions.map((solution, index) => (
                <SolutionCard
                  key={`${solution.tag}-${solution.title}`}
                  solution={solution}
                  index={index}
                />
              ))}
            </div>
          </div>
        </AnimatedSection> */}

        <AnimatedSection id="casos-reales" className="py-24">
          <div className="mx-auto flex w-[min(1200px,92vw)] flex-col gap-12">
            <SectionHeading
              eyebrow="Casos reales"
              title="Resultados comprobables en operaciones reales."
              description="Implementaciones con foco en seguridad empresarial, continuidad operativa y respuesta rápida."
              as="h2"
            />
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {caseStudies.map((item) => (
                <article
                  key={item.slug}
                  className="flex h-full flex-col gap-4 overflow-hidden rounded-3xl border border-white/10 bg-[#0e1716]/95"
                >
                  <div className="relative h-36 w-full overflow-hidden">
                    <img
                      src={buildCloudinaryUrl(item.image)}
                      alt={item.title}
                      className="h-full w-full object-cover opacity-80"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d1514] via-[#0d1514]/60 to-transparent" />
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-am-primaryStrong">
                      {item.sector}
                    </p>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-sm text-am-muted">{item.summary}</p>
                    <span className="mt-auto text-sm font-semibold text-am-silver">
                      {item.result}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection id="tecnologia" className="py-24">
          <div className="mx-auto flex w-[min(1200px,92vw)] flex-col gap-12">
            <SectionHeading
              eyebrow="Tecnología y evolución"
              title="Innovación aplicada a resultados reales."
              description="Mostramos cómo evolucionamos: equipamiento, datos y mejoras operativas."
              align="left"
              as="h2"
            />
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {content.technology.map((item, index) => (
                <TechnologyCard key={item.title} item={item} index={index} />
              ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection id="productos" className="py-24">
          <div className="mx-auto flex w-[min(1200px,92vw)] flex-col gap-12">
            <SectionHeading
              eyebrow="Productos tecnológicos"
              title="Equipamiento confiable, listo para operar."
              description="Seleccionamos recursos tecnológicos que sostienen continuidad operativa y control total."
              align="left"
              as="h3"
            />
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {content.products.map((item, index) => (
                <TechnologyCard
                  key={`${item.name}-${index}`}
                  item={{
                    title: item.name,
                    text: item.description,
                    meta: item.category,
                    imagePublicId: item.imagePublicId,
                  }}
                  index={index}
                />
              ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection
          id="empresa"
          className="bg-gradient-to-br from-am-primary/10 via-transparent to-transparent py-24"
        >
          <div className="mx-auto flex w-[min(1200px,92vw)] flex-col gap-12">
            <SectionHeading
              eyebrow="Empresa y solidez"
              title="Estructura profesional para operar en serio."
              description="Combinamos experiencia, habilitaciones, recursos y metodología para proteger personas, activos y operaciones."
              align="left"
              as="h2"
            />
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {content.company.map((metric, index) => (
                <CompanyCard
                  key={`${metric.value}-${metric.label}`}
                  metric={metric}
                  index={index}
                />
              ))}
            </div>
            <div className="grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
              <div className="rounded-3xl border border-white/10 bg-[#0e1716]/95 p-6">
                <h3 className="text-lg font-semibold text-white">
                  Habilitaciones vigentes
                </h3>
                <p className="mt-2 text-sm text-am-muted">
                  Dirección administrativa: Av. Corrientes 1234, CABA.
                </p>
                <ul className="mt-4 grid gap-3 text-sm text-am-silver">
                  {habilitaciones.map((item) => (
                    <li key={item.title}>
                      <strong className="text-white">{item.title}:</strong>{" "}
                      {item.detail}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {habilitaciones.slice(0, 4).map((item) => (
                  <article
                    key={item.title}
                    className="flex flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.04] p-5"
                  >
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-am-primaryStrong">
                      Documento
                    </p>
                    <h4 className="text-lg font-semibold text-white">
                      {item.title}
                    </h4>
                    <p className="text-sm text-am-muted">
                      Imagen disponible para cargar.
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection id="nosotros" className="py-24">
          <div className="mx-auto flex w-[min(1200px,92vw)] flex-col gap-12">
            <SectionHeading
              eyebrow="Nosotros"
              title="Misión, visión y valores que guían cada operación."
              description="Operamos con foco en el cliente, cumplimiento real y mejora continua en cada servicio."
              as="h3"
            />
            <div className="grid gap-6 lg:grid-cols-2">
              <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                <h3 className="text-lg font-semibold text-white">Misión</h3>
                <p className="mt-2 text-sm text-am-muted">{mission}</p>
              </article>
              <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                <h3 className="text-lg font-semibold text-white">Visión</h3>
                <p className="mt-2 text-sm text-am-muted">{vision}</p>
              </article>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {values.map((value) => (
                <article
                  key={value.title}
                  className="rounded-3xl border border-white/10 bg-[#0e1716]/95 p-5"
                >
                  <h4 className="text-base font-semibold text-white">
                    {value.title}
                  </h4>
                  <p className="mt-2 text-sm text-am-muted">{value.text}</p>
                </article>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection
          id="novedades"
          className="border-y border-white/10 bg-[#0c1514]/90 py-24"
        >
          <div className="mx-auto flex w-[min(1200px,92vw)] flex-col gap-12">
            <SectionHeading
              eyebrow="Novedades"
              title="Actividad constante, mejoras continuas."
              description="Señales claras de una empresa activa, presente y en crecimiento."
              as="h3"
            />
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {content.news.map((item, index) => (
                <NewsCard key={item.id} item={item} index={index} />
              ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection id="trabaja" className="py-24">
          <div className="mx-auto grid w-[min(1200px,92vw)] gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <div className="space-y-6">
            <SectionHeading
              eyebrow={content.jobs.eyebrow}
              title={content.jobs.title}
              description={content.jobs.text}
              align="left"
              as="h3"
            />
              <ul className="grid gap-2 text-sm">
                {content.jobs.points.map((point) => (
                  <li
                    key={point}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 font-semibold text-am-silver"
                  >
                    {point}
                  </li>
                ))}
              </ul>
              <div className="text-sm text-am-muted">
                <p>
                  Teléfono: <span className="text-white">(011) 5671-4600</span>
                </p>
                <p>
                  Email RR.HH.:{" "}
                  <a
                    href="mailto:incorporaciones@amseguridad.com.ar"
                    title="Enviar email a Recursos Humanos"
                    className="text-am-primaryStrong"
                  >
                    incorporaciones@amseguridad.com.ar
                  </a>
                </p>
              </div>
            </div>
            <div className="flex h-full flex-col justify-between gap-6 rounded-[28px] border border-white/10 bg-gradient-to-br from-[#10201c]/95 to-[#0b1110] p-8 shadow-glow">
              <div className="space-y-3">
                <p className="eyebrow">Postulaciones</p>
                <h3 className="text-2xl font-semibold">
                  Cargá tu CV en minutos.
                </h3>
                <p className="text-sm text-am-muted">
                  Formulario completo con datos personales y adjunto de CV.
                </p>
              </div>
              <Link
                href="/trabaja"
                title="Ir al formulario de postulaciones"
                className="inline-flex items-center justify-center rounded-full bg-am-primary px-6 py-3 text-sm font-extrabold uppercase tracking-[0.18em] text-black transition hover:bg-am-primaryStrong"
              >
                Ir al formulario
              </Link>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection id="contacto" className="pb-28 pt-10">
          <div className="mx-auto grid w-[min(1200px,92vw)] gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <motion.article
              className="flex h-full flex-col gap-6 rounded-[28px] border border-white/10 bg-gradient-to-br from-am-primary/20 via-[#0b1412] to-[#0b1110] p-8 shadow-glow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55 }}
            >
              <SectionHeading
                eyebrow={content.contact.eyebrow}
                title={content.contact.title}
                description={content.contact.text}
                align="left"
                as="h2"
              />
              <div className="flex flex-wrap gap-3">
                <a
                  href={content.contact.whatsapp}
                  title="Contactar por WhatsApp"
                  className="inline-flex items-center justify-center rounded-full bg-am-primary px-6 py-3 text-sm font-extrabold uppercase tracking-[0.18em] text-black transition hover:bg-am-primaryStrong"
                >
                  WhatsApp
                </a>
                <a
                  href={`mailto:${content.contact.commercialEmail}`}
                  title="Enviar email al equipo comercial"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-am-silver transition hover:border-white/40 hover:text-white"
                >
                  Contacto comercial
                </a>
              </div>
              <ul className="grid gap-2 text-sm text-am-silver">
                {content.contact.channels.map((channel) => (
                  <li key={channel.label}>
                    <strong className="text-white">{channel.label}:</strong>{" "}
                    {channel.value}
                  </li>
                ))}
              </ul>
            </motion.article>

            <motion.aside
              className="flex h-full flex-col gap-5 rounded-[28px] border border-white/10 bg-[#0e1716]/95 p-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: 0.08 }}
            >
              <div className="space-y-2">
                <p className="eyebrow">Recursos</p>
                <h3 className="text-2xl font-semibold">
                  Material listo para compartir
                </h3>
                <p className="text-sm text-am-muted">
                  Descargá una carta de presentación y conocé la estructura
                  operativa.
                </p>
              </div>
              <div className="grid gap-3">
                {content.contact.resources.map((resource, index) => (
                  <ResourceCard
                    key={resource.id}
                    resource={resource}
                    index={index}
                  />
                ))}
              </div>
              <div className="rounded-3xl border border-am-primary/40 bg-am-primary/15 p-4 text-sm">
                <p className="font-bold uppercase tracking-[0.2em] text-am-primaryStrong">
                  Medición activa
                </p>
                <p className="text-am-silver">
                  El sitio está preparado para integrar analítica, campañas y
                  trazabilidad comercial.
                </p>
              </div>
            </motion.aside>
          </div>
        </AnimatedSection>
      </main>

      <SiteFooter />
    </div>
  );
}
