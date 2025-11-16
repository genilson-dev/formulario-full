import { Router } from "express";
import { CreateUserController } from "../controller/CreateUserController";
import  ListUsersController from "../controller/ListAllUserController";
import FindUserByIdController from "../controller/FindUserByIdController";
import UpdateUserController from "../controller/UpdateUserController";
import DeleteUserController from "../controller/DeleteUserController";
import AuthUserController from "../controller/LoginControlle";
import isAuthenticated from "../middleware/authUserService";
import { SearchUserByNameController} from "../controller/SearchUserByNameController";
import { RecoveryController } from "../controller/recoveryController";
import CreateQuestionController from "../controller/questions/CreateControllerQuestion";
import ListQuestionsController from "../controller/questions/ListControllerQuestions";
import DeleteQuestionController from "../controller/questions/DeleteControllerQuestion";
import UpdateQuestionController from "../controller/questions/UpdateControllerQuestion";
import FindQuestionByIdController from "../controller/questions/ListQuestionByIdController";

const router = Router();

router.get("/teste", (req, res) => {
    return res.send("A rota teste esta funcionando com sucesso")
})

router.post("/user", new CreateUserController().handleCreateUser)
router.post("/login", new AuthUserController().handle)
router.get("/user/all", isAuthenticated, new ListUsersController().handle)
router.get("/user/:id", new FindUserByIdController().handle)
router.get("/user/:nome", new SearchUserByNameController().handle);

router.put("/user/update", isAuthenticated, new UpdateUserController().handle)
router.delete("/user/delete", isAuthenticated, new DeleteUserController().handle);

router.post("/recupera-senha", RecoveryController.requestRecovery);
router.post("/reset-senha", RecoveryController.resetPassword);


// Questoes
router.post("/create/question", isAuthenticated, new CreateQuestionController().handle)
router.get("/list/questions/all", isAuthenticated, new ListQuestionsController().handle)
router.put("/update/question/:id", isAuthenticated, new UpdateQuestionController().handle)
router.delete("/delete/question/:id", isAuthenticated, new DeleteQuestionController().handle);
router.get("/question/:id", isAuthenticated, new FindQuestionByIdController().handle);
export default router;
