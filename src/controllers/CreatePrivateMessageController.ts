import { Request, Response } from 'express';
import { CreatePrivateMessageService } from '../services/CreatePrivateMessageService';

class CreatePrivateMessageController {
  async handle(request: Request, response: Response) {
    const { id, text } = request.body;
    const { user_id } = request;

    const service = new CreatePrivateMessageService();

    const result = await service.execute({ id, text, user_id });

    return response.status(201).json(result);
  }
}

export { CreatePrivateMessageController };