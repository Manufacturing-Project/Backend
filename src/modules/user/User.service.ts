/* eslint-disable prettier/prettier */
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from '../authentication/schemas/User.schemas';
import { CreateUserDto } from '../authentication/dto/User.dto';


@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    const { email, username, password, confirmPassword } = createUserDto;
    if (password !== confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new BadRequestException('Email is already registered');
    }
    const hashedPassword = await bcrypt.hash(password, 8);
    const user = new this.userModel({
      email,
      username,
      password: hashedPassword,
    });

    return user.save();
  }

  
 async findByUsernam(username: string): Promise<User | undefined> {
    return this.userModel.findOne((user: { username: string; }) => user.username === username);
  }
}
   


