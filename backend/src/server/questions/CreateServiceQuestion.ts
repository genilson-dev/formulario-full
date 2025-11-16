import prismaDB from "../../prisma";
import { QuestionRequest } from "../../interface/QuestionRequest";

class CreateQuestionService {
  async execute(data: QuestionRequest | QuestionRequest[]) {
    // Se for um array → várias questões
    if (Array.isArray(data)) {
      // validação básica para cada questão
      for (const q of data) {
        if (!q.title || q.title.trim().length === 0) {
          throw new Error("Título da questão é obrigatório.");
        }
        if (!q.userId) {
          throw new Error("Usuário não autenticado.");
        }

        const optionsMap: Record<string, string> = {
          a: q.optionA,
          b: q.optionB,
          c: q.optionC,
          d: q.optionD,
          e: q.optionE,
        };

        for (const key of ["a", "b", "c", "d", "e"]) {
          if (!optionsMap[key]) {
            throw new Error(`Alternativa '${key}' é obrigatória.`);
          }
        }

        if (!["a", "b", "c", "d", "e"].includes(q.correctOption)) {
          throw new Error("Alternativa correta deve ser uma das letras: a, b, c, d, e.");
        }
      }

      // inserção em lote
      const result = await prismaDB.question.createMany({
        data: data.map(q => ({
          userId: q.userId,
          title: q.title,
          description: q.description,
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

    // Se for uma única questão
    const {
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
    } = data;

    if (!title || title.trim().length === 0) {
      throw new Error("Título da questão é obrigatório.");
    }
    if (!userId) {
      throw new Error("Usuário não autenticado.");
    }

    const optionsMap: Record<string, string> = {
      a: optionA,
      b: optionB,
      c: optionC,
      d: optionD,
      e: optionE,
    };

    for (const key of ["a", "b", "c", "d", "e"]) {
      if (!optionsMap[key]) {
        throw new Error(`Alternativa '${key}' é obrigatória.`);
      }
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
