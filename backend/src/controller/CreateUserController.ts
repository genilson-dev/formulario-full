import { Request, Response } from 'express';
import CreateUserService from '../server/CreateUserServer';

class CreateUserController {
  async handleCreateUser(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;

    try {
      if (!name || !email || !password) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios: nome, email e senha." });
      }

      const createUserService = new CreateUserService();
      const newUser = await createUserService.execute({ name, email, password });

      return res.status(201).json(newUser);
    } catch (error: any) {
      console.error("Erro ao criar usuário:", error.message);
      return res.status(500).json({ error: error.message });
    }
  }
}

export { CreateUserController };
