import { Request, Response } from 'express';
import { AuthenticateUserService } from '../services/AuthenticateUserService';

class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const { code, type } = request.body;

    const service = new AuthenticateUserService();

    try {
      const result = await service.execute(code, type);
      return response.status(200).json(result);
    } catch (err) {
      return response.json(err.message);
    }
  }
}

export { AuthenticateUserController };