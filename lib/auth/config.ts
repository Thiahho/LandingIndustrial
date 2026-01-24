import type { Role, SessionUser } from "@/lib/auth/types";

type AuthRecord = {
  password: string;
  user: SessionUser;
};

type AuthMatrix = Record<Role, Record<string, AuthRecord>>;

export const SESSION_KEY = "amseguridad.session";

export const authMatrix: AuthMatrix = {
  admin: {
    admin: {
      password: "Admin123*",
      user: {
        username: "admin",
        role: "admin",
        displayName: "Administrador"
      }
    }
  },
  empleado: {
    empleado: {
      password: "Empleado123*",
      user: {
        username: "empleado",
        role: "empleado",
        displayName: "Empleado"
      }
    }
  }
};
