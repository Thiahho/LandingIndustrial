"use client";

import { useRouter } from "next/navigation";
import type { SessionUser } from "@/lib/auth/types";
import { clearSession } from "@/lib/auth/session";

type UserBadgeProps = {
  user: SessionUser;
};

export function UserBadge({ user }: UserBadgeProps) {
  const router = useRouter();

  const logout = () => {
    clearSession();
    router.replace("/login");
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="rounded-full border border-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-am-silver">
        {user.displayName}
      </div>
      <div className="rounded-full border border-am-primary/40 bg-am-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-am-primaryStrong">
        Rol: {user.role}
      </div>
      <button
        type="button"
        onClick={logout}
        className="rounded-full border border-red-400/40 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-red-300"
      >
        Salir
      </button>
    </div>
  );
}
