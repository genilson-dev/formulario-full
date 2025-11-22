import { Router } from "express";
import { CreateUserController } from "../controller/CreateUserController";
import  ListUsersController from "../controller/ListAllUserController";
import FindUserByIdController from "../controller/FindUserByIdController";
import UpdateUserController from "../controller/UpdateUserController";
// import {DeleteUserController} from "../controller/CreateUserController";
import AuthUserController from "../controller/LoginControlle";
import isAuthenticated from "../middleware/authUserService";
import { SearchUserByNameController} from "../controller/SearchUserByNameController";
import { RecoveryController } from "../controller/recoveryController";
// import CreateQuestionController from "../controller/questions/CreateControllerQuestion";
import ListQuestionsController from "../controller/questions/ListControllerQuestions";
import DeleteQuestionController from "../controller/questions/DeleteControllerQuestion";
import UpdateQuestionController from "../controller/questions/UpdateControllerQuestion";
import FindQuestionByIdController from "../controller/questions/ListQuestionByIdController";
import CreateControllerQuestion from "../controller/questions/CreateControllerQuestion";
import ListQuestionsByCategoryController from "../controller/questions/ListQuestionByCategoryController";
import DeleteUserController from "../controller/DeleteUserController";
import CreateMusicController from "../controller/music/CreateMusicController";
import ListMusicController from "../controller/music/ListMusicController";
import ListAllAtivosMusicController from "../controller/music/ListMusicActivatedController";
import ListAllInactivatedMusicController from "../controller/music/ListMusicInactivatedController";
import UpdateMusicController from "../controller/music/UpdateMusicController";
// import { SearchMusicByNameController } from "../controller/music/ListMusicByNameController";
import SearchMusicByNameController from "../controller/music/ListMusicByNameController";
import ListMusicByIdController from "../controller/music/ListMusicByIdController";
const router = Router();

router.get("/teste", (req, res) => {
    return res.send("A rota teste esta funcionando com sucesso")
})

router.post("/user/create", new CreateUserController().handleCreateUser)
router.post("/login", new AuthUserController().handle)
router.get("/user/all", isAuthenticated, new ListUsersController().handle)
router.get("/list/user/:id", new FindUserByIdController().handle)
router.get("/user/:name", new SearchUserByNameController().handle);

router.put("/user/update", isAuthenticated, new UpdateUserController().handle)
router.delete("/user/delete", isAuthenticated, new DeleteUserController().delete);

router.post("/recupera-senha", RecoveryController.requestRecovery);
router.post("/reset-senha", RecoveryController.resetPassword);


// Questoes
router.post("/create/question", isAuthenticated, new CreateControllerQuestion().handleCreate);

router.get("/list/questions/all", isAuthenticated, new ListQuestionsController().handle)
router.put("/update/question/:id", isAuthenticated, new UpdateQuestionController().handle)
router.delete("/delete/question/:id", isAuthenticated, new DeleteQuestionController().handle);
router.get("/question/:id", isAuthenticated, new FindQuestionByIdController().handle);
router.get("/questions/category", isAuthenticated, new ListQuestionsByCategoryController().handle);

// Musica
router.post("/create/music", isAuthenticated, new CreateMusicController().create);
router.get("/music/all", isAuthenticated, new ListMusicController().handle);
router.get("/music/activated", isAuthenticated, new ListAllAtivosMusicController().handle);
router.get("/music/inactivated", isAuthenticated, new ListAllInactivatedMusicController().handle);
router.put("/music/update", isAuthenticated, new UpdateMusicController().handle);
router.get("/music/:name", isAuthenticated, new SearchMusicByNameController().handle);
router.get("/music/id/:id", isAuthenticated, new ListMusicByIdController().handle);
export default router;
