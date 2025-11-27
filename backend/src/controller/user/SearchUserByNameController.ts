import { Request, Response } from 'express';
import SearchUserByNameService from '../../server/user/SearchUserByNameService';

export class SearchUserByNameController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, email } = req.params;

    try {
      const service = new SearchUserByNameService();
      const user = await service.execute({
        name: name as string,
        email: email as string,
      });

      return res.status(200).json(user);
    } catch (error: any) {
      console.error("Erro ao buscar usuário:", error.message);
      return res.status(400).json({ error: error.message });
    }
  }
}
