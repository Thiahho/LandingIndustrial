"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Protected } from "@/components/auth/Protected";
import { UserBadge } from "@/components/auth/UserBadge";
import { ImageUrlField } from "@/components/admin/ImageUrlField";
import { permissionsByRole } from "@/lib/auth/permissions";
import { apiClient } from "@/lib/api";
import { defaultContent } from "@/lib/defaultContent";
import type {
  ContactChannel,
  HeroHighlight,
  LandingContent,
  NewsItem,
  ProductItem,
  ResourceItem,
  Service,
  TechnologyItem
} from "@/lib/types";

type Notice = { type: "success" | "warning" | "error"; text: string } | null;

function uid(prefix: string) {
  return `${prefix}-${globalThis.crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2, 10)}`;
}

export default function AdminPage() {
  const [content, setContent] = useState<LandingContent>(defaultContent);
  const [notice, setNotice] = useState<Notice>({
    type: "warning",
    text: "Cargando contenido…"
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await apiClient.getContent();
        setContent(data);
        setNotice({ type: "success", text: "Contenido cargado desde la API." });
      } catch (error) {
        setContent(defaultContent);
        setNotice({
          type: "warning",
          text:
            error instanceof Error
              ? `${error.message} · usando contenido por defecto local.`
              : "No se pudo conectar con la API · usando contenido por defecto local."
        });
      }
    };

    load();
  }, []);

  const stats = useMemo(
    () => ({
      servicios: content.services.length,
      novedades: content.news.length,
      recursos: content.contact.resources.length
    }),
    [content.services.length, content.news.length, content.contact.resources.length]
  );

  const navItems = [
    { id: "dashboard", label: "Dashboard" },
    { id: "hero", label: "Hero" },
    { id: "servicios", label: "Servicios" },
    { id: "productos", label: "Productos" },
    { id: "tecnologia", label: "Tecnología" },
    { id: "novedades", label: "Novedades" },
    { id: "contacto", label: "Contacto" },
    { id: "permisos", label: "Permisos" },
    { id: "publicacion", label: "Publicación" }
  ];

  const updateHero = (patch: Partial<LandingContent["hero"]>) =>
    setContent((prev) => ({ ...prev, hero: { ...prev.hero, ...patch } }));

  const updateHeroHighlight = (index: number, patch: Partial<HeroHighlight>) =>
    setContent((prev) => {
      const highlights = prev.hero.highlights.map((item, idx) => (idx === index ? { ...item, ...patch } : item));
      return { ...prev, hero: { ...prev.hero, highlights } };
    });

  const addHeroHighlight = () =>
    setContent((prev) => ({
      ...prev,
      hero: {
        ...prev.hero,
        highlights: [...prev.hero.highlights, { title: "Nuevo diferencial", text: "Descripción breve." }]
      }
    }));

  const removeHeroHighlight = (index: number) =>
    setContent((prev) => ({
      ...prev,
      hero: {
        ...prev.hero,
        highlights: prev.hero.highlights.filter((_, idx) => idx !== index)
      }
    }));

  const updateService = (index: number, patch: Partial<Service>) =>
    setContent((prev) => ({
      ...prev,
      services: prev.services.map((service, idx) => (idx === index ? { ...service, ...patch } : service))
    }));

  const updateServiceItem = (serviceIndex: number, itemIndex: number, value: string) =>
    setContent((prev) => ({
      ...prev,
      services: prev.services.map((service, idx) => {
        if (idx !== serviceIndex) return service;
        const items = service.items.map((item, i) => (i === itemIndex ? value : item));
        return { ...service, items };
      })
    }));

  const addService = () =>
    setContent((prev) => ({
      ...prev,
      services: [
        ...prev.services,
        {
          title: "Nuevo servicio",
          description: "Descripción breve del servicio.",
          items: ["Ítem 1", "Ítem 2"]
        }
      ]
    }));

  const removeService = (index: number) =>
    setContent((prev) => ({
      ...prev,
      services: prev.services.filter((_, idx) => idx !== index)
    }));

  const addServiceItem = (serviceIndex: number) =>
    setContent((prev) => ({
      ...prev,
      services: prev.services.map((service, idx) =>
        idx === serviceIndex ? { ...service, items: [...service.items, "Nuevo ítem"] } : service
      )
    }));

  const removeServiceItem = (serviceIndex: number, itemIndex: number) =>
    setContent((prev) => ({
      ...prev,
      services: prev.services.map((service, idx) => {
        if (idx !== serviceIndex) return service;
        return { ...service, items: service.items.filter((_, i) => i !== itemIndex) };
      })
    }));

  const updateTechnology = (index: number, patch: Partial<TechnologyItem>) =>
    setContent((prev) => ({
      ...prev,
      technology: prev.technology.map((item, idx) => (idx === index ? { ...item, ...patch } : item))
    }));

  const updateProduct = (index: number, patch: Partial<ProductItem>) =>
    setContent((prev) => ({
      ...prev,
      products: prev.products.map((item, idx) => (idx === index ? { ...item, ...patch } : item))
    }));

  const addTechnology = () =>
    setContent((prev) => ({
      ...prev,
      technology: [
        ...prev.technology,
        {
          title: "Nuevo diferencial tecnológico",
          text: "Detalle breve de la capacidad tecnológica.",
          meta: "Meta",
          imageUrl: ""
        }
      ]
    }));

  const addProduct = () =>
    setContent((prev) => ({
      ...prev,
      products: [
        ...prev.products,
        {
          name: "Nuevo producto tecnológico",
          category: "Categoría",
          description: "Descripción breve del producto.",
          imageUrl: ""
        }
      ]
    }));

  const removeTechnology = (index: number) =>
    setContent((prev) => ({
      ...prev,
      technology: prev.technology.filter((_, idx) => idx !== index)
    }));

  const removeProduct = (index: number) =>
    setContent((prev) => ({
      ...prev,
      products: prev.products.filter((_, idx) => idx !== index)
    }));

  const updateNews = (index: number, patch: Partial<NewsItem>) =>
    setContent((prev) => ({
      ...prev,
      news: prev.news.map((item, idx) => (idx === index ? { ...item, ...patch } : item))
    }));

  const addNews = () =>
    setContent((prev) => ({
      ...prev,
      news: [
        {
          id: uid("news"),
          date: "Categoría",
          title: "Nueva novedad",
          text: "Texto breve de la novedad.",
          imageUrl: ""
        },
        ...prev.news
      ]
    }));

  const removeNews = (index: number) =>
    setContent((prev) => ({
      ...prev,
      news: prev.news.filter((_, idx) => idx !== index)
    }));

  const updateChannel = (index: number, patch: Partial<ContactChannel>) =>
    setContent((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        channels: prev.contact.channels.map((channel, idx) => (idx === index ? { ...channel, ...patch } : channel))
      }
    }));

  const addChannel = () =>
    setContent((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        channels: [...prev.contact.channels, { label: "Canal", value: "valor@amseguridad.com.ar" }]
      }
    }));

  const removeChannel = (index: number) =>
    setContent((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        channels: prev.contact.channels.filter((_, idx) => idx !== index)
      }
    }));

  const updateResource = (index: number, patch: Partial<ResourceItem>) =>
    setContent((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        resources: prev.contact.resources.map((resource, idx) => (idx === index ? { ...resource, ...patch } : resource))
      }
    }));

  const addResource = () =>
    setContent((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        resources: [
          {
            id: uid("resource"),
            title: "Nuevo recurso",
            href: "#",
            description: "Descripción breve del recurso."
          },
          ...prev.contact.resources
        ]
      }
    }));

  const removeResource = (index: number) =>
    setContent((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        resources: prev.contact.resources.filter((_, idx) => idx !== index)
      }
    }));

  const save = async () => {
    setSaving(true);
    setNotice({ type: "warning", text: "Guardando cambios..." });
    try {
      const saved = await apiClient.saveContent(content);
      setContent(saved);
      setNotice({ type: "success", text: "Cambios guardados correctamente en la API." });
    } catch (error) {
      setNotice({
        type: "error",
        text:
          error instanceof Error
            ? `${error.message} - no se pudo persistir en la API.`
            : "No se pudo persistir en la API."
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Protected allowedRoles={["admin", "empleado"]}>
      {(user) => (
        <div className="min-h-screen bg-am-bg pb-16 text-am-text">
          <header className="border-b border-white/10 bg-[#0b1110]/90 backdrop-blur">
            <div className="mx-auto flex w-[min(1200px,92vw)] flex-col gap-4 py-6 md:flex-row md:items-center md:justify-between">
              <div className="space-y-1">
                <p className="eyebrow">Panel interno</p>
                <h1 className="text-3xl font-bold">Autogestión AM Seguridad</h1>
                <p className="text-sm text-am-muted">Editá textos, imágenes, novedades y recursos sin depender del proveedor.</p>
              </div>
              <div className="flex flex-col gap-2">
                <UserBadge user={user} />
                <div className="flex flex-wrap gap-2 text-xs font-bold uppercase tracking-[0.24em] text-am-silver">
                  <span className="rounded-full border border-white/10 px-4 py-2">Servicios: {stats.servicios}</span>
                  <span className="rounded-full border border-white/10 px-4 py-2">Novedades: {stats.novedades}</span>
                  <span className="rounded-full border border-white/10 px-4 py-2">Recursos: {stats.recursos}</span>
                </div>
              </div>
            </div>
          </header>

          {notice ? (
            <div
              className={`border-b py-3 text-center text-xs font-bold uppercase tracking-[0.3em] ${
                notice.type === "success"
                  ? "border-emerald-400/30 bg-emerald-500/10 text-emerald-300"
                  : notice.type === "error"
                    ? "border-red-400/30 bg-red-500/10 text-red-300"
                    : "border-amber-400/30 bg-amber-500/10 text-amber-300"
              }`}
            >
              {notice.text}
            </div>
          ) : null}

          <div className="mx-auto grid w-[min(1200px,92vw)] gap-6 pt-8 lg:grid-cols-[240px_1fr]">
            <aside className="sticky top-24 hidden h-fit rounded-[28px] border border-white/10 bg-[#0f1a18]/80 p-6 lg:block">
              <div className="space-y-3">
                <p className="eyebrow">Módulos</p>
                <nav className="grid gap-2 text-sm font-semibold text-am-silver">
                  {navItems.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="rounded-2xl border border-transparent px-3 py-2 transition hover:border-white/10 hover:bg-white/[0.04] hover:text-white"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            <main className="grid gap-10">
              <section id="dashboard" className="grid gap-6 rounded-[28px] border border-white/10 bg-[#0f1a18]/80 p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="eyebrow">Dashboard</p>
                    <h2 className="text-2xl font-semibold">Resumen operativo</h2>
                    <p className="text-sm text-am-muted">Accesos rápidos y estado del contenido.</p>
                  </div>
                  <Link
                    href="/"
                    className="rounded-full border border-white/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-am-silver"
                  >
                    Ver landing
                  </Link>
                </div>

                <div className="grid gap-3 md:grid-cols-3">
                  {[
                    { label: "Servicios", value: stats.servicios },
                    { label: "Novedades", value: stats.novedades },
                    { label: "Recursos", value: stats.recursos }
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-am-silver"
                    >
                      <span className="block text-xs uppercase tracking-[0.2em] text-am-muted">{item.label}</span>
                      <span className="text-2xl font-bold text-white">{item.value}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 lg:hidden">
                  {navItems.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="rounded-full border border-white/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.2em] text-am-silver transition hover:border-am-primary/60 hover:text-white"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </section>

              <section id="hero" className="grid gap-6 rounded-[28px] border border-white/10 bg-[#0f1a18]/80 p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="eyebrow">Hero</p>
                    <h2 className="text-2xl font-semibold">Mensaje principal e imagen</h2>
                  </div>
                  <Link
                    href="/"
                    className="rounded-full border border-white/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-am-silver"
                  >
                    Ver landing
                  </Link>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {[
                    { label: "Eyebrow", value: content.hero.eyebrow, key: "eyebrow" as const },
                    { label: "Título", value: content.hero.title, key: "title" as const },
                    { label: "Bajada", value: content.hero.lead, key: "lead" as const },
                    { label: "CTA físico", value: content.hero.primaryCta, key: "primaryCta" as const },
                    { label: "CTA electrónico", value: content.hero.secondaryCta, key: "secondaryCta" as const },
                    { label: "CTA contacto", value: content.hero.contactCta, key: "contactCta" as const },
                    { label: "URL imagen hero", value: content.hero.imageUrl, key: "imageUrl" as const }
                  ].map((field) =>
                    field.key === "imageUrl" ? (
                      <ImageUrlField
                        key={field.key}
                        label={field.label}
                        value={field.value}
                        onChange={(value) => updateHero({ [field.key]: value })}
                        helper="Subí la imagen en Cloudinary; se convertirá a WebP automáticamente."
                      />
                    ) : (
                      <label key={field.key} className="grid gap-2 text-sm font-semibold">
                        {field.label}
                        <input
                          value={field.value}
                          onChange={(event) => updateHero({ [field.key]: event.target.value })}
                          className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white focus:border-am-primary focus:outline-none"
                        />
                      </label>
                    )
                  )}
                </div>

                <div className="grid gap-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Diferenciales</h3>
                    <button
                      type="button"
                      onClick={addHeroHighlight}
                      className="rounded-full border border-white/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-am-silver"
                    >
                      Agregar
                    </button>
                  </div>

                  <div className="grid gap-3 md:grid-cols-3">
                    {content.hero.highlights.map((highlight, index) => (
                      <div
                        key={`${highlight.title}-${index}`}
                        className="grid gap-2 rounded-3xl border border-white/10 bg-black/20 p-4"
                      >
                        <label className="grid gap-1 text-xs font-bold uppercase tracking-[0.2em] text-am-muted">
                          Título
                          <input
                            value={highlight.title}
                            onChange={(event) => updateHeroHighlight(index, { title: event.target.value })}
                            className="rounded-2xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white focus:border-am-primary focus:outline-none"
                          />
                        </label>

                        <label className="grid gap-1 text-xs font-bold uppercase tracking-[0.2em] text-am-muted">
                          Texto
                          <textarea
                            rows={3}
                            value={highlight.text}
                            onChange={(event) => updateHeroHighlight(index, { text: event.target.value })}
                            className="rounded-2xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white focus:border-am-primary focus:outline-none"
                          />
                        </label>

                        <button
                          type="button"
                          onClick={() => removeHeroHighlight(index)}
                          className="rounded-full border border-red-400/40 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-red-300"
                        >
                          Quitar
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section id="servicios" className="grid gap-6 rounded-[28px] border border-white/10 bg-[#0d1716]/80 p-6">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="eyebrow">Servicios</p>
                    <h2 className="text-2xl font-semibold">Cobertura y detalle operativo</h2>
                  </div>
                  <button
                    type="button"
                    onClick={addService}
                    className="rounded-full border border-white/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-am-silver"
                  >
                    Agregar servicio
                  </button>
                </div>

                <div className="grid gap-4">
                  {content.services.map((service, serviceIndex) => (
                    <article
                      key={`${service.title}-${serviceIndex}`}
                      className="grid gap-3 rounded-3xl border border-white/10 bg-black/20 p-5"
                    >
                      <div className="grid gap-3 md:grid-cols-2">
                        <label className="grid gap-1 text-xs font-bold uppercase tracking-[0.2em] text-am-muted">
                          Título
                          <input
                            value={service.title}
                            onChange={(event) => updateService(serviceIndex, { title: event.target.value })}
                            className="rounded-2xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white focus:border-am-primary focus:outline-none"
                          />
                        </label>

                        <label className="grid gap-1 text-xs font-bold uppercase tracking-[0.2em] text-am-muted">
                          Descripción
                          <input
                            value={service.description}
                            onChange={(event) => updateService(serviceIndex, { description: event.target.value })}
                            className="rounded-2xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white focus:border-am-primary focus:outline-none"
                          />
                        </label>
                      </div>

                      <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-am-silver">Ítems del servicio</h3>
                          <button
                            type="button"
                            onClick={() => addServiceItem(serviceIndex)}
                            className="rounded-full border border-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-am-silver"
                          >
                            Agregar ítem
                          </button>
                        </div>

                        <div className="grid gap-2 md:grid-cols-2">
                          {service.items.map((item, itemIndex) => (
                            <div key={`${item}-${itemIndex}`} className="flex items-center gap-2">
                              <input
                                value={item}
                                onChange={(event) => updateServiceItem(serviceIndex, itemIndex, event.target.value)}
                                className="w-full rounded-2xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white focus:border-am-primary focus:outline-none"
                              />
                              <button
                                type="button"
                                onClick={() => removeServiceItem(serviceIndex, itemIndex)}
                                className="rounded-full border border-red-400/40 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-red-300"
                              >
                                Quitar
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => removeService(serviceIndex)}
                          className="rounded-full border border-red-400/40 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-red-300"
                        >
                          Eliminar servicio
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <section id="productos" className="grid gap-6 rounded-[28px] border border-white/10 bg-[#0c1514]/80 p-6">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="eyebrow">Productos tecnológicos</p>
                    <h2 className="text-2xl font-semibold">Catálogo interno y recursos disponibles</h2>
                  </div>
                  <button
                    type="button"
                    onClick={addProduct}
                    className="rounded-full border border-white/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-am-silver"
                  >
                    Agregar producto
                  </button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {content.products.map((item, index) => (
                    <article
                      key={`${item.name}-${index}`}
                      className="grid gap-2 rounded-3xl border border-white/10 bg-black/20 p-5"
                    >
                      <label className="grid gap-1 text-xs font-bold uppercase tracking-[0.2em] text-am-muted">
                        Nombre
                        <input
                          value={item.name}
                          onChange={(event) => updateProduct(index, { name: event.target.value })}
                          className="rounded-2xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white focus:border-am-primary focus:outline-none"
                        />
                      </label>

                      <label className="grid gap-1 text-xs font-bold uppercase tracking-[0.2em] text-am-muted">
                        Categoría
                        <input
                          value={item.category}
                          onChange={(event) => updateProduct(index, { category: event.target.value })}
                          className="rounded-2xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white focus:border-am-primary focus:outline-none"
                        />
                      </label>

                      <label className="grid gap-1 text-xs font-bold uppercase tracking-[0.2em] text-am-muted">
                        Descripción
                        <textarea
                          rows={3}
                          value={item.description}
                          onChange={(event) => updateProduct(index, { description: event.target.value })}
                          className="rounded-2xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white focus:border-am-primary focus:outline-none"
                        />
                      </label>

                      <ImageUrlField
                        label="URL imagen"
                        value={item.imageUrl ?? ""}
                        onChange={(value) => updateProduct(index, { imageUrl: value })}
                      />

                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => removeProduct(index)}
                          className="rounded-full border border-red-400/40 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-red-300"
                        >
                          Eliminar
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <section id="tecnologia" className="grid gap-6 rounded-[28px] border border-white/10 bg-[#0c1514]/80 p-6">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="eyebrow">Tecnología</p>
                    <h2 className="text-2xl font-semibold">Diferenciales tecnológicos y recursos</h2>
                  </div>
                  <button
                    type="button"
                    onClick={addTechnology}
                    className="rounded-full border border-white/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-am-silver"
                  >
                    Agregar bloque
                  </button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {content.technology.map((item, index) => (
                    <article
                      key={`${item.title}-${index}`}
                      className="grid gap-2 rounded-3xl border border-white/10 bg-black/20 p-5"
                    >
                      {[
                        { label: "Título", value: item.title, key: "title" as const },
                        { label: "Texto", value: item.text, key: "text" as const },
                        { label: "Meta", value: item.meta, key: "meta" as const },
                        { label: "URL imagen", value: item.imageUrl ?? "", key: "imageUrl" as const }
                      ].map((field) =>
                        field.key === "imageUrl" ? (
                          <ImageUrlField
                            key={field.key}
                            label={field.label}
                            value={field.value}
                            onChange={(value) => updateTechnology(index, { [field.key]: value })}
                          />
                        ) : (
                          <label
                            key={field.key}
                            className="grid gap-1 text-xs font-bold uppercase tracking-[0.2em] text-am-muted"
                          >
                            {field.label}
                            <input
                              value={field.value}
                              onChange={(event) => updateTechnology(index, { [field.key]: event.target.value })}
                              className="rounded-2xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white focus:border-am-primary focus:outline-none"
                            />
                          </label>
                        )
                      )}

                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => removeTechnology(index)}
                          className="rounded-full border border-red-400/40 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-red-300"
                        >
                          Eliminar
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <section id="novedades" className="grid gap-6 rounded-[28px] border border-white/10 bg-[#0c1413]/80 p-6">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="eyebrow">Novedades</p>
                    <h2 className="text-2xl font-semibold">Actividad y evolución</h2>
                  </div>
                  <button
                    type="button"
                    onClick={addNews}
                    className="rounded-full border border-white/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-am-silver"
                  >
                    Agregar novedad
                  </button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {content.news.map((item, index) => (
                    <article key={item.id} className="grid gap-2 rounded-3xl border border-white/10 bg-black/20 p-5">
                      {[
                        { label: "Categoría / fecha", value: item.date, key: "date" as const },
                        { label: "Título", value: item.title, key: "title" as const },
                        { label: "Texto", value: item.text, key: "text" as const },
                        { label: "URL imagen", value: item.imageUrl ?? "", key: "imageUrl" as const }
                      ].map((field) =>
                        field.key === "imageUrl" ? (
                          <ImageUrlField
                            key={field.key}
                            label={field.label}
                            value={field.value}
                            onChange={(value) => updateNews(index, { [field.key]: value })}
                          />
                        ) : (
                          <label
                            key={field.key}
                            className="grid gap-1 text-xs font-bold uppercase tracking-[0.2em] text-am-muted"
                          >
                            {field.label}
                            <input
                              value={field.value}
                              onChange={(event) => updateNews(index, { [field.key]: event.target.value })}
                              className="rounded-2xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white focus:border-am-primary focus:outline-none"
                            />
                          </label>
                        )
                      )}

                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => removeNews(index)}
                          className="rounded-full border border-red-400/40 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-red-300"
                        >
                          Eliminar
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <section id="contacto" className="grid gap-6 rounded-[28px] border border-white/10 bg-[#0b1312]/80 p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="eyebrow">Contacto y recursos</p>
                    <h2 className="text-2xl font-semibold">Canales comerciales y materiales</h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={addChannel}
                      className="rounded-full border border-white/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-am-silver"
                    >
                      Agregar canal
                    </button>
                    <button
                      type="button"
                      onClick={addResource}
                      className="rounded-full border border-white/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-am-silver"
                    >
                      Agregar recurso
                    </button>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {[
                    { label: "Eyebrow", value: content.contact.eyebrow, key: "eyebrow" as const },
                    { label: "Título", value: content.contact.title, key: "title" as const },
                    { label: "Texto", value: content.contact.text, key: "text" as const },
                    { label: "WhatsApp", value: content.contact.whatsapp, key: "whatsapp" as const },
                    { label: "Email comercial", value: content.contact.commercialEmail, key: "commercialEmail" as const }
                  ].map((field) => (
                    <label
                      key={field.key}
                      className="grid gap-1 text-xs font-bold uppercase tracking-[0.2em] text-am-muted"
                    >
                      {field.label}
                      <input
                        value={field.value}
                        onChange={(event) =>
                          setContent((prev) => ({
                            ...prev,
                            contact: { ...prev.contact, [field.key]: event.target.value }
                          }))
                        }
                        className="rounded-2xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white focus:border-am-primary focus:outline-none"
                      />
                    </label>
                  ))}
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="grid gap-3">
                    <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-am-silver">Canales</h3>
                    {content.contact.channels.map((channel, index) => (
                      <div
                        key={`${channel.label}-${index}`}
                        className="grid gap-2 rounded-3xl border border-white/10 bg-black/20 p-4"
                      >
                        <label className="grid gap-1 text-xs font-bold uppercase tracking-[0.2em] text-am-muted">
                          Etiqueta
                          <input
                            value={channel.label}
                            onChange={(event) => updateChannel(index, { label: event.target.value })}
                            className="rounded-2xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white focus:border-am-primary focus:outline-none"
                          />
                        </label>

                        <label className="grid gap-1 text-xs font-bold uppercase tracking-[0.2em] text-am-muted">
                          Valor
                          <input
                            value={channel.value}
                            onChange={(event) => updateChannel(index, { value: event.target.value })}
                            className="rounded-2xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white focus:border-am-primary focus:outline-none"
                          />
                        </label>

                        <button
                          type="button"
                          onClick={() => removeChannel(index)}
                          className="rounded-full border border-red-400/40 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-red-300"
                        >
                          Eliminar canal
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="grid gap-3">
                    <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-am-silver">Recursos</h3>
                    {content.contact.resources.map((resource, index) => (
                      <div key={resource.id} className="grid gap-2 rounded-3xl border border-white/10 bg-black/20 p-4">
                        {[
                          { label: "Título", value: resource.title, key: "title" as const },
                          { label: "Enlace", value: resource.href, key: "href" as const },
                          { label: "Descripción", value: resource.description, key: "description" as const }
                        ].map((field) => (
                          <label
                            key={field.key}
                            className="grid gap-1 text-xs font-bold uppercase tracking-[0.2em] text-am-muted"
                          >
                            {field.label}
                            <input
                              value={field.value}
                              onChange={(event) => updateResource(index, { [field.key]: event.target.value })}
                              className="rounded-2xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white focus:border-am-primary focus:outline-none"
                            />
                          </label>
                        ))}

                        <button
                          type="button"
                          onClick={() => removeResource(index)}
                          className="rounded-full border border-red-400/40 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-red-300"
                        >
                          Eliminar recurso
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section id="permisos" className="grid gap-4 rounded-[28px] border border-am-primary/40 bg-am-primary/10 p-6">
                <div className="space-y-1">
                  <p className="eyebrow">Permisos activos</p>
                  <h2 className="text-2xl font-semibold">Qué puede hacer tu rol</h2>
                  <p className="text-sm text-am-muted">
                    Esto comunica claramente el alcance de autogestión para admin y empleado.
                  </p>
                </div>

                <ul className="grid gap-2 md:grid-cols-2">
                  {permissionsByRole[user.role].map((item) => (
                    <li
                      key={item}
                      className="rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm font-semibold text-am-silver"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              <section
                id="publicacion"
                className="flex flex-wrap items-center justify-between gap-4 rounded-[28px] border border-white/10 bg-[#0c1715]/80 p-6"
              >
                <div className="space-y-1">
                  <p className="eyebrow">Publicación</p>
                  <h2 className="text-2xl font-semibold">Guardar cambios</h2>
                  <p className="text-sm text-am-muted">
                    Los cambios se persisten en el backend .NET y quedan disponibles para la landing.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={save}
                  disabled={saving}
                  className="inline-flex items-center justify-center rounded-full bg-am-primary px-8 py-4 text-sm font-extrabold uppercase tracking-[0.2em] text-black transition hover:bg-am-primaryStrong disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {saving ? "Guardando…" : "Guardar en backend"}
                </button>
              </section>
            </main>
          </div>
        </div>
      )}
    </Protected>
  );
}
