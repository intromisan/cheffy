import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { ProfileService } from 'src/infrastructure/features/profile/profile.service';
import { RequestModel } from './auth.middleware';
import { NextFunction, Response } from 'express';

@Injectable()
export class ProfileMiddleware implements NestMiddleware {
  constructor(private readonly profileService: ProfileService) {}

  public async use(req: RequestModel, _: Response, next: NextFunction) {
    try {
      const { uid } = req.user;

      const profile = await this.profileService.findProfileByUserId(uid);

      if (!profile) {
        throw new HttpException(
          { message: 'Profile for this user does not exist' },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      req.profile = profile;
      next();
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
