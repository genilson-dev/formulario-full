import prisma from '../prisma';
import { UserRequest } from '../interface/UserRequest';
class FindUserByIdService {
  async execute({id}: UserRequest) {
    const user = await prisma.user.findFirst({
      where: { id},
      select: {
        id: true,
        name: true,
        email: true,
        created_at: true,
        updated_at: true
      }
    });

    return user;
  }
}

export default FindUserByIdService;