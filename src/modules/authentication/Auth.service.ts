/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/User.schemas';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/User.dto';
import * as bcrypt from 'bcrypt';
import {LoginDto} from './dto/Auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User')
    private userModel: Model<UserDocument>,
    private  jwtService: JwtService,
  ) {}



  async signUp(signUpDto: CreateUserDto): Promise<{ token: string, user: User }> {

    const { email, username, password, confirmPassword } = signUpDto;
        if (password !== confirmPassword) {
          throw new BadRequestException('Passwords do not match');
        }
        const existingUser = await this.userModel.findOne({ email });
        if (existingUser) {
          throw new BadRequestException('Email is already registered');
        }
        const hashedPassword = await bcrypt.hash(password, 4);
        const user = new this.userModel({
          email,
          username,
          password: hashedPassword,
        });
    
    const token =  this.jwtService.sign({id: user._id});
    await user.save();
    return { token, user };
  }

      async login(Logindto: LoginDto): Promise<{ token: string }> {

        const { email, password } = Logindto;
        const user = await this.userModel.findOne({ email });
        console.log("User Found:", user); 

        if (!user) {
          throw new UnauthorizedException("Invalid Email or Password");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          throw new UnauthorizedException("Invalid Email or Password");
        }

        const token = this.jwtService.sign({ id: user._id });
        return { token};
      }
    
}
