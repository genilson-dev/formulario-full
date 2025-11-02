import { Request, Response } from 'express';
import ListAllUsersService from '../server/ListAllUserServer';

export class ListUsersController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const listUsersService = new ListAllUsersService();
      const users = await listUsersService.execute();

      return res.status(200).json(users);
    } catch (error: any) {
      console.error('Erro ao listar usuários:', error.message);
      return res.status(500).json({ error: 'Erro interno ao listar usuários.' });
    }
  }
}
