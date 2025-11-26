import { Role } from "@prisma/client";

export interface UpdateUserDTO {
  id: string;
  name?: string;
  title?: string;
  email?: string;
  password?: string;
  ativo: boolean;
  role?: Role;
  description?: string;
}