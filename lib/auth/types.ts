export type Role = "admin" | "empleado";

export type SessionUser = {
  username: string;
  role: Role;
  displayName: string;
};

export type LoginPayload = {
  username: string;
  password: string;
  role: Role;
};
