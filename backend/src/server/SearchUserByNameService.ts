import prismaClient from "../prisma";

class SearchUserByNameService {
  async execute({ name, email }: SearchRequest) {
    if (!name || !email) {
      throw new Error("Nome ou email não fornecido.");
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

// import prismaClient from "../prisma";

// interface SearchRequest {
//   name: string;
//   email: string;
//   page?: number;       // página atual
//   limit?: number;      // quantos resultados por página
//   orderBy?: "asc" | "desc"; // ordenação alfabética
// }

// class SearchUserByNameService {
//   async execute({ name, email, page = 1, limit = 10, orderBy = "asc" }: SearchRequest) {
//     if (!name || !email) {
//       throw new Error("Nome e email são obrigatórios.");
//     }

//     const skip = (page - 1) * limit;

//     const users = await prismaClient.user.findMany({
//       where: {
//         name: {
//           contains: name,
//           mode: "insensitive",
//         },
//         email: {
//           contains: email,
//           mode: "insensitive",
//         },
//       },
//       orderBy: {
//         name: orderBy,
//       },
//       skip,
//       take: limit,
//     });

//     return users;
//   }
// }

// export default SearchUserByNameService;
