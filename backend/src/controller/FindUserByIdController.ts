import { Request, Response } from 'express';
import FindUserByIdService from '../server/FindUserByIdServer';

export class FindUserByIdController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.body;

    try {
      const service = new FindUserByIdService();
      const user = await service.execute({ id }); // Corrigido: passa como objeto

      return res.status(200).json(user);
    } catch (error: any) {
      console.error('Erro ao buscar usuário por ID:', error.message);
      return res.status(404).json({ error: error.message });
    }
  }
}
