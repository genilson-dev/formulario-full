import prismaClient from "../prisma";

class SearchUserByNameService {
  async execute({ name, email }: SearchRequest) {
    if (!name || !email) {
      throw new Error("Nome não fornecido.");
    }

    const user = await prismaClient.user.findMany({
      where: {
        name: {
          contains: name,
          mode: "insensitive", // busca sem diferenciar maiúsculas/minúsculas
        },
        email: {
            contains: email,
            mode: "insensitive"
        }
      },
    });

    return user;
  }
}

export default SearchUserByNameService;