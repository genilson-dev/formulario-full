import prismaDB from "../../prisma";
import { QuestionUpdateRequest } from "../../interface/QuestionRequest";

class UpdateQuestionService {
  async execute({
    id,
    title,
    description,
    ativo,
    optionA,
    optionB,
    optionC,
    optionD,
    optionE,
    correctOption,
  }: QuestionUpdateRequest) {
    const questionExists = await prismaDB.question.findUnique({ where: { id } });

    if (!questionExists) {
      throw new Error("Questão não encontrada.");
    }

    // validação das alternativas (se forem passadas)
    const optionsMap: Record<string, string | undefined> = {
      a: optionA,
      b: optionB,
      c: optionC,
      d: optionD,
      e: optionE,
    };

    for (const key of ["a", "b", "c", "d", "e"]) {
      if (optionsMap[key] !== undefined && !optionsMap[key]) {
        throw new Error(`Alternativa '${key}' não pode ser vazia.`);
      }
    }

    if (correctOption && !["a", "b", "c", "d", "e"].includes(correctOption)) {
      throw new Error("Alternativa correta deve ser uma das letras: a, b, c, d, e.");
    }

    const updatedQuestion = await prismaDB.question.update({
      where: { id },
      data: {
        title,
        description,
        ativo,
        optionA,
        optionB,
        optionC,
        optionD,
        optionE,
        correctOption,
      },
      select: {
        id: true,
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

    return updatedQuestion;
  }
}

export default UpdateQuestionService;
