import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/entities/user.entity';
import { AuthCredentialsDto, EmailDto, EmailVerificationDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-up')
  // By setting up the validation pipe globally in main.ts, no need for @Body(ValidationPipe) at handler level
  async signUp(@Body() createUserDto: CreateUserDto): Promise<void> {
    return this.authService.signUp(createUserDto);
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ token: string; user: Partial<User> }> {
    return this.authService.login(authCredentialsDto);
  }

  @Post('/verify-email')
  @HttpCode(HttpStatus.OK)
  verifyEmail(@Body() emailVerificationDto: EmailVerificationDto) {
    return this.authService.verifyEmail(emailVerificationDto);
  }

  @Post('/resend-email-verification-token')
  @HttpCode(HttpStatus.OK)
  resendEmailVerificationToken(@Body() emailDto: EmailDto) {
    return this.authService.resendEmailVerificationToken(emailDto);
  }

  @Post('/reset-password')
  @HttpCode(HttpStatus.OK)
  resetPassword(@Body() emailDto: EmailDto) {
    return this.authService.resetPassword(emailDto);
  }
}
