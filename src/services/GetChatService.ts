import prismaClient from '../prisma';

class GetChatService {
  async execute(id: string, user_id: string) {
    const chat = await prismaClient.chat.findUnique({
      where: {
        id
      },
      include: {
        users: true,
        messages: true
      }
    });

    if (!chat) {
      throw new Error('Chat not found');
    }

    const chatBelognsToUser = chat.users.find(user => user.id === user_id);

    if (!chatBelognsToUser) {
      throw new Error('Chat does not belong to this user');
    }

    return chat;
  }
}

export { GetChatService };