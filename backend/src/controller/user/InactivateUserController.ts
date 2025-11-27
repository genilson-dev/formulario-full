import { Request, Response } from "express";
// import { InactivateUserService } from "../../services/user/InactivateUserService";
import { InactivateUserService } from "../../server/user/InactivateUserService";
class InactivateUserController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const { ativo } = req.body;
    
    if (ativo === undefined) {
      return res.status(400).json({ error: "Campo 'ativo' é obrigatório." });
    }
    
    try {
      const service = new InactivateUserService();
      const result = await service.execute({
        id,
        ativo,
      });
      
      
      return res.json(result);
    } catch (err: any) {
      console.error(err);
      return res.status(400).json({ error: err.message });
    }
  }
}

export { InactivateUserController };
