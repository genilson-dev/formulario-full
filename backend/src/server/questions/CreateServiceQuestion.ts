import prismaDB from "../../prisma";
import { QuestionRequest } from "../../interface/QuestionRequest";

class CreateQuestionService {
  async execute({
    id,
    userId,
    title,
    description,
    ativo,
    optionA,
    optionB,
    optionC,
    optionD,
    optionE,
    correctOption,
  }: QuestionRequest) {
    if (!title) throw new Error("Título da questão é obrigatório.");
    if (!userId) throw new Error("Usuário não autenticado.");

    // validação das alternativas
    const optionsMap: Record<string, string> = {
      a: optionA,
      b: optionB,
      c: optionC,
      d: optionD,
      e: optionE,
    };

    for (const key of ["a", "b", "c", "d", "e"]) {
      if (!optionsMap[key]) throw new Error(`Alternativa '${key}' é obrigatória.`);
    }

    if (!["a", "b", "c", "d", "e"].includes(correctOption)) {
      throw new Error("Alternativa correta deve ser uma das letras: a, b, c, d, e.");
    }

    const newQuestion = await prismaDB.question.create({
      data: {
        id,
        userId,
        title,
        description,
        ativo: ativo ?? true,
        optionA,
        optionB,
        optionC,
        optionD,
        optionE,
        correctOption,
      },
      select: {
        id: true,
        userId: true,
        title: true,
        description: true,
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
