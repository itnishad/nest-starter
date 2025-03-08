import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Post,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { SignUpDto, signUpSchema } from './dto/signUpSchema.dto';
import { ZodValidationPipe } from 'src/zodValidation.pipe';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local.guard';
import { Request } from 'express';
import { User } from './types/user';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ZodValidationPipe(signUpSchema))
  @Post('/signup')
  async signIn(@Body() user: SignUpDto) {
    try {
      return await this.authService.signUp(user);
    } catch (error) {
      return new InternalServerErrorException(
        'There is an server side exception',
      );
    }
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async logIn(@Req() req: Request) {
    try {
      const user = req.user as User;
      const token = this.authService.login(user.id);
      return {
        user,
        token,
      };
    } catch (error) {
      return new InternalServerErrorException(
        'There is an server side exception',
      );
    }
  }
}
