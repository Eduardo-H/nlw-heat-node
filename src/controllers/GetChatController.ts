import { Request, Response } from 'express';
import { GetChatService } from '../services/GetChatService';

class GetChatController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const { user_id } = request;

    const service = new GetChatService();

    const result = await service.execute(id, user_id);

    return response.status(200).json(result);
  }
}

export { GetChatController };