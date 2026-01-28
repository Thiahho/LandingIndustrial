"use client";

import { motion } from "framer-motion";
import { CldImage } from "next-cloudinary";
import type { CompanyMetric, NewsItem, ResourceItem, Service, Solution, TechnologyItem } from "@/lib/types";

type CardProps = {
  index: number;
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 }
};

export function ServiceCard({ service, index }: { service: Service } & CardProps) {
  return (
    <motion.article
      className="group relative min-h-[320px] overflow-visible rounded-3xl border border-white/10 bg-gradient-to-br from-am-surface/95 to-[#0b1211]/95 shadow-glow [perspective:1200px]"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: index * 0.04 }}
    >
      <div className="relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        <div className="absolute inset-0 flex h-full w-full flex-col gap-5 overflow-hidden rounded-3xl p-6 [backface-visibility:hidden]">
          <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-am-primary/20 blur-3xl" />
          <div className="relative h-36 w-full overflow-hidden rounded-2xl border border-white/10">
            {service.imagePublicId ? (
              <>
                <CldImage
                  src={service.imagePublicId}
                  width={640}
                  height={240}
                  alt={service.title}
                  crop={{ type: "fill", gravity: "auto" }}
                  className="h-full w-full object-cover opacity-70"
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
        </div>

        <div className="absolute inset-0 flex h-full w-full flex-col gap-4 overflow-hidden rounded-3xl border border-white/5 bg-[#0b1211]/95 p-6 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div className="pointer-events-none absolute -left-20 -top-20 h-48 w-48 rounded-full bg-am-primary/20 blur-3xl" />
          <h3 className="text-lg font-semibold text-white">Detalle operativo</h3>
          <ul className="grid gap-2 text-sm">
            {service.items.map((item) => (
              <li
                key={item}
                className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 font-semibold text-am-silver"
              >
                {item}
              </li>
            ))}
          </ul>
          <span className="mt-auto text-xs font-bold uppercase tracking-[0.2em] text-am-primaryStrong">
            {service.title}
          </span>
        </div>
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
  return (
    <motion.article
      className="flex min-h-[240px] flex-col gap-4 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0f1a18]/95 to-[#0a100f]"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.42, delay: index * 0.05 }}
    >
      {item.imagePublicId ? (
        <div className="relative h-28 w-full">
          <CldImage
            src={item.imagePublicId}
            width={640}
            height={240}
            alt={item.title}
            crop={{ type: "fill", gravity: "auto" }}
            className="h-full w-full object-cover opacity-70"
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
  return (
    <motion.article
      className="flex h-full flex-col gap-4 overflow-hidden rounded-3xl border border-white/10 bg-[#0e1716]/95"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
    >
      {item.imagePublicId ? (
        <div className="relative h-32 w-full">
          <CldImage
            src={item.imagePublicId}
            width={640}
            height={240}
            alt={item.title}
            crop={{ type: "fill", gravity: "auto" }}
            className="h-full w-full object-cover opacity-70"
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
