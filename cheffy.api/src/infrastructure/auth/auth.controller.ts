import {
  BadRequestException,
  Body,
  Controller,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import e, { Request, Response } from 'express';
import { FirebaseService } from './firebase/firebase.service';
import { RequestModel } from './middlewares/auth.middleware';
import { CreateUpdateProfileDto } from 'src/domain/dtos/profile/createUpdateProfile.dto';
import { SignUpDto } from 'src/domain/dtos/auth/signup.dto';
import { CreateUserDto } from 'src/domain/dtos/user/createUser.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly authService: AuthService,
  ) {}

  @Post('/login')
  async signIn(@Res() response: Response, @Req() request: Request) {
    const { authorization: authToken } = request.headers;

    if (!authToken) {
      throw new BadRequestException('Missing authorization header');
    }

    try {
      const { uid, email } = await this.firebaseService.authenticate(authToken);

      return response.status(200).send({ uid, email });
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  @Post('/signup')
  @UsePipes(ValidationPipe)
  async signUp(@Req() request: RequestModel, @Body() signUpDto: SignUpDto) {
    const { userName } = signUpDto;
    const { uid, email } = request.user;

    const createUpdateProfile = new CreateUpdateProfileDto();
    createUpdateProfile.profileName = userName;

    const createUserDto = new CreateUserDto();
    createUserDto.id = uid;
    createUserDto.email = email;

    await this.authService.signUp(createUserDto, createUpdateProfile);
  }
}
