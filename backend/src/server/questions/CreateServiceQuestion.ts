import prismaDB from "../../prisma";
import { QuestionRequest } from "../../interface/QuestionRequest";

class CreateServiceQuestion {
    async execute({title, description, userId, ativo}: QuestionRequest){
        if(!title){
            throw new Error("Title is required");
        }
        const newQuestion = await prismaDB.question.create({
            data: {
                title,
                description,
                userId,
                ativo: ativo !== undefined ? ativo : true,
            },
            select: {
                id: true,
                title: true,
                description: true,
                userId: true,
                ativo: true,
            }
        })
        return newQuestion;
    }
}
export default CreateServiceQuestion;


