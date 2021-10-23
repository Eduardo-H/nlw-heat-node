import prismaClient from '../prisma';

import { io } from '../app';

interface IPayload {
  id: string;
  text: string;
  user_id: string;
}

class CreatePrivateMessageService {
  async execute({ id, text, user_id }: IPayload) {
    // Verifying if the chat exists
    const chatExists = await prismaClient.chat.findUnique({
      where: {
        id
      }
    });

    if (!chatExists) {
      throw new Error('Chat not found');
    }

    // Creating the new message
    const message = await prismaClient.message.create({
      data: {
        text,
        user_id,
        public: false
      },
      include: {
        user: true
      }
    });

    // Updating the chat with the new message
    const chat = await prismaClient.chat.update({
      where: {
        id
      },
      data: {
        messages: {
          connect: {
            id: message.id
          }
        }
      }
    });

    // Sending the message through web socket
    const infoWS = {
      id: message.id,
      text: message.text,
      user_id: message.user_id,
      created_at: message.created_at,
      user: {
        name: message.user.name,
        avatar_url: message.user.avatar_url
      }
    };

    io.emit(`new_private_message_${chat.id}`, infoWS);

    return chat;
  }
}

export { CreatePrivateMessageService };