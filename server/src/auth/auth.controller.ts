import { Controller, Post, Body, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { SignupCredentialDto } from './dto/signup-credentials.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  createUser(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  validateUser(
    @Body() signupCredentialDto: SignupCredentialDto,
  ): Promise<string> {
    return this.authService.signIn(signupCredentialDto);
  }

  @Post('/validate')
  async validate(
    @Headers('authorization') authorization: string,
  ): Promise<string | undefined> {
    if (authorization && authorization.startsWith('Bearer ')) {
      const token = authorization.substring(7); // Remove 'Bearer ' from the header
      return this.authService.validateToken(token);
    }
  }
}
