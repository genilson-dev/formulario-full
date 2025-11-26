// // src/controllers/UpdateUserController.ts
// import { Request, Response } from "express";
// import UpdateUserService from "../server/UpdateUserService";

// class UpdateUserController {
//   async handle(req: Request, res: Response): Promise<Response> {
//     try {
//       const { id, name, email, password, ativo, role } = req.body;

//       if (!id) {
//         return res.status(400).json({ error: "ID é obrigatório." });
//       }

//       console.log("ID recebido no update:", id);

//       const updateUser = new UpdateUserService();
//       const user = await updateUser.execute({ id, name, email, password, ativo, role });

//       return res.status(200).json(user);
//     } catch (error: any) {
//       console.error("Erro ao atualizar usuário:", error.message);

//       // Tratamento mais claro dos erros
//       if (error.message.includes("não encontrado")) {
//         return res.status(404).json({ error: error.message });
//       }
//       if (
//         error.message.includes("Email já está em uso") ||
//         error.message.includes("Nenhum campo para atualizar") ||
//         error.message.includes("ID é obrigatório")
//       ) {
//         return res.status(400).json({ error: error.message });
//       }

//       return res.status(500).json({ error: "Erro inesperado ao atualizar usuário." });
//     }
//   }
// }

// export default UpdateUserController;


// src/controller/DeleteUserController.ts


import { Request, Response } from "express";
import UpdateUserService from "../server/UpdateUserService";

class UpdateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      console.log("[Back] UpdateUserController called. method:", req.method, "path:", req.path);
      const { id } = req.params;
      const { name, email, password, ativo, role } = req.body;
      console.log("[Back] params:", req.params, "body:", req.body);

      if (!id) {
        return res.status(400).json({ error: "ID é obrigatório." });
      }

      const updateUser = new UpdateUserService();
      const user = await updateUser.execute({
        id,
        name,
        email,
        password,
        ativo,
        role,
      });

      console.log("[Back] Update success:", user);
      return res.status(200).json(user);
    } catch (error: any) {
      console.error("[Back] Erro ao atualizar usuário:", error);
      return res.status(500).json({ error: error.message || "Erro ao atualizar usuário." });
    }
  }
}

export default UpdateUserController;
