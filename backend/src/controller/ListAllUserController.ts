import { Request, Response } from 'express';

import ListAllUserServicer from '../server/ListAllUserServer';
export class ListUsersController {
  async handle(req: Request, res: Response) {
    try {
      const service = new ListAllUserServicer();
      const users = await service.execute();
      return res.status(200).json(users);
    } catch (error) {
      console.error('Erro ao listar usuários:', error);
      return res.status(500).json({ error: 'Erro interno ao listar usuários' });
    }
  }
}
