export type Role = "admin" | "empleado";

export type SessionUser = {
  id: number;
  username: string;
  role: Role;
  displayName: string;
  token: string;
};

export type LoginPayload = {
  username: string;
  password: string;
};

export type LoginResponse = {
  id: number;
  username: string;
  displayName: string;
  role: Role;
  token: string;
};
