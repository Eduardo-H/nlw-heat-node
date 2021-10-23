import { Request, Response } from 'express';
import { CreatePrivateChatService } from '../services/CreatePrivateChatService';

class CreatePrivateChatController {
  async handle(request: Request, response: Response) {
    const { contact_id } = request.body;
    const { user_id } = request;

    const service = new CreatePrivateChatService();

    const result = await service.execute(user_id, contact_id);

    return response.status(200).json(result);
  }
}

export { CreatePrivateChatController };