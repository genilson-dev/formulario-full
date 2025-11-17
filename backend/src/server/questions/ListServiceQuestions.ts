import prismaDB from "../../prisma";

class ListServiceQuestions {
  async execute(page: number = 1, perPage: number = 5) {
    // calcula quantos registros pular
    const skip = (page - 1) * perPage;

    const questions = await prismaDB.question.findMany({
      skip,            // pula os registros das páginas anteriores
      take: perPage,   // quantidade de registros por página
      select: {
        id: true,
        title: true,
        description: true,
        ativo: true,
      },
      orderBy: {
        createdAt: "desc", // ou 'asc' conforme sua necessidade
      },
    });

    // total de registros para calcular páginas
    const total = await prismaDB.question.count();

    return {
      data: questions,
      meta: {
        total,
        page,
        perPage,
        totalPages: Math.ceil(total / perPage),
      },
    };
  }
}

export default ListServiceQuestions;
