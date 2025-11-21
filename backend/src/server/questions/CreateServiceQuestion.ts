import { prismaDB } from "../../prisma";
import { QuestionRequest } from "../../interface/QuestionRequest";

class CreateQuestionService {
  async execute(data: QuestionRequest | QuestionRequest[]) {
    
    // 👉 Se for várias questões (ARRAY)
    if (Array.isArray(data)) {

      // 1️⃣ Validar cada userId antes de criar
      for (const q of data) {
        if (!q.userId) {
          throw new Error("userId está faltando em uma das questões.");
        }

        const userExists = await prismaDB.user.findUnique({
          where: { id: q.userId },
        });

        if (!userExists) {
          throw new Error(`Usuário não encontrado: ${q.userId}`);
        }
      }

      // 2️⃣ Criar todas as questões
      const result = await prismaDB.question.createMany({
        data: data.map(q => ({
          id: q.id,
          userId: q.userId,
          title: q.title,
          description: q.description,
          category: q.category,
          ativo: q.ativo ?? true,
          optionA: q.optionA,
          optionB: q.optionB,
          optionC: q.optionC,
          optionD: q.optionD,
          optionE: q.optionE,
          correctOption: q.correctOption,
        })),
      });

      return result; // { count: n }
    }

    // 👉 Se for UMA única questão
    if (!data.userId) {
      throw new Error("userId está faltando para a criação da questão.");
    }

    const userExists = await prismaDB.user.findUnique({
      where: { id: data.userId },
    });

    if (!userExists) {
      throw new Error(`Usuário não encontrado: ${data.userId}`);
    }

    const newQuestion = await prismaDB.question.create({
      data: {
        id: data.id,
        userId: data.userId,
        title: data.title,
        description: data.description,
        category: data.category,
        ativo: data.ativo ?? true,
        optionA: data.optionA,
        optionB: data.optionB,
        optionC: data.optionC,
        optionD: data.optionD,
        optionE: data.optionE,
        correctOption: data.correctOption,
      },
      select: {
        id: true,
        userId: true,
        title: true,
        description: true,
        category: true,
        ativo: true,
        optionA: true,
        optionB: true,
        optionC: true,
        optionD: true,
        optionE: true,
        correctOption: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return newQuestion;
  }
}

export default CreateQuestionService;
