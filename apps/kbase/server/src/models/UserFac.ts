import { prisma } from "../lib/prisma";

export class UserFac {
  // get user with deck and baseCards
  static async getOne(id: string) {
    const user = prisma.user.findUnique({
      where: { id },
      include: {
        deck: {
          include: {
            baseCard: true,
          },
        },
      },
    });
    return user;
  }
}
