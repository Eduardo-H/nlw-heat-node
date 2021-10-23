import axios from 'axios';
import prismaClient from '../prisma';
import { sign } from 'jsonwebtoken';

interface IAccessTokenResponse {
  access_token: string;
}

interface IUserResponse {
  id: number;
  name: string;
  avatar_url: string;
  login: string;
}

class AuthenticateUserService {
  async execute(code: string, type: string) {
    const url = 'https://github.com/login/oauth/access_token';

    let client_id: string, client_secret: string;

    if (type.toLocaleLowerCase() === 'web') {
      client_id = process.env.GITHUB_CLIENT_ID_WEB;
      client_secret = process.env.GITHUB_CLIENT_SECRET_WEB;
    } else if (type.toLocaleLowerCase() === 'mobile') {
      client_id = process.env.GITHUB_CLIENT_ID_MOBILE;
      client_secret = process.env.GITHUB_CLIENT_SECRET_MOBILE;
    } else {
      throw new Error('Invalid type');
    }

    const { data: accessTokenResponse } = await axios.post<IAccessTokenResponse>(url, null, {
      params: {
        client_id,
        client_secret,
        code
      },
      headers: {
        'Accept': 'application/json'
      }
    });

    const response = await axios.get<IUserResponse>('https://api.github.com/user', {
      headers: {
        authorization: `Bearer ${accessTokenResponse.access_token}`
      }
    });

    const { login, id, avatar_url, name } = response.data;

    let user = await prismaClient.user.findFirst({
      where: {
        github_id: id
      }
    });

    if (!user) {
      user = await prismaClient.user.create({
        data: {
          github_id: id,
          login,
          avatar_url,
          name
        }
      });
    }

    const token = sign({
      user: {
        name: user.name,
        avatar_url: user.avatar_url,
        id: user.id
      },
    },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: '1d'
      });

    return { token, user };
  }
}

export { AuthenticateUserService };