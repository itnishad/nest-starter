import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
  UsePipes,
} from '@nestjs/common';
import { SignUpDto, signUpSchema } from './dto/signUpSchema.dto';
import { ZodValidationPipe } from 'src/zodValidation.pipe';
import { AuthService } from './auth.service';
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
}
