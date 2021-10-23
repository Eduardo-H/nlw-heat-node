import prismaClient from '../prisma';

class CreatePrivateChatService {
  async execute(user_id: string, contact_id: string) {
    const existingChat = await prismaClient.chat.findFirst({
      where: {
        users: {
          some: {
            id: user_id,
          }
        },
        AND: {
          users: {
            some: {
              id: contact_id
            }
          }
        }
      },
      include: {
        users: true,
        messages: true
      }
    });

    if (existingChat) {
      return existingChat;
    }

    const contact = await prismaClient.user.findUnique({
      where: { id: contact_id }
    });

    if (!contact) {
      throw new Error('User not found');
    }

    const chat = await prismaClient.chat.create({
      data: {
        users: {
          connect: [
            {
              id: user_id,
            },
            {
              id: contact_id
            }
          ]
        }
      },
      include: {
        users: true,
        messages: true
      }
    });

    return chat;
  }
}

export { CreatePrivateChatService };