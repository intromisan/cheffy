import {
  BadRequestException,
  Controller,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { FirebaseService } from './firebase/firebase.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: FirebaseService) {}

  @Post('/login')
  async signIn(@Res() response: Response, @Req() request: Request) {
    const { authorization: authToken } = request.headers;

    if (!authToken) {
      throw new BadRequestException('Missing authorization header');
    }

    try {
      const { uid, email } = await this.authService.authenticate(authToken);

      return response.status(200).send({ uid, email });
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
