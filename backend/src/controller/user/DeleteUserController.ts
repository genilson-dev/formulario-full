// // src/controller/DeleteUserController.ts
// import { Request, Response } from "express";
// import DeleteUserService from "../server/DeleteUserService";
// import { validate as uuidValidate } from "uuid";

// const deleteUserService = new DeleteUserService();

// class DeleteUserController {
//   async handle(req: Request, res: Response): Promise<Response> {
//     try {
//       const { id } = req.body;

//       console.log("ID recebido no delete:", id);

//       if (!id) {
//         return res.status(400).json({ error: "ID é obrigatório." });
//       }

//       if (!uuidValidate(id)) {
//         return res.status(400).json({ error: "ID inválido (não é um UUID válido)." });
//       }

//       const result = await deleteUserService.execute(id);

//       return res.status(200).json({
//         message: "Usuário excluído com sucesso!",
//         user: result,
//       });

//     } catch (error: any) {
//       console.error("Erro ao excluir usuário:", error.message);

//       if (error.message.includes("não encontrado")) {
//         return res.status(404).json({ error: error.message });
//       }

//       return res.status(500).json({ error: "Erro inesperado ao excluir usuário." });
//     }
//   }
// }

// export default DeleteUserController;


// src/controller/DeleteUserController.ts
import { Request, Response } from "express";
import DeleteUserService from "../../server/user/DeleteUserService";
import { validate as uuidValidate } from "uuid";

const deleteUserService = new DeleteUserService();

class DeleteUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      // 👇 PEGAR O ID CORRETO DOS PARAMS
      const { id } = req.params;

      console.log("ID recebido no delete:", id);

      if (!id) {
        return res.status(400).json({ error: "ID é obrigatório." });
      }

      if (!uuidValidate(id)) {
        return res.status(400).json({ error: "ID inválido (não é um UUID válido)." });
      }

      const result = await deleteUserService.execute(id);

      return res.status(200).json({
        message: "Usuário excluído com sucesso!",
        user: result,
      });

    } catch (error: any) {
      console.error("Erro ao excluir usuário:", error.message);

      if (error.message.includes("não encontrado")) {
        return res.status(404).json({ error: error.message });
      }

      return res.status(500).json({ error: "Erro inesperado ao excluir usuário." });
    }
  }
}

export default DeleteUserController;
