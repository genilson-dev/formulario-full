import { Role } from "@prisma/client";
export interface UserRequest {
  id?: string;
  name?: string;
  email?: string;
  role?: Role;
  ativo?: boolean;
  password?: string;
}
