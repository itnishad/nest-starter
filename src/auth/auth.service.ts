import { BadRequestException, Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { UserService } from 'src/user/user.service';
import { SignUpDto } from './dto/signUpSchema.dto';
@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signUp(user: SignUpDto) {
    const isUserExist = await this.userService.findUserByEmail(user.email);
    if (isUserExist) {
      return new BadRequestException('Email already exist.');
    }
    user.password = await argon2.hash(user.password);

    return this.userService.createUser(user);
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findUserByEmail(email);
    if (!user) {
      return null;
    }
  }
}
