import { BadRequestException, Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { UserService } from 'src/user/user.service';
import { SignUpDto } from './dto/signUpSchema.dto';
import { AuthJwtPayload } from './types/auth-jwtPayload';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(user: SignUpDto) {
    const isUserExist = await this.userService.findUserByEmail(user.email);
    if (isUserExist) {
      return new BadRequestException('Email already exist.');
    }
    user.password = await argon2.hash(user.password);

    return this.userService.createUser(user);
  }

  login(userId: number) {
    const payload: AuthJwtPayload = {
      sub: userId,
    };
    return this.jwtService.sign(payload);
  }

  async validateUser(email: string, userPassword: string) {
    const user = await this.userService.findUserByEmail(email);
    if (!user) {
      return null;
    }
    const isPasswordValid = await argon2.verify(user.password, userPassword);

    if (!isPasswordValid) {
      return null;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
