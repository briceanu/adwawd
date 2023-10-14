import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
// import { SignupCredentialDto } from './dto/signup-credentials.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  createUser(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  //   @Post('/signin')
  //   validateUser(
  //     @Body() signupCredentialDto: SignupCredentialDto,
  //   ): Promise<{ accessToken: string }> {
  //     return this.authService.signIn(signupCredentialDto);
  //   }
}
