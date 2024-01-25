import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { FirebaseModule } from './firebase/firebase.module';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../repositories/user.repository';
import { ProfileRepository } from '../repositories/profile.repository';

@Module({
  imports: [
    FirebaseModule,
    TypeOrmModule.forFeature([UserRepository, ProfileRepository]),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserRepository, ProfileRepository],
})
export class AuthModule {}
