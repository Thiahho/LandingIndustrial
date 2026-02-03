"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { createPortal } from "react-dom";
import type { SessionUser } from "@/lib/auth/types";
import { getSessionUser, clearSession } from "@/lib/auth/session";

const primaryLinks = [
  { href: "/", label: "Inicio" },
  { href: "/nosotros", label: "Nuestra empresa" },
  { href: "/nosotros#habilitaciones", label: "Habilitaciones" },
  { href: "/trabaja", label: "Trabajá con nosotros" },
];

const segmentLinks = [
  { href: "/segmentos/personas-hogar", label: "Personas y hogar" },
  { href: "/segmentos/negocios-comercios", label: "Negocios y comercios" },
  { href: "/segmentos/empresa-instituciones", label: "Empresa e instituciones" },
];

export function NavBar() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [segmentsOpen, setSegmentsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<SessionUser | null>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    setUser(getSessionUser());
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onHashChange = () => setIsOpen(false);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const closeMenu = () => {
    setIsOpen(false);
    setSegmentsOpen(false);
  };

  const handleLogout = () => {
    clearSession();
    setUser(null);
    window.location.href = "/";
  };

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-colors duration-200 ${
        scrolled ? "border-white/10 bg-[#0b1110]/90" : "border-transparent bg-[#0b1110]/60"
      } backdrop-blur`}
    >
      <div className="mx-auto flex w-[min(1200px,92vw)] items-center justify-between gap-4 py-4">
        <Link
          href="/"
          title="Ir al inicio de AM Seguridad"
          className="flex items-center gap-3"
          onClick={closeMenu}
        >
          <motion.div
            className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-am-primary to-emerald-900 font-extrabold text-black shadow-glow"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            AM
          </motion.div>
          <div className="grid leading-tight">
            <span className="text-sm font-semibold">AM Seguridad</span>
            <span className="text-xs text-am-muted">Soluciones integrales</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Principal">
          {primaryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              title={link.label}
              className="rounded-full px-4 py-2 text-sm font-semibold text-am-silver transition hover:bg-white/5 hover:text-white"
            >
              {link.label}
            </Link>
          ))}

          <div className="relative">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-am-silver transition hover:bg-white/5 hover:text-white"
              aria-expanded={segmentsOpen}
              aria-haspopup="true"
              onClick={() => setSegmentsOpen((p) => !p)}
            >
              Segmentos <ChevronDown className="h-4 w-4 text-am-muted" />
            </button>

            <div
              className={`mt-2 gap-2 rounded-2xl border border-white/10 bg-[#0b1110]/95 p-3 shadow-glow md:absolute md:right-0 md:mt-3 md:w-72 ${
                segmentsOpen ? "grid" : "hidden"
              }`}
            >
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-am-muted">
                Servicios por segmento
              </p>
              {segmentLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  title={link.label}
                  onClick={() => setSegmentsOpen(false)}
                  className="rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-am-silver transition hover:border-am-primary hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {user ? (
            <>
              <Link
                href="/admin"
                title="Ir al panel de administración"
                className="rounded-full px-4 py-2 text-sm font-semibold text-am-primary transition hover:bg-white/5 hover:text-am-primaryStrong"
              >
                Panel
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-full px-4 py-2 text-sm font-semibold text-am-silver transition hover:bg-white/5 hover:text-white"
              >
                Salir
              </button>
            </>
          ) : (
            <Link
              href="/login"
              title="Ingresar al portal"
              className="rounded-full px-4 py-2 text-sm font-semibold text-am-silver transition hover:bg-white/5 hover:text-white"
            >
              Ingresar
            </Link>
          )}

          <Link
            href="/contacto"
            title="Hablar con ventas de AM Seguridad"
            className="ml-2 inline-flex items-center justify-center rounded-full bg-am-primary px-4 py-2 text-sm font-extrabold uppercase tracking-[0.18em] text-black transition hover:bg-am-primaryStrong"
          >
            Hablar con ventas
          </Link>
        </nav>

        {/* Burger button (mobile) */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-white/15 p-3 text-am-silver md:hidden"
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((p) => !p)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile overlay + drawer via Portal */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {isOpen ? (
              <>
                {/* Overlay */}
                <motion.button
                  type="button"
                  aria-label="Cerrar menú"
                  className="fixed inset-0 z-[90] bg-black/90 backdrop-blur-[2px] md:hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={closeMenu}
                />

                {/* Drawer */}
                <motion.nav
                  className="
                    fixed right-0 top-0 z-[100] h-dvh w-[min(86vw,360px)]
                    border-l border-white/10
                    bg-gradient-to-b from-[#0f1b1a]/98 to-[#0b1110]/98
                    p-4
                    shadow-[0_30px_80px_rgba(0,0,0,0.75)]
                    ring-1 ring-white/10
                    md:hidden
                  "
                  initial={{ x: 40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 40, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  aria-label="Menú móvil"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-white">Menú</span>
                    <button
                      type="button"
                      className="rounded-full border border-white/15 p-2 text-am-silver"
                      onClick={closeMenu}
                      aria-label="Cerrar"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="mt-4 grid gap-2">
                    {primaryLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        title={link.label}
                        onClick={closeMenu}
                        className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-semibold text-white/90 transition hover:border-am-primary hover:text-white"
                      >
                        {link.label}
                      </Link>
                    ))}

                    {/* Segmentos accordion (mobile) */}
                    <button
                      type="button"
                      className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-semibold text-white/90 transition hover:border-am-primary hover:text-white"
                      aria-expanded={segmentsOpen}
                      onClick={() => setSegmentsOpen((p) => !p)}
                    >
                      Segmentos
                      <ChevronDown
                        className={`h-4 w-4 transition ${segmentsOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {segmentsOpen ? (
                        <motion.div
                          className="grid gap-2 rounded-2xl border border-white/10 bg-white/[0.04] p-3"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          {segmentLinks.map((link) => (
                            <Link
                              key={link.href}
                              href={link.href}
                              title={link.label}
                              onClick={closeMenu}
                              className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-semibold text-white/85 transition hover:border-am-primary hover:text-white"
                            >
                              {link.label}
                            </Link>
                          ))}
                        </motion.div>
                      ) : null}
                    </AnimatePresence>

                    <div className="mt-2 grid gap-2 border-t border-white/10 pt-3">
                      {user ? (
                        <>
                          <Link
                            href="/admin"
                            title="Ir al panel de administración"
                            onClick={closeMenu}
                            className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-semibold text-am-primary transition hover:border-am-primaryStrong hover:text-am-primaryStrong"
                          >
                            Panel
                          </Link>
                          <button
                            type="button"
                            onClick={handleLogout}
                            className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-left text-sm font-semibold text-white/90 transition hover:border-white/20 hover:text-white"
                          >
                            Salir
                          </button>
                        </>
                      ) : (
                        <Link
                          href="/login"
                          title="Ingresar al portal"
                          onClick={closeMenu}
                          className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-semibold text-white/90 transition hover:border-white/20 hover:text-white"
                        >
                          Ingresar
                        </Link>
                      )}

                      <Link
                        href="/contacto"
                        title="Hablar con ventas de AM Seguridad"
                        onClick={closeMenu}
                        className="mt-1 inline-flex items-center justify-center rounded-2xl bg-am-primary px-4 py-3 text-sm font-extrabold uppercase tracking-[0.18em] text-black transition hover:bg-am-primaryStrong"
                      >
                        Hablar con ventas
                      </Link>
                    </div>
                  </div>
                </motion.nav>
              </>
            ) : null}
          </AnimatePresence>,
          document.body
        )}

    </header>
  );
}
