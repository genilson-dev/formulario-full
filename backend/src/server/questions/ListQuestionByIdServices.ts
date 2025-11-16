import prismaDB from '../../prisma';
import { LisQuestionRequest } from '../../interface/ListUserRequest';

class FindQuestionByIdService {
  async execute({ id }: LisQuestionRequest) {
    if (!id) {
      throw new Error("O id nao fo encontrado.");
    }

    const question = await prismaDB.question.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        description: true,
        userId: true,
        ativo: true,
        created_at: true,
        updated_at: true,
      },
    });


    if (id.length === 0) {
      throw new Error("Questao nao encontrada para esse id");
    }

    if (!question) {
      throw new Error("Questao nao encontrada para esse id");
    }
    console.log("eu sou o aquivo server ", question);


    return question;
  }
}

export default FindQuestionByIdService;
