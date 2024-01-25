import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { app } from 'firebase-admin';
import * as admin from 'firebase-admin';
import { FirebaseUserDto } from 'src/domain/dtos/auth/firebaseUser.dto';
import { LoggerService } from 'src/infrastructure/logger/logger.service';

@Injectable()
export class FirebaseService {
  constructor(
    @Inject('FIREBASE_APP') private firebaseApp: app.App,
    private readonly logger: LoggerService,
  ) {}

  public async authenticate(authToken: string): Promise<FirebaseUserDto> {
    const tokenString = this.getToken(authToken);
    try {
      const decodedToken: admin.auth.DecodedIdToken = await this.firebaseApp
        .auth()
        .verifyIdToken(tokenString);
      // const { email, uid, role } = decodedToken;
      const { email, uid } = decodedToken;
      return { email, uid };
    } catch (err) {
      this.logger.error('', `error while authenticate request ${err.message}`);
      throw new UnauthorizedException(err.message);
    }
  }

  private getToken(authToken: string): string {
    const match = authToken.match(/^Bearer (.*)$/);
    if (!match || match.length < 2) {
      throw new UnauthorizedException(
        'Invalid Authorization token - Token does not match Bearer .*',
      );
    }
    return match[1];
  }
}
