import { Request, Response } from 'express';

import { container } from 'tsyringe';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import UserMap from '../mappers/UserMap';

export default class SessionsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user: userUpdated, token } = await authenticateUser.execute({
      email,
      password,
    });

    const user = UserMap.toDTO(userUpdated);

    return response.json({ user, token });
  }
}
