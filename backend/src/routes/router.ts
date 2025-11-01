import { Router } from "express";
import { CreateUserController } from "../controller/CreateUserController";
import { ListUsersController } from "../controller/ListAllUserController";
import { FindUserByIdController } from "../controller/FindUserByIdController";

const router = Router();

router.get("/teste", (req, res) => {
    return res.send("A rota teste esta funcionando com sucesso")
})

router.post("/create", new CreateUserController().handleCreateUser)
router.get("/list/all/user", new ListUsersController().handle)
router.get("/user/:id", new FindUserByIdController().handle)
export default router;
