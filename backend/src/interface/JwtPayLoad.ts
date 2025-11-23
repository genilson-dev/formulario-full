import { JwtPayload } from "jsonwebtoken";

interface CustomJwtPayload extends JwtPayload {
  role: string;
  id: string; // se você também guarda o id do usuário
  email: string; // se guarda email
}
export default CustomJwtPayload;