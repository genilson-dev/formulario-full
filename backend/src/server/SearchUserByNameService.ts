import {prismaDB} from "../prisma";

class SearchUserByNameService {
  async execute({ name, email }: SearchRequest) {
    if (!name || !email) {
      throw new Error("Nome ou email não fornecido.");
    }

    const user = await prismaDB.user.findMany({
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

