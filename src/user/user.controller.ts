import {
  Controller,
  Get,
  NotFoundException,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Request } from 'express';
import { User } from './types/user';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUserProfile(@Req() req: Request) {
    const user = req.user as User;
    const userProfile = await this.userService.findUserById(user.sub);
    if (!userProfile) {
      return new NotFoundException('User Not Found');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutUser } = userProfile;

    return userWithoutUser;
  }
}
