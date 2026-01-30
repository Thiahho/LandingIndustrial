"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { SessionUser } from "@/lib/auth/types";
import { getSessionUser, clearSession } from "@/lib/auth/session";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/nosotros", label: "Nuestra empresa" },
  { href: "/nosotros#habilitaciones", label: "Habilitaciones" },
  { href: "/trabaja", label: "Trabajá con nosotros" },
  { href: "/#personas-hogar", label: "Personas y hogar" },
  { href: "/#negocios-comercios", label: "Negocios y comercios" },
  { href: "/#empresa-instituciones", label: "Empresa e instituciones" }
];

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<SessionUser | null>(null);

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
        <Link href="/" className="flex items-center gap-3">
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

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-am-silver md:hidden"
          aria-expanded={isOpen}
          aria-controls="nav-menu"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          Menú
        </button>

        <nav
          id="nav-menu"
          className={`absolute right-[4vw] top-20 w-64 flex-col gap-1 rounded-3xl border border-white/10 bg-[#0c1413]/95 p-3 shadow-glow md:static md:flex md:w-auto md:flex-row md:items-center md:border-none md:bg-transparent md:p-0 md:shadow-none ${
            isOpen ? "flex" : "hidden md:flex"
          }`}
          aria-label="Principal"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-semibold text-am-silver transition hover:bg-white/5 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          {user ? (
            <>
              <Link
                href="/admin"
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
              className="rounded-full px-4 py-2 text-sm font-semibold text-am-silver transition hover:bg-white/5 hover:text-white"
            >
              Ingresar
            </Link>
          )}
          <Link
            href="/contacto"
            className="mt-2 inline-flex items-center justify-center rounded-full bg-am-primary px-4 py-2 text-sm font-extrabold uppercase tracking-[0.18em] text-black transition hover:bg-am-primaryStrong md:ml-2 md:mt-0"
          >
            Hablar con ventas
          </Link>
        </nav>
      </div>
      <Link
        href="/contacto"
        className="fixed bottom-5 right-5 z-40 inline-flex items-center justify-center rounded-full bg-am-primary px-5 py-3 text-xs font-extrabold uppercase tracking-[0.18em] text-black shadow-glow transition hover:bg-am-primaryStrong md:hidden"
      >
        Hablar con ventas
      </Link>
    </header>
  );
}
