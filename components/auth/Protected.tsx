"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Role, SessionUser } from "@/lib/auth/types";
import { getSessionUser, isAllowed } from "@/lib/auth/session";

type ProtectedProps = {
  allowedRoles: Role[];
  children: (user: SessionUser) => React.ReactNode;
};

type GuardState = "checking" | "allowed" | "blocked";

export function Protected({ allowedRoles, children }: ProtectedProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [state, setState] = useState<GuardState>("checking");
  const [user, setUser] = useState<SessionUser | null>(null);

  const allowed = useMemo(() => isAllowed(user, allowedRoles), [allowedRoles, user]);

  useEffect(() => {
    const sessionUser = getSessionUser();
    setUser(sessionUser);
    if (!isAllowed(sessionUser, allowedRoles)) {
      const next = pathname ? `?next=${encodeURIComponent(pathname)}` : "";
      router.replace(`/login${next}`);
      setState("blocked");
      return;
    }
    setState("allowed");
  }, [allowedRoles, pathname, router]);

  if (state !== "allowed" || !allowed || !user) {
    return (
      <div className="grid min-h-[40vh] place-items-center text-center">
        <div className="space-y-2">
          <p className="eyebrow">Autenticación</p>
          <p className="text-sm text-am-muted">Validando permisos…</p>
        </div>
      </div>
    );
  }

  return <>{children(user)}</>;
}
