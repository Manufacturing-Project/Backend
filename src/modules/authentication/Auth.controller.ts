/* eslint-disable prettier/prettier */

import { Body, Controller, Post  } from '@nestjs/common';
import { AuthService } from './Auth.service';
import { CreateUserDto } from './dto/User.dto';
import { LoginDto } from './dto/Auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() signUpDto: CreateUserDto): Promise<{ token: string }> {
    return this.authService.signUp(signUpDto);
  }

  @Post('/login')
  login(@Body() LoginDto: LoginDto): Promise<{ token: string }> {
    return this.authService.login(LoginDto);
  }
}
