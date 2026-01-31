"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Protected } from "@/components/auth/Protected";
import { UserBadge } from "@/components/auth/UserBadge";
import { ImageUrlField } from "@/components/admin/ImageUrlField";
import { permissionsByRole } from "@/lib/auth/permissions";
import { apiClient } from "@/lib/api";
import type {
  ContactChannel,
  HeroHighlight,
  LandingContent,
  NewsItem,
  ProductItem,
  ResourceItem,
  Service,
  TechnologyItem,
} from "@/lib/types";

type Notice = { type: "success" | "warning" | "error"; text: string } | null;
type SavingSection = "hero" | "services" | "products" | "technology" | "news" | "contact" | "all" | null;

// Genera un ID temporal negativo para nuevos items (el backend asignará el ID real)
let tempIdCounter = 0;
function tempId(): number {
  tempIdCounter -= 1;
  return tempIdCounter;
}

export default function AdminPage() {
  const [content, setContent] = useState<LandingContent | null>(null);
  const [notice, setNotice] = useState<Notice>({
    type: "warning",
    text: "Cargando contenido…",
  });
  const [saving, setSaving] = useState(false);
  const [savingSection, setSavingSection] = useState<SavingSection>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await apiClient.getContent();
        console.log("API Response:", data);
        console.log("Services from API:", data.services);
        setContent(data);
        setNotice({
          type: "success",
          text: `Contenido cargado desde la API. Servicios: ${data.services?.length ?? 0}`,
        });
      } catch (error) {
        setNotice({
          type: "error",
          text:
            error instanceof Error
              ? `${error.message} · no se pudo cargar el contenido desde la API.`
              : "No se pudo conectar con la API.",
        });
      }
    };

    load();
  }, []);

  const stats = useMemo(() => {
    if (!content) {
      return { servicios: 0, novedades: 0, recursos: 0 };
    }

    return {
      servicios: content.services.length,
      novedades: content.news.length,
      recursos: content.contact.resources.length,
    };
  }, [content]);

  const updateContent = (
    updater: (prev: LandingContent) => LandingContent,
  ) => {
    setContent((prev) => (prev ? updater(prev) : prev));
  };

  const navItems = [
    { id: "dashboard", label: "Dashboard" },
    { id: "hero", label: "Hero" },
    { id: "servicios", label: "Servicios" },
    { id: "productos", label: "Productos" },
    { id: "tecnologia", label: "Tecnología" },
    { id: "novedades", label: "Novedades" },
    { id: "contacto", label: "Contacto" },
    { id: "permisos", label: "Permisos" },
    { id: "publicacion", label: "Publicación" },
  ];

  const updateHero = (patch: Partial<LandingContent["hero"]>) =>
    updateContent((prev) => ({ ...prev, hero: { ...prev.hero, ...patch } }));

  const updateHeroHighlight = (index: number, patch: Partial<HeroHighlight>) =>
    updateContent((prev) => {
      const highlights = prev.hero.highlights.map((item, idx) =>
        idx === index ? { ...item, ...patch } : item,
      );
      return { ...prev, hero: { ...prev.hero, highlights } };
    });

  const addHeroHighlight = () =>
    updateContent((prev) => ({
      ...prev,
      hero: {
        ...prev.hero,
        highlights: [
          ...prev.hero.highlights,
          { title: "Nuevo diferencial", text: "Descripción breve." },
        ],
      },
    }));

  const removeHeroHighlight = (index: number) =>
    updateContent((prev) => ({
      ...prev,
      hero: {
        ...prev.hero,
        highlights: prev.hero.highlights.filter((_, idx) => idx !== index),
      },
    }));

  const updateService = (index: number, patch: Partial<Service>) =>
    updateContent((prev) => ({
      ...prev,
      services: prev.services.map((service, idx) =>
        idx === index ? { ...service, ...patch } : service,
      ),
    }));

  const updateServiceItem = (
    serviceIndex: number,
    itemIndex: number,
    value: string,
  ) =>
    updateContent((prev) => ({
      ...prev,
      services: prev.services.map((service, idx) => {
        if (idx !== serviceIndex) return service;
        const items = service.items.map((item, i) =>
          i === itemIndex ? value : item,
        );
        return { ...service, items };
      }),
    }));

  const addService = () =>
    updateContent((prev) => ({
      ...prev,
      services: [
        ...prev.services,
        {
          title: "Nuevo servicio",
          description: "Descripción breve del servicio.",
          imagePublicId: null,
          items: ["Ítem 1", "Ítem 2"],
        },
      ],
    }));

  const removeService = (index: number) =>
    updateContent((prev) => ({
      ...prev,
      services: prev.services.filter((_, idx) => idx !== index),
    }));

  const addServiceItem = (serviceIndex: number) =>
    updateContent((prev) => ({
      ...prev,
      services: prev.services.map((service, idx) =>
        idx === serviceIndex
          ? { ...service, items: [...service.items, "Nuevo ítem"] }
          : service,
      ),
    }));

  const removeServiceItem = (serviceIndex: number, itemIndex: number) =>
    updateContent((prev) => ({
      ...prev,
      services: prev.services.map((service, idx) => {
        if (idx !== serviceIndex) return service;
        return {
          ...service,
          items: service.items.filter((_, i) => i !== itemIndex),
        };
      }),
    }));

  const updateTechnology = (index: number, patch: Partial<TechnologyItem>) =>
    updateContent((prev) => ({
      ...prev,
      technology: prev.technology.map((item, idx) =>
        idx === index ? { ...item, ...patch } : item,
      ),
    }));

  const updateProduct = (index: number, patch: Partial<ProductItem>) =>
    updateContent((prev) => ({
      ...prev,
      products: prev.products.map((item, idx) =>
        idx === index ? { ...item, ...patch } : item,
      ),
    }));

  const addTechnology = () =>
    updateContent((prev) => ({
      ...prev,
      technology: [
        ...prev.technology,
        {
          title: "Nuevo diferencial tecnológico",
          text: "Detalle breve de la capacidad tecnológica.",
          meta: "Meta",
          imagePublicId: null,
        },
      ],
    }));

  const addProduct = () =>
    updateContent((prev) => ({
      ...prev,
      products: [
        ...prev.products,
        {
          name: "Nuevo producto tecnológico",
          category: "Categoría",
          description: "Descripción breve del producto.",
          imagePublicId: null,
        },
      ],
    }));

  const removeTechnology = (index: number) =>
    updateContent((prev) => ({
      ...prev,
      technology: prev.technology.filter((_, idx) => idx !== index),
    }));

  const removeProduct = (index: number) =>
    updateContent((prev) => ({
      ...prev,
      products: prev.products.filter((_, idx) => idx !== index),
    }));

  const updateNews = (index: number, patch: Partial<NewsItem>) =>
    updateContent((prev) => ({
      ...prev,
      news: prev.news.map((item, idx) =>
        idx === index ? { ...item, ...patch } : item,
      ),
    }));

  const addNews = () =>
    updateContent((prev) => ({
      ...prev,
      news: [
        {
          id: tempId(),
          date: "Categoría",
          title: "Nueva novedad",
          text: "Texto breve de la novedad.",
          // imageUrl: "",
          imagePublicId: null,
        },
        ...prev.news,
      ],
    }));

  const removeNews = (index: number) =>
    updateContent((prev) => ({
      ...prev,
      news: prev.news.filter((_, idx) => idx !== index),
    }));

  const updateChannel = (index: number, patch: Partial<ContactChannel>) =>
    updateContent((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        channels: prev.contact.channels.map((channel, idx) =>
          idx === index ? { ...channel, ...patch } : channel,
        ),
      },
    }));

  const addChannel = () =>
    updateContent((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        channels: [
          ...prev.contact.channels,
          { label: "Canal", value: "valor@amseguridad.com.ar" },
        ],
      },
    }));

  const removeChannel = (index: number) =>
    updateContent((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        channels: prev.contact.channels.filter((_, idx) => idx !== index),
      },
    }));

  const updateResource = (index: number, patch: Partial<ResourceItem>) =>
    updateContent((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        resources: prev.contact.resources.map((resource, idx) =>
          idx === index ? { ...resource, ...patch } : resource,
        ),
      },
    }));

  const addResource = () =>
    updateContent((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        resources: [
          {
            id: tempId(),
            title: "Nuevo recurso",
            href: "#",
            description: "Descripción breve del recurso.",
          },
          ...prev.contact.resources,
        ],
      },
    }));

  const removeResource = (index: number) =>
    updateContent((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        resources: prev.contact.resources.filter((_, idx) => idx !== index),
      },
    }));

  const save = async () => {
    if (!content) {
      setNotice({
        type: "error",
        text: "No hay contenido cargado desde la API para guardar.",
      });
      return;
    }

    setSaving(true);
    setSavingSection("all");
    setNotice({ type: "warning", text: "Guardando cambios..." });
    try {
      const saved = await apiClient.saveContent(content);
      setContent(saved);
      setNotice({
        type: "success",
        text: "Cambios guardados correctamente en la API.",
      });
    } catch (error) {
      setNotice({
        type: "error",
        text:
          error instanceof Error
            ? `${error.message} - no se pudo persistir en la API.`
            : "No se pudo persistir en la API.",
      });
    } finally {
      setSaving(false);
      setSavingSection(null);
    }
  };

  const saveHero = async () => {
    if (!content) return;
    setSavingSection("hero");
    setNotice({ type: "warning", text: "Guardando Hero..." });
    try {
      const saved = await apiClient.saveHero(content.hero);
      updateContent((prev) => ({ ...prev, hero: saved }));
      setNotice({ type: "success", text: "Hero guardado correctamente." });
    } catch (error) {
      setNotice({
        type: "error",
        text: error instanceof Error ? error.message : "Error al guardar Hero.",
      });
    } finally {
      setSavingSection(null);
    }
  };

  const saveServices = async () => {
    if (!content) return;
    setSavingSection("services");
    setNotice({ type: "warning", text: "Guardando Servicios..." });
    try {
      const saved = await apiClient.saveServices(content.services);
      updateContent((prev) => ({ ...prev, services: saved }));
      setNotice({ type: "success", text: "Servicios guardados correctamente." });
    } catch (error) {
      setNotice({
        type: "error",
        text: error instanceof Error ? error.message : "Error al guardar Servicios.",
      });
    } finally {
      setSavingSection(null);
    }
  };

  const saveProducts = async () => {
    if (!content) return;
    setSavingSection("products");
    setNotice({ type: "warning", text: "Guardando Productos..." });
    try {
      const saved = await apiClient.saveProducts(content.products);
      updateContent((prev) => ({ ...prev, products: saved }));
      setNotice({ type: "success", text: "Productos guardados correctamente." });
    } catch (error) {
      setNotice({
        type: "error",
        text: error instanceof Error ? error.message : "Error al guardar Productos.",
      });
    } finally {
      setSavingSection(null);
    }
  };

  const saveTechnology = async () => {
    if (!content) return;
    setSavingSection("technology");
    setNotice({ type: "warning", text: "Guardando Tecnología..." });
    try {
      const saved = await apiClient.saveTechnology(content.technology);
      updateContent((prev) => ({ ...prev, technology: saved }));
      setNotice({ type: "success", text: "Tecnología guardada correctamente." });
    } catch (error) {
      setNotice({
        type: "error",
        text: error instanceof Error ? error.message : "Error al guardar Tecnología.",
      });
    } finally {
      setSavingSection(null);
    }
  };

  const saveNews = async () => {
    if (!content) return;
    setSavingSection("news");
    setNotice({ type: "warning", text: "Guardando Novedades..." });
    try {
      const saved = await apiClient.saveNews(content.news);
      updateContent((prev) => ({ ...prev, news: saved }));
      setNotice({ type: "success", text: "Novedades guardadas correctamente." });
    } catch (error) {
      setNotice({
        type: "error",
        text: error instanceof Error ? error.message : "Error al guardar Novedades.",
      });
    } finally {
      setSavingSection(null);
    }
  };

  const saveContact = async () => {
    if (!content) return;
    setSavingSection("contact");
    setNotice({ type: "warning", text: "Guardando Contacto..." });
    try {
      const saved = await apiClient.saveContact(content.contact);
      updateContent((prev) => ({ ...prev, contact: saved }));
      setNotice({ type: "success", text: "Contacto guardado correctamente." });
    } catch (error) {
      setNotice({
        type: "error",
        text: error instanceof Error ? error.message : "Error al guardar Contacto.",
      });
    } finally {
      setSavingSection(null);
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
                <p className="text-sm text-am-muted">
                  Editá textos, imágenes, novedades y recursos sin depender del
                  proveedor.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <UserBadge user={user} />
                <div className="flex flex-wrap gap-2 text-xs font-bold uppercase tracking-[0.24em] text-am-silver">
                  <span className="rounded-full border border-white/10 px-4 py-2">
                    Servicios: {stats.servicios}
                  </span>
                  <span className="rounded-full border border-white/10 px-4 py-2">
                    Novedades: {stats.novedades}
                  </span>
                  <span className="rounded-full border border-white/10 px-4 py-2">
                    Recursos: {stats.recursos}
                  </span>
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
              {!content ? (
                <section className="grid gap-4 rounded-[28px] border border-white/10 bg-[#0f1a18]/80 p-6 text-center">
                  <p className="eyebrow">Sin contenido</p>
                  <h2 className="text-2xl font-semibold text-white">
                    No hay datos cargados desde la API
                  </h2>
                  <p className="text-sm text-am-muted">
                    Revisá la conexión con el backend o los permisos del usuario
                    e intentá nuevamente.
                  </p>
                  <div className="flex justify-center">
                    <button
                      type="button"
                      onClick={() => window.location.reload()}
                      className="rounded-full border border-white/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-am-silver"
                    >
                      Reintentar carga
                    </button>
                  </div>
                </section>
              ) : (
                <>
                  <section
                id="dashboard"
                className="grid gap-6 rounded-[28px] border border-white/10 bg-[#0f1a18]/80 p-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="eyebrow">Dashboard</p>
                    <h2 className="text-2xl font-semibold">
                      Resumen operativo
                    </h2>
                    <p className="text-sm text-am-muted">
                      Accesos rápidos y estado del contenido.
                    </p>
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
                    { label: "Recursos", value: stats.recursos },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-am-silver"
                    >
                      <span className="block text-xs uppercase tracking-[0.2em] text-am-muted">
                        {item.label}
                      </span>
                      <span className="text-2xl font-bold text-white">
                        {item.value}
                      </span>
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

              <section
                id="hero"
                className="grid gap-6 rounded-[28px] border border-white/10 bg-[#0f1a18]/80 p-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="eyebrow">Hero</p>
                    <h2 className="text-2xl font-semibold">
                      Mensaje principal e imagen
                    </h2>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={saveHero}
                      disabled={savingSection !== null}
                      className="rounded-full bg-am-primary px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-black transition hover:bg-am-primaryStrong disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {savingSection === "hero" ? "Guardando..." : "Guardar Hero"}
                    </button>
                    <Link
                      href="/"
                      className="rounded-full border border-white/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-am-silver"
                    >
                      Ver landing
                    </Link>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {[
                    {
                      label: "Eyebrow",
                      value: content.hero.eyebrow,
                      key: "eyebrow" as const,
                    },
                    {
                      label: "Título",
                      value: content.hero.title,
                      key: "title" as const,
                    },
                    {
                      label: "Bajada",
                      value: content.hero.lead,
                      key: "lead" as const,
                    },
                    {
                      label: "CTA físico",
                      value: content.hero.primaryCta,
                      key: "primaryCta" as const,
                    },
                    {
                      label: "CTA electrónico",
                      value: content.hero.secondaryCta,
                      key: "secondaryCta" as const,
                    },
                    {
                      label: "CTA contacto",
                      value: content.hero.contactCta,
                      key: "contactCta" as const,
                    },
                    {
                      label: "Imagen hero (Public ID)",
                      value: content.hero.imagePublicId ?? null,
                      key: "imagePublicId" as const,
                    },
                  ].map((field) =>
                    field.key === "imagePublicId" ? (
                      <ImageUrlField
                        key={field.key}
                        label={field.label}
                        value={field.value}
                        onChange={(value) =>
                          updateHero({ imagePublicId: value })
                        }
                        helper="Subí la imagen en Cloudinary o ingresá el Public ID."
                      />
                    ) : (
                      <label
                        key={field.key}
                        className="grid gap-2 text-sm font-semibold"
                      >
                        {field.label}
                        <input
                          value={field.value ?? ""}
                          onChange={(event) =>
                            updateHero({ [field.key]: event.target.value })
                          }
                          className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white focus:border-am-primary focus:outline-none"
                        />
                      </label>
                    ),
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
                        key={`highlight-${index}`}
                        className="grid gap-2 rounded-3xl border border-white/10 bg-black/20 p-4"
                      >
                        <label className="grid gap-1 text-xs font-bold uppercase tracking-[0.2em] text-am-muted">
                          Título
                          <input
                            value={highlight.title}
                            onChange={(event) =>
                              updateHeroHighlight(index, {
                                title: event.target.value,
                              })
                            }
                            className="rounded-2xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white focus:border-am-primary focus:outline-none"
                          />
                        </label>

                        <label className="grid gap-1 text-xs font-bold uppercase tracking-[0.2em] text-am-muted">
                          Texto
                          <textarea
                            rows={3}
                            value={highlight.text}
                            onChange={(event) =>
                              updateHeroHighlight(index, {
                                text: event.target.value,
                              })
                            }
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

              <section
                id="servicios"
                className="grid gap-6 rounded-[28px] border border-white/10 bg-[#0d1716]/80 p-6"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="eyebrow">Servicios</p>
                    <h2 className="text-2xl font-semibold">
                      Cobertura y detalle operativo
                    </h2>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={saveServices}
                      disabled={savingSection !== null}
                      className="rounded-full bg-am-primary px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-black transition hover:bg-am-primaryStrong disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {savingSection === "services" ? "Guardando..." : "Guardar Servicios"}
                    </button>
                    <button
                      type="button"
                      onClick={addService}
                      className="rounded-full border border-white/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-am-silver"
                    >
                      Agregar servicio
                    </button>
                  </div>
                </div>

                <div className="grid gap-4">
                  {content.services.map((service, serviceIndex) => (
                    <article
                      key={`service-${serviceIndex}`}
                      className="grid gap-3 rounded-3xl border border-white/10 bg-black/20 p-5"
                    >
                      <div className="grid gap-3 md:grid-cols-2">
                        <label className="grid gap-1 text-xs font-bold uppercase tracking-[0.2em] text-am-muted">
                          Título
                          <input
                            value={service.title}
                            onChange={(event) =>
                              updateService(serviceIndex, {
                                title: event.target.value,
                              })
                            }
                            className="rounded-2xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white focus:border-am-primary focus:outline-none"
                          />
                        </label>

                        <label className="grid gap-1 text-xs font-bold uppercase tracking-[0.2em] text-am-muted">
                          Descripción
                          <input
                            value={service.description}
                            onChange={(event) =>
                              updateService(serviceIndex, {
                                description: event.target.value,
                              })
                            }
                            className="rounded-2xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white focus:border-am-primary focus:outline-none"
                          />
                        </label>
                      </div>

                      <div className="md:col-span-2">
                        <ImageUrlField
                          label="Imagen del Servicio (Public ID)"
                          value={service.imagePublicId ?? null}
                          onChange={(newPublicId) =>
                            updateService(serviceIndex, {
                              imagePublicId: newPublicId,
                            })
                          }
                          helper="Esta imagen se mostrara en miniatura o fondo del servicio."
                        />
                        1
                      </div>

                      <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-am-silver">
                            Ítems del servicio
                          </h3>
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
                            <div
                              key={`service-${serviceIndex}-item-${itemIndex}`}
                              className="flex items-center gap-2"
                            >
                              <input
                                value={item}
                                onChange={(event) =>
                                  updateServiceItem(
                                    serviceIndex,
                                    itemIndex,
                                    event.target.value,
                                  )
                                }
                                className="w-full rounded-2xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white focus:border-am-primary focus:outline-none"
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  removeServiceItem(serviceIndex, itemIndex)
                                }
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

              <section
                id="productos"
                className="grid gap-6 rounded-[28px] border border-white/10 bg-[#0c1514]/80 p-6"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="eyebrow">Productos tecnológicos</p>
                    <h2 className="text-2xl font-semibold">
                      Catálogo interno y recursos disponibles
                    </h2>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={saveProducts}
                      disabled={savingSection !== null}
                      className="rounded-full bg-am-primary px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-black transition hover:bg-am-primaryStrong disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {savingSection === "products" ? "Guardando..." : "Guardar Productos"}
                    </button>
                    <button
                      type="button"
                      onClick={addProduct}
                      className="rounded-full border border-white/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-am-silver"
                    >
                      Agregar producto
                    </button>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {content.products.map((item, index) => (
                    <article
                      key={`product-${index}`}
                      className="grid gap-2 rounded-3xl border border-white/10 bg-black/20 p-5"
                    >
                      <label className="grid gap-1 text-xs font-bold uppercase tracking-[0.2em] text-am-muted">
                        Nombre
                        <input
                          value={item.name}
                          onChange={(event) =>
                            updateProduct(index, { name: event.target.value })
                          }
                          className="rounded-2xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white focus:border-am-primary focus:outline-none"
                        />
                      </label>

                      <label className="grid gap-1 text-xs font-bold uppercase tracking-[0.2em] text-am-muted">
                        Categoría
                        <input
                          value={item.category}
                          onChange={(event) =>
                            updateProduct(index, {
                              category: event.target.value,
                            })
                          }
                          className="rounded-2xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white focus:border-am-primary focus:outline-none"
                        />
                      </label>

                      <label className="grid gap-1 text-xs font-bold uppercase tracking-[0.2em] text-am-muted">
                        Descripción
                        <textarea
                          rows={3}
                          value={item.description}
                          onChange={(event) =>
                            updateProduct(index, {
                              description: event.target.value,
                            })
                          }
                          className="rounded-2xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white focus:border-am-primary focus:outline-none"
                        />
                      </label>

                      <ImageUrlField
                        label="Imagen (Public ID)"
                        value={item.imagePublicId ?? null}
                        onChange={(value) =>
                          updateProduct(index, { imagePublicId: value })
                        }
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

              <section
                id="tecnologia"
                className="grid gap-6 rounded-[28px] border border-white/10 bg-[#0c1514]/80 p-6"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="eyebrow">Tecnología</p>
                    <h2 className="text-2xl font-semibold">
                      Diferenciales tecnológicos y recursos
                    </h2>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={saveTechnology}
                      disabled={savingSection !== null}
                      className="rounded-full bg-am-primary px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-black transition hover:bg-am-primaryStrong disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {savingSection === "technology" ? "Guardando..." : "Guardar Tecnología"}
                    </button>
                    <button
                      type="button"
                      onClick={addTechnology}
                      className="rounded-full border border-white/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-am-silver"
                    >
                      Agregar bloque
                    </button>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {content.technology.map((item, index) => (
                    <article
                      key={`tech-${index}`}
                      className="grid gap-2 rounded-3xl border border-white/10 bg-black/20 p-5"
                    >
                      {[
                        {
                          label: "Título",
                          value: item.title,
                          key: "title" as const,
                        },
                        {
                          label: "Texto",
                          value: item.text,
                          key: "text" as const,
                        },
                        {
                          label: "Meta",
                          value: item.meta,
                          key: "meta" as const,
                        },
                        {
                          label: "Imagen (Public ID)",
                          value: item.imagePublicId ?? null,
                          key: "imagePublicId" as const,
                        },
                      ].map((field) =>
                        field.key === "imagePublicId" ? (
                          <ImageUrlField
                            key={field.key}
                            label={field.label}
                            value={field.value}
                            onChange={(value) =>
                              updateTechnology(index, { imagePublicId: value })
                            }
                          />
                        ) : (
                          <label
                            key={field.key}
                            className="grid gap-1 text-xs font-bold uppercase tracking-[0.2em] text-am-muted"
                          >
                            {field.label}
                            <input
                              value={field.value ?? ""}
                              onChange={(event) =>
                                updateTechnology(index, {
                                  [field.key]: event.target.value,
                                })
                              }
                              className="rounded-2xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white focus:border-am-primary focus:outline-none"
                            />
                          </label>
                        ),
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

              <section
                id="novedades"
                className="grid gap-6 rounded-[28px] border border-white/10 bg-[#0c1413]/80 p-6"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="eyebrow">Novedades</p>
                    <h2 className="text-2xl font-semibold">
                      Actividad y evolución
                    </h2>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={saveNews}
                      disabled={savingSection !== null}
                      className="rounded-full bg-am-primary px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-black transition hover:bg-am-primaryStrong disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {savingSection === "news" ? "Guardando..." : "Guardar Novedades"}
                    </button>
                    <button
                      type="button"
                      onClick={addNews}
                      className="rounded-full border border-white/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-am-silver"
                    >
                      Agregar novedad
                    </button>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {content.news.map((item, index) => (
                    <article
                      key={item.id}
                      className="grid gap-2 rounded-3xl border border-white/10 bg-black/20 p-5"
                    >
                      {[
                        {
                          label: "Categoría / fecha",
                          value: item.date,
                          key: "date" as const,
                        },
                        {
                          label: "Título",
                          value: item.title,
                          key: "title" as const,
                        },
                        {
                          label: "Texto",
                          value: item.text,
                          key: "text" as const,
                        },
                        {
                          label: "Imagen (Public ID)",
                          value: item.imagePublicId ?? null,
                          key: "imagePublicId" as const,
                        },
                      ].map((field) =>
                        field.key === "imagePublicId" ? (
                          <ImageUrlField
                            key={field.key}
                            label={field.label}
                            value={field.value}
                            onChange={(value) =>
                              updateNews(index, { imagePublicId: value })
                            }
                          />
                        ) : (
                          <label
                            key={field.key}
                            className="grid gap-1 text-xs font-bold uppercase tracking-[0.2em] text-am-muted"
                          >
                            {field.label}
                            <input
                              value={field.value ?? ""}
                              onChange={(event) =>
                                updateNews(index, {
                                  [field.key]: event.target.value,
                                })
                              }
                              className="rounded-2xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white focus:border-am-primary focus:outline-none"
                            />
                          </label>
                        ),
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

              <section
                id="contacto"
                className="grid gap-6 rounded-[28px] border border-white/10 bg-[#0b1312]/80 p-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="eyebrow">Contacto y recursos</p>
                    <h2 className="text-2xl font-semibold">
                      Canales comerciales y materiales
                    </h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={saveContact}
                      disabled={savingSection !== null}
                      className="rounded-full bg-am-primary px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-black transition hover:bg-am-primaryStrong disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {savingSection === "contact" ? "Guardando..." : "Guardar Contacto"}
                    </button>
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
                    {
                      label: "Eyebrow",
                      value: content.contact.eyebrow,
                      key: "eyebrow" as const,
                    },
                    {
                      label: "Título",
                      value: content.contact.title,
                      key: "title" as const,
                    },
                    {
                      label: "Texto",
                      value: content.contact.text,
                      key: "text" as const,
                    },
                    {
                      label: "WhatsApp",
                      value: content.contact.whatsapp,
                      key: "whatsapp" as const,
                    },
                    {
                      label: "Email comercial",
                      value: content.contact.commercialEmail,
                      key: "commercialEmail" as const,
                    },
                  ].map((field) => (
                    <label
                      key={field.key}
                      className="grid gap-1 text-xs font-bold uppercase tracking-[0.2em] text-am-muted"
                    >
                      {field.label}
                      <input
                        value={field.value}
                        onChange={(event) =>
                          updateContent((prev) => ({
                            ...prev,
                            contact: {
                              ...prev.contact,
                              [field.key]: event.target.value,
                            },
                          }))
                        }
                        className="rounded-2xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white focus:border-am-primary focus:outline-none"
                      />
                    </label>
                  ))}
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="grid gap-3">
                    <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-am-silver">
                      Canales
                    </h3>
                    {content.contact.channels.map((channel, index) => (
                      <div
                        key={`channel-${index}`}
                        className="grid gap-2 rounded-3xl border border-white/10 bg-black/20 p-4"
                      >
                        <label className="grid gap-1 text-xs font-bold uppercase tracking-[0.2em] text-am-muted">
                          Etiqueta
                          <input
                            value={channel.label}
                            onChange={(event) =>
                              updateChannel(index, {
                                label: event.target.value,
                              })
                            }
                            className="rounded-2xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white focus:border-am-primary focus:outline-none"
                          />
                        </label>

                        <label className="grid gap-1 text-xs font-bold uppercase tracking-[0.2em] text-am-muted">
                          Valor
                          <input
                            value={channel.value}
                            onChange={(event) =>
                              updateChannel(index, {
                                value: event.target.value,
                              })
                            }
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
                    <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-am-silver">
                      Recursos
                    </h3>
                    {content.contact.resources.map((resource, index) => (
                      <div
                        key={resource.id}
                        className="grid gap-2 rounded-3xl border border-white/10 bg-black/20 p-4"
                      >
                        {[
                          {
                            label: "Título",
                            value: resource.title,
                            key: "title" as const,
                          },
                          {
                            label: "Enlace",
                            value: resource.href,
                            key: "href" as const,
                          },
                          {
                            label: "Descripción",
                            value: resource.description,
                            key: "description" as const,
                          },
                        ].map((field) => (
                          <label
                            key={field.key}
                            className="grid gap-1 text-xs font-bold uppercase tracking-[0.2em] text-am-muted"
                          >
                            {field.label}
                            <input
                              value={field.value}
                              onChange={(event) =>
                                updateResource(index, {
                                  [field.key]: event.target.value,
                                })
                              }
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

              <section
                id="permisos"
                className="grid gap-4 rounded-[28px] border border-am-primary/40 bg-am-primary/10 p-6"
              >
                <div className="space-y-1">
                  <p className="eyebrow">Permisos activos</p>
                  <h2 className="text-2xl font-semibold">
                    Qué puede hacer tu rol
                  </h2>
                  <p className="text-sm text-am-muted">
                    Esto comunica claramente el alcance de autogestión para
                    admin y empleado.
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

              {/* <section
                id="publicacion"
                className="flex flex-wrap items-center justify-between gap-4 rounded-[28px] border border-white/10 bg-[#0c1715]/80 p-6"
              >
                <div className="space-y-1">
                  <p className="eyebrow">Publicación</p>
                  <h2 className="text-2xl font-semibold">Guardar cambios</h2>
                  <p className="text-sm text-am-muted">
                    Los cambios se persisten en el backend .NET y quedan
                    disponibles para la landing.
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
              </section> */}
                </>
              )}
            </main>
          </div>
        </div>
      )}
    </Protected>
  );
}
