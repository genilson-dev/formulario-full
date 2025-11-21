// import { PrismaClient } from "@prisma/client";

// const prismaDB = new PrismaClient();

// export default prismaDB;   // ✅ agora existe um default export

import { PrismaClient } from "@prisma/client";

export const prismaDB = new PrismaClient();
// export default prisma; // ❌ removido o default export

