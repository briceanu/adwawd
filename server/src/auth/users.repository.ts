import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import {
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignupCredentialDto } from './dto/signup-credentials.dto';
import { ConfigService } from '@nestjs/config';
import { Payload } from './jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

export class UsersRepository extends Repository<User> {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {
    super(
      usersRepository.target,
      usersRepository.manager,
      usersRepository.queryRunner,
    );
  }

  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.usersRepository.create({
      username,
      password: hashedPassword,
    });
    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        // duplicate user
        throw new ConflictException('User name already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async signIn(
    signupCredentialDto: SignupCredentialDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = signupCredentialDto;
    const user = await this.usersRepository.findOne({ where: { username } });
    const jwtOptions = {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: '10m',
    };

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: Payload = { username };
      const accessToken = this.jwtService.sign(payload, jwtOptions);

      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
}
