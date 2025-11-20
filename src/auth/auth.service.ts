import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  parseBasicToken(rawToken: string): { email: string; password: string } {
    if (!rawToken || !rawToken.startsWith('Basic '))
      throw new BadRequestException('Invalid authorization header');
    const basicSplit = rawToken.split(' ');
    if (basicSplit.length !== 2)
      throw new BadRequestException('Invalid authorization header');

    const decoded = Buffer.from(basicSplit[1], 'base64').toString('utf-8');
    const credentialSplit = decoded.split(':');
    if (credentialSplit.length !== 2)
      throw new BadRequestException('Invalid authorization header');

    const [email, password] = credentialSplit;
    return { email, password };
  }

  async registerUser(rawToken: string) {
    const { email, password } = this.parseBasicToken(rawToken);

    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (user) {
      throw new BadRequestException('User already exists');
    }

    const encrypted = await bcrypt.hash(
      password,
      this.configService.get<number>('HASH_ROUNDS', 10),
    );

    await this.userRepository.save({
      email,
      password: encrypted,
    });
  }

  async issueToken(user: User, isRefreshToken: boolean) {
    const accessTokenSecret: string = this.configService.get<string>(
      'ACCESS_TOKEN_SECRET',
      '',
    );
    const refreshTokenSecret: string = this.configService.get<string>(
      'REFRESH_TOKEN_SECRET',
      '',
    );

    return await this.jwtService.signAsync(
      {
        sub: user.id,
        role: user.role,
        type: isRefreshToken ? 'refresh' : 'access',
      },
      {
        secret: isRefreshToken ? refreshTokenSecret : accessTokenSecret,
        expiresIn: isRefreshToken ? '45m' : '15m',
      },
    );
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) throw new BadRequestException('Invalid credentials');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new BadRequestException('Invalid credentials');

    return user;
  }

  async login(rawToken: string) {
    const { email, password } = this.parseBasicToken(rawToken);

    const user = await this.validateUser(email, password);

    return {
      accessToken: await this.issueToken(user, false),
      refreshToken: await this.issueToken(user, true),
    };
  }
}
