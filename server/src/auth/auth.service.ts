import { Injectable } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UsersRepository } from './users.repository';
import { SignupCredentialDto } from './dto/signup-credentials.dto';

@Injectable()
export class AuthService {
  constructor(private usersRepository: UsersRepository) {}

  signUp(authCredentialsDto: AuthCredentialsDto) {
    return this.usersRepository.createUser(authCredentialsDto);
  }

  signIn(signupCredentialDto: SignupCredentialDto): Promise<string> {
    return this.usersRepository.signIn(signupCredentialDto);
  }

  validateToken(token: string): Promise<string | undefined> {
    return this.usersRepository.validate(token);
  }
}
