import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { app } from 'firebase-admin';
import * as admin from 'firebase-admin';
import { LoggerService } from 'src/infrastructure/logger/logger.service';

@Injectable()
export class FirebaseService {
  constructor(
    @Inject('FIREBASE_APP') private firebaseApp: app.App,
    private readonly logger: LoggerService,
  ) {}

  public async authenticate(authToken): Promise<any> {
    const tokenString = this.getToken(authToken);
    try {
      const decodedToken: admin.auth.DecodedIdToken = await this.firebaseApp
        .auth()
        .verifyIdToken(tokenString);
      this.logger.log('', `${JSON.stringify(decodedToken)}`);
      console.log(decodedToken);
      const { email, uid, role } = decodedToken;
      return { email, uid, role };
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