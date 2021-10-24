import prismaClient from '../prisma';

class GetUserChatsService {
  async execute(user_id: string) {
    const chats = await prismaClient.chat.findMany({
      where: {
        users: {
          some: {
            id: user_id,
          }
        }
      },
      include: {
        users: {
          where: {
            id: {
              not: user_id
            }
          }
        },
        messages: {
          take: 1,
          orderBy: {
            created_at: 'desc'
          }
        }
      }
    });

    return chats;
  }
}

export { GetUserChatsService };