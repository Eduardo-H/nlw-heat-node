import { Request, Response } from 'express';
import { GetUserChatsService } from '../services/GetUserChatsService';

class GetUserChatsController {
  async handle(request: Request, response: Response) {
    const { user_id } = request;

    const service = new GetUserChatsService();

    const result = await service.execute(user_id);

    return response.status(200).json(result);
  }
}

export { GetUserChatsController };