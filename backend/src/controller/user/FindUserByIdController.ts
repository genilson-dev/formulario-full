// import { Request, Response } from "express";
// import FindUserByIdService from "../server/FindUserByIdServer";

// class FindUserByIdController {
//   async handle(req: Request, res: Response) {
//     console.log("ENTROU NA ROTA /user/id/:id")
//     const { id } = req.body;
//     console.log(`O id recebido foi: ${id}`)

//     if (!id) {
//       return res.status(400).json({ error: "ID do usuário não fornecido" });
//     }

//     try {
//       const findUserService = new FindUserByIdService();
//       const user = await findUserService.execute({ id });
//       console.log(user)

//       if (!user) {
//         return res.status(404).json({ error: "Usuário não encontrado" });
//       }

//       console.log("Usuário encontrado:", user);
//       return res.json(user);
//     } catch (error: any) {
//       console.error("Erro ao buscar usuário:", error);
//       return res.status(500).json({ error: error.message || "Erro interno no servidor" });
//     }
//   }
// }

// export default FindUserByIdController;

import { Request, Response } from "express";
import FindUserByIdService from "../../server/user/FindUserByIdServer";

class FindUserByIdController {
  async handle(req: Request, res: Response) {
    console.log("ENTROU NA ROTA /user/id/:id");

    // PEGAR O ID CORRETO DOS PARAMS
    const { id } = req.params;
    console.log(`O id recebido foi: ${id}`);

    if (!id) {
      return res.status(400).json({ error: "ID do usuário não fornecido" });
    }

    try {
      const findUserService = new FindUserByIdService();
      const user = await findUserService.execute({ id });

      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      console.log("Usuário encontrado:", user);
      return res.json(user);
    } catch (error: any) {
      console.error("Erro ao buscar usuário:", error);
      return res
        .status(500)
        .json({ error: error.message || "Erro interno no servidor" });
    }
  }
}

export default FindUserByIdController;
