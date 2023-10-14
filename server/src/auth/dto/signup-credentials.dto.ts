import { IsString } from 'class-validator';

export class SignupCredentialDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
