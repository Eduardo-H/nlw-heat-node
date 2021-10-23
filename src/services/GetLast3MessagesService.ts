import prismaClient from '../prisma';

class GetLast3MessagesService {
  async execute() {
    const messages = await prismaClient.message.findMany({
      take: 3,
      orderBy: {
        created_at: 'desc'
      },
      where: {
        public: true
      },
      include: {
        user: true
      }
    });

    return messages;
  }
}

export { GetLast3MessagesService };