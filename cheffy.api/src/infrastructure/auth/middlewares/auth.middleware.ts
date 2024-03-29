import {
  createParamDecorator,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { NextFunction, Request, Response } from 'express';
import { FirebaseService } from '../firebase/firebase.service';
import { FirebaseUserDto } from 'src/domain/dtos/auth/firebaseUser.dto';
import { ProfileDto } from 'src/domain/dtos/profile/profile.dto';

export interface RequestModel extends Request {
  user: FirebaseUserDto;
  profile: ProfileDto;
}
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly firebaseService: FirebaseService) {}

  public async use(req: RequestModel, _: Response, next: NextFunction) {
    try {
      const { authorization } = req.headers;

      if (!authorization) {
        throw new HttpException(
          { message: 'Missing authorization header' },
          HttpStatus.BAD_REQUEST,
        );
      }
      const user = await this.firebaseService.authenticate(authorization);
      req.user = user;
      next();
    } catch (err) {
      throw new HttpException(
        { message: 'Invalid token' },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
