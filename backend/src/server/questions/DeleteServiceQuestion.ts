import {prismaDB} from "../../prisma";

class DeleteQuestionService {
  async execute(id: string) {
    const questionExists = await prismaDB.question.findUnique({ where: { id } });

    if (!questionExists) {
      throw new Error("Questão não encontrada.");
    }

    await prismaDB.question.delete({ where: { id } });

    return { message: "Questão excluída com sucesso." };
  }
}

export default DeleteQuestionService;


