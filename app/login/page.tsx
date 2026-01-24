"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import type { Role } from "@/lib/auth/types";
import { permissionsByRole } from "@/lib/auth/permissions";
import { loginWithMatrix } from "@/lib/auth/session";

const roleOptions: { value: Role; label: string; helper: string }[] = [
  {
    value: "admin",
    label: "Admin",
    helper: "Acceso total: publica, audita y configura lineamientos."
  },
  {
    value: "empleado",
    label: "Empleado",
    helper: "Acceso operativo con publicación habilitada."
  }
];

export default function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/admin";

  const [role, setRole] = useState<Role>("admin");
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("Admin123*");
  const [message, setMessage] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);

  const scopeList = useMemo(() => permissionsByRole[role], [role]);

  const onRoleChange = (value: Role) => {
    setRole(value);
    if (value === "admin") {
      setUsername("admin");
      setPassword("Admin123*");
    } else {
      setUsername("empleado");
      setPassword("Empleado123*");
    }
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setMessage("");

    const result = loginWithMatrix({ username, password, role });

    if (!result.ok) {
      setMessage(result.message);
      setSubmitting(false);
      return;
    }

    router.replace(next.startsWith("/") ? next : "/admin");
  };

  return (
    <main className="mx-auto grid min-h-screen w-[min(1100px,92vw)] items-center gap-10 py-16 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
      <section className="space-y-6">
        <div className="space-y-3">
          <p className="eyebrow">Acceso interno</p>
          <h1 className="text-4xl font-extrabold leading-[1.02] md:text-6xl">Controlá la operación digital de AM Seguridad.</h1>
          <p className="text-lg text-am-silver">
            Este acceso está pensado para autogestión real: mantener el sitio actualizado sin depender del proveedor.
          </p>
        </div>

        <div className="grid gap-3">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-am-muted">Con este rol vas a poder:</p>
          <ul className="grid gap-2 text-sm">
            {scopeList.map((item) => (
              <li key={item} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 font-semibold text-am-silver">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-am-primary/40 bg-am-primary/10 p-5 text-sm">
          <p className="font-bold uppercase tracking-[0.2em] text-am-primaryStrong">Credenciales demo</p>
          <ul className="mt-2 grid gap-1 text-am-silver">
            <li>
              <strong className="text-white">Admin:</strong> admin / Admin123*
            </li>
            <li>
              <strong className="text-white">Empleado:</strong> empleado / Empleado123*
            </li>
          </ul>
        </div>

        <div className="flex flex-wrap gap-2 text-sm font-semibold text-am-silver">
          <Link href="/" className="rounded-full border border-white/15 px-4 py-2 hover:border-am-primary/60 hover:text-white">
            Volver a la landing
          </Link>
        </div>
      </section>

      <section className="rounded-[28px] border border-white/10 bg-[#0d1716]/85 p-8 shadow-glow">
        <form className="grid gap-6" onSubmit={onSubmit}>
          <div className="space-y-2">
            <p className="eyebrow">Login</p>
            <h2 className="text-3xl font-semibold">Ingresar al panel</h2>
            <p className="text-sm text-am-muted">Seleccioná tu rol y usá tus credenciales.</p>
          </div>

          <div className="grid gap-3">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-am-muted">Rol</p>
            <div className="grid gap-2 md:grid-cols-2">
              {roleOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => onRoleChange(option.value)}
                  className={`grid gap-1 rounded-3xl border px-4 py-4 text-left transition ${
                    role === option.value
                      ? "border-am-primary/60 bg-am-primary/10"
                      : "border-white/10 bg-white/[0.03] hover:border-white/20"
                  }`}
                >
                  <span className="text-sm font-bold uppercase tracking-[0.24em] text-am-primaryStrong">{option.label}</span>
                  <span className="text-xs text-am-muted">{option.helper}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            <label className="grid gap-2 text-sm font-semibold">
              Usuario
              <input
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white focus:border-am-primary focus:outline-none"
                autoComplete="username"
                required
              />
            </label>
            <label className="grid gap-2 text-sm font-semibold">
              Contraseña
              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white focus:border-am-primary focus:outline-none"
                type="password"
                autoComplete="current-password"
                required
              />
            </label>
          </div>

          {message ? (
            <div className="rounded-2xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-300">
              {message}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center justify-center rounded-full bg-am-primary px-6 py-3 text-sm font-extrabold uppercase tracking-[0.2em] text-black transition hover:bg-am-primaryStrong disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitting ? "Ingresando…" : "Ingresar"}
          </button>
        </form>
      </section>
    </main>
  );
}
