import { Request, Response } from 'express';
import FindUserByIdService from '../server/FindUserByIdServer';

// class FindUserByIdController {
//   async handle(req: Request, res: Response) {
//     const { id } = req.params;

//     try {
//       const service = new FindUserByIdService();
//       const user = await service.execute({ id }); // Corrigido: passa como objeto
//       console.log("eu sou o controller ", user);
      

//       return res.status(200).json(user);
//     } catch (error: any) {
//       console.error('Erro ao buscar usuário por ID:', error.message);
//       return res.status(404).json({ error: error.message });
//     }
//   }
// }
// export default FindUserByIdController
class FindUserByIdController{
  async handle(req: Request, res: Response){
    const {id} = req.params
    try {
      const listUser = new FindUserByIdService();
      const user = await listUser.execute({id});
      console.log("Eu sou o user do listcontroller: ", user);
      res.json(user)
      
    } catch (error) {
      res.status(500).json({err: error.message})      
    }
  }
}

export default FindUserByIdController