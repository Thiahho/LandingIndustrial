"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type {
  CompanyMetric,
  NewsItem,
  ResourceItem,
  Service,
  Solution,
  TechnologyItem,
} from "@/lib/types";
import { buildCloudinaryUrl } from "@/lib/cloudinary";

const serviceSlugMap: Record<string, string> = {
  "Central de monitoreo": "monitoreo",
  "Vigilancia física": "vigilancia-fisica",
  "Seguridad electrónica": "seguridad-electronica",
  "Seguridad patrimonial": "seguridad-patrimonial",
  "Investigaciones": "investigaciones",
  "Control de pérdidas": "control-de-perdidas",
};

type CardProps = {
  index: number;
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 }
};

export function ServiceCard({ service, index }: { service: Service } & CardProps) {
  const imageUrl = buildCloudinaryUrl(service.imagePublicId);
  const serviceSlug = serviceSlugMap[service.title] || "monitoreo";

  return (
    <motion.article
      className="group relative min-h-[320px] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-am-surface/95 to-[#0b1211]/95 shadow-glow transition-colors hover:border-am-primary/60"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: index * 0.04 }}
    >
      <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-am-primary/20 blur-3xl" />
      <div className="flex h-full flex-col gap-5 p-6">
        <div className="relative h-36 w-full overflow-hidden rounded-2xl border border-white/10">
          {imageUrl ? (
            <>
              <img
                src={imageUrl}
                alt={service.title}
                className="h-full w-full object-cover opacity-70 transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1211] via-[#0b1211]/30 to-transparent" />
            </>
          ) : (
            <>
              <div className="h-full w-full bg-gradient-to-br from-am-primary/20 via-[#0f1a18] to-[#0b1110]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1211] via-[#0b1211]/30 to-transparent" />
            </>
          )}
        </div>
        <header className="space-y-2">
          <h3 className="text-xl font-semibold">{service.title}</h3>
          <p className="text-sm text-am-muted">{service.description}</p>
        </header>
        <div className="mt-auto flex flex-wrap gap-2">
          {service.items.slice(0, 3).map((item) => (
            <span
              key={item}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-am-silver"
            >
              {item}
            </span>
          ))}
          {service.items.length > 3 && (
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-am-silver">
              +{service.items.length - 3} más
            </span>
          )}
        </div>
        <Link
          href={`/servicios/${serviceSlug}`}
          className="inline-flex items-center justify-center rounded-full bg-am-primary px-4 py-2 text-xs font-extrabold uppercase tracking-[0.18em] text-black transition-transform hover:scale-105"
        >
          Ver servicio completo
        </Link>
      </div>
    </motion.article>
  );
}

export function SolutionCard({ solution, index }: { solution: Solution } & CardProps) {
  return (
    <motion.article
      className="flex h-full flex-col gap-3 rounded-3xl border border-white/10 bg-white/[0.04] p-5"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <span className="inline-flex w-fit rounded-full border border-am-primary/50 bg-am-primary/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-am-primaryStrong">
        {solution.tag}
      </span>
      <h3 className="text-lg font-semibold">{solution.title}</h3>
      <p className="text-sm text-am-muted">{solution.text}</p>
    </motion.article>
  );
}

export function TechnologyCard({ item, index }: { item: TechnologyItem } & CardProps) {
  const imageUrl = buildCloudinaryUrl(item.imagePublicId);
  return (
    <motion.article
      className="flex min-h-[240px] flex-col gap-4 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0f1a18]/95 to-[#0a100f]"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.42, delay: index * 0.05 }}
    >
      {imageUrl ? (
        <div className="relative h-28 w-full">
          <img
            src={imageUrl}
            alt={item.title}
            className="h-full w-full object-cover opacity-70"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b1211] via-[#0b1211]/70 to-transparent" />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="text-lg font-semibold">{item.title}</h3>
        <p className="text-sm text-am-muted">{item.text}</p>
        <span className="mt-auto text-sm font-bold text-am-primaryStrong">{item.meta}</span>
      </div>
    </motion.article>
  );
}

export function CompanyCard({ metric, index }: { metric: CompanyMetric } & CardProps) {
  return (
    <motion.article
      className="flex h-full flex-col gap-2 rounded-3xl border border-white/10 bg-white/[0.04] p-5"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
    >
      <strong className="text-3xl font-extrabold leading-none text-white">{metric.value}</strong>
      <span className="font-semibold text-am-silver">{metric.label}</span>
      <p className="text-sm text-am-muted">{metric.text}</p>
    </motion.article>
  );
}

export function NewsCard({ item, index }: { item: NewsItem } & CardProps) {
  const imageUrl = buildCloudinaryUrl(item.imagePublicId);
  return (
    <motion.article
      className="flex h-full flex-col gap-4 overflow-hidden rounded-3xl border border-white/10 bg-[#0e1716]/95"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
    >
      {imageUrl ? (
        <div className="relative h-32 w-full">
          <img
            src={imageUrl}
            alt={item.title}
            className="h-full w-full object-cover opacity-70"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1514] via-[#0d1514]/60 to-transparent" />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col gap-3 p-6">
        <time className="text-xs font-bold uppercase tracking-[0.24em] text-am-primaryStrong">{item.date}</time>
        <h3 className="text-lg font-semibold">{item.title}</h3>
        <p className="text-sm text-am-muted">{item.text}</p>
      </div>
    </motion.article>
  );
}

export function ResourceCard({ resource, index }: { resource: ResourceItem } & CardProps) {
  return (
    <motion.a
      href={resource.href}
      className="group flex flex-col gap-2 rounded-3xl border border-white/10 bg-white/[0.04] p-5 transition hover:border-am-primary/60"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.38, delay: index * 0.04 }}
    >
      <span className="text-sm font-bold text-am-silver transition group-hover:text-white">{resource.title}</span>
      <p className="text-sm text-am-muted">{resource.description}</p>
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-am-primaryStrong">Abrir recurso</span>
    </motion.a>
  );
}
