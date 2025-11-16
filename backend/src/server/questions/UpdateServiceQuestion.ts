import prismaDB from "../../prisma";
import { QuestionUpdateRequest } from "../../interface/QuestionRequest";

class UpdateQuestionService {
  async execute({ id, title, description, ativo }: QuestionUpdateRequest) {
    const questionExists = await prismaDB.question.findUnique({ where: { id } });

    if (!questionExists) {
      throw new Error("Questão não encontrada.");
    }

    const updatedQuestion = await prismaDB.question.update({
      where: { id },
      data: {
        title,
        description,
        ativo,
      },
      select: {
        id: true,
        title: true,
        description: true,
        ativo: true,
        created_at: true,
        updated_at: true,
      },
    });

    return updatedQuestion;
  }
}

export default UpdateQuestionService;


