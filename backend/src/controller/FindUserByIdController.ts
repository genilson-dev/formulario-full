import { Request, Response } from 'express';

import FindUserByIdService from '../server/FindUserByIdServer';
export class FindUserByIdController {
  async handle(req: Request, res: Response) {
    const id = req.params.id;

    try {
      const service = new FindUserByIdService();
      const user = await service.execute(id);
      return res.status(200).json(user);
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  }
}
