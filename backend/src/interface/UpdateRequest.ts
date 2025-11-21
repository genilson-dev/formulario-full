export interface UpdateUserDTO {
  id: string;
  name?: string;
  title?: string;
  email?: string;
  password?: string;
  ativo: boolean;
  description?: string;
}