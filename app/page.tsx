"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { NavBar } from "@/components/NavBar";
import { SectionHeading } from "@/components/SectionHeading";
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
import type { LandingContent } from "@/lib/types";

type LoadState = "idle" | "loading" | "ready" | "error";

export default function HomePage() {
  const [content, setContent] = useState<LandingContent | null>(null);
  const [state, setState] = useState<LoadState>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

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
  const heroImage = content?.hero.imagePublicId
    ? buildCloudinaryUrl(content.hero.imagePublicId)
    : "";

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
                {content.hero.title}
              </h1>
              <p className="text-lg text-am-silver md:text-xl">
                {content.hero.lead}
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="#servicios"
                  className="inline-flex items-center justify-center rounded-full bg-am-primary px-6 py-3 text-sm font-extrabold uppercase tracking-[0.18em] text-black transition hover:bg-am-primaryStrong"
                >
                  {content.hero.primaryCta}
                </Link>
                <Link
                  href="#servicios"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-am-silver transition hover:border-white/40 hover:text-white"
                >
                  {content.hero.secondaryCta}
                </Link>
                <Link
                  href="#contacto"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-am-silver transition hover:border-am-primary/60 hover:text-white"
                >
                  {content.hero.contactCta}
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
                <h2 className="text-lg font-semibold text-white">
                  {item.title}
                </h2>
                <p className="text-sm text-am-muted">{item.text}</p>
              </article>
            ))}
          </motion.section>
        </div>

        <AnimatedSection id="servicios" className="py-24">
          <div className="mx-auto flex w-[min(1200px,92vw)] flex-col gap-12">
            <SectionHeading
              eyebrow="Servicios"
              title="Cobertura integral con foco operativo."
              description="Todo lo necesario para prevenir, detectar y actuar sin fricción."
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

        <AnimatedSection
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
        </AnimatedSection>

        <AnimatedSection id="tecnologia" className="py-24">
          <div className="mx-auto flex w-[min(1200px,92vw)] flex-col gap-12">
            <SectionHeading
              eyebrow="Tecnología y evolución"
              title="Innovación aplicada a resultados reales."
              description="Mostramos cómo evolucionamos: equipamiento, datos y mejoras operativas."
              align="left"
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
            />
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {content.news.map((item, index) => (
                <NewsCard key={item.id} item={item} index={index} />
              ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection id="trabaja" className="py-24">
          <div className="mx-auto grid w-[min(1200px,92vw)] gap-10 lg:grid-cols-2">
            <div className="space-y-6">
              <SectionHeading
                eyebrow={content.jobs.eyebrow}
                title={content.jobs.title}
                description={content.jobs.text}
                align="left"
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
            </div>
            <form className="space-y-4 rounded-[28px] border border-white/10 bg-gradient-to-br from-[#10201c]/95 to-[#0b1110] p-8 shadow-glow">
              {[
                {
                  id: "job-name",
                  label: "Nombre y apellido",
                  type: "text",
                  placeholder: "Tu nombre",
                },
                {
                  id: "job-email",
                  label: "Email",
                  type: "email",
                  placeholder: "tu@email.com",
                },
              ].map((field) => (
                <label
                  key={field.id}
                  className="grid gap-2 text-sm font-semibold"
                >
                  {field.label}
                  <input
                    id={field.id}
                    name={field.id}
                    type={field.type}
                    placeholder={field.placeholder}
                    className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-am-primary focus:outline-none"
                    required
                  />
                </label>
              ))}

              <label className="grid gap-2 text-sm font-semibold">
                Perfil
                <select className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white focus:border-am-primary focus:outline-none">
                  <option>Seleccioná una opción</option>
                  <option>Vigilador</option>
                  <option>Custodia</option>
                  <option>Técnico electrónico</option>
                  <option>Operador de monitoreo</option>
                  <option>Administrativo</option>
                </select>
              </label>

              <label className="grid gap-2 text-sm font-semibold">
                Mensaje breve
                <textarea
                  rows={4}
                  placeholder="Contanos tu experiencia"
                  className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-am-primary focus:outline-none"
                />
              </label>

              <button
                type="button"
                className="inline-flex w-full items-center justify-center rounded-full bg-am-primary px-6 py-3 text-sm font-extrabold uppercase tracking-[0.18em] text-black transition hover:bg-am-primaryStrong"
              >
                Enviar CV
              </button>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-am-muted">
                Canal exclusivo para postulaciones
              </p>
            </form>
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
              />
              <div className="flex flex-wrap gap-3">
                <a
                  href={content.contact.whatsapp}
                  className="inline-flex items-center justify-center rounded-full bg-am-primary px-6 py-3 text-sm font-extrabold uppercase tracking-[0.18em] text-black transition hover:bg-am-primaryStrong"
                >
                  WhatsApp
                </a>
                <a
                  href={`mailto:${content.contact.commercialEmail}`}
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

      <footer className="border-t border-white/10 bg-[#080f0e] py-10">
        <div className="mx-auto flex w-[min(1200px,92vw)] flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-am-primary to-emerald-900 font-extrabold text-black">
              AM
            </div>
            <div className="grid leading-tight">
              <span className="font-semibold">AM Seguridad</span>
              <span className="text-xs text-am-muted">
                Solidez, tecnología y confianza
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 text-sm font-semibold text-am-silver">
            {(
              [
                { href: "#servicios", label: "Servicios" },
                { href: "#empresa", label: "Empresa" },
                { href: "#productos", label: "Productos" },
                { href: "#novedades", label: "Novedades" },
                { href: "#contacto", label: "Contacto" },
                { href: "/login", label: "Autogestión" },
              ] as const
            ).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full border border-transparent px-4 py-2 hover:border-white/15"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
