import type { Role } from "@/lib/auth/types";

export const permissionsByRole: Record<Role, string[]> = {
  admin: [
    "Cambiar imágenes",
    "Editar textos",
    "Subir novedades",
    "Gestionar recursos y productos tecnológicos",
    "Actualizar contenidos sin depender del proveedor",
    "Publicar contenido",
    "Auditoría completa",
    "Administrar usuarios y lineamientos internos"
  ],
  empleado: [
    "Cambiar imágenes",
    "Editar textos",
    "Subir novedades",
    "Gestionar recursos y productos tecnológicos",
    "Actualizar contenidos sin depender del proveedor",
    "Publicar contenido"
  ]
};
