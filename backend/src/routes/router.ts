import { Router } from "express";
import { CreateUserController } from "../controller/CreateUserController";

const router = Router();

router.get("/teste", (req, res) => {
    return res.send("A rota teste esta funcionando com sucesso")
})

router.post("/create", new CreateUserController().handleCreateUser)

export default router;
