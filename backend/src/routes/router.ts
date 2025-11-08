import { Router } from "express";
import { CreateUserController } from "../controller/CreateUserController";
import { ListUsersController } from "../controller/ListAllUserController";
import FindUserByIdController from "../controller/FindUserByIdController";
import UpdateUserController from "../controller/UpdateUserController";
import DeleteUserController from "../controller/DeleteUserController";
import AuthUserController from "../controller/LoginControlle";
import { isAuthenticated } from "../middleware/authUserService";
import { SearchUserByNameController} from "../controller/SearchUserByNameController";

const router = Router();

router.get("/teste", (req, res) => {
    return res.send("A rota teste esta funcionando com sucesso")
})

router.post("/user", new CreateUserController().handleCreateUser)
router.post("/login", new AuthUserController().handle)
router.get("/user/all", isAuthenticated, new ListUsersController().handle)
router.get("/user/:id", new FindUserByIdController().handle)
router.get("/user/:nome", new SearchUserByNameController().handle);

router.put("/user", isAuthenticated, new UpdateUserController().handle)
router.delete("/user", isAuthenticated, new DeleteUserController().handle);

export default router;
