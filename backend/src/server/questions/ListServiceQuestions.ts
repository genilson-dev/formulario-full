import {prismaDB} from "../../prisma";

class ListServiceQuestions {
  async execute(category?: string, page: number = 1, perPage: number = 5) {
    const skip = (page - 1) * perPage;

    const questions = await prismaDB.question.findMany({
      where: category ? { category } : {}, // se categoria vier, filtra
      skip,
      take: perPage,
      select: {
        id: true,
        title: true,
        description: true,
        category: true,
        ativo: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const total = await prismaDB.question.count({
      where: category ? { category } : {},
    });

    return {
      data: questions,
      meta: {
        total,
        page,
        perPage,
        totalPages: Math.ceil(total / perPage),
        category: category || "Todas",
      },
    };
  }
}

export default ListServiceQuestions;
