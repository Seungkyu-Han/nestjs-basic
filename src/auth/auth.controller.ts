import { Controller, Post, Headers, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/user/entities/user.entity';
import { JwtAuthGuard } from './strategy/jwt.strategy';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  registerUser(@Headers('authorization') token: string) {
    return this.authService.registerUser(token);
  }

  @Post('/login')
  loginUser(@Headers('authorization') token: string) {
    return this.authService.login(token);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/login/passport')
  loginUserPassport(@Request() req: Request & { user: User }) {
    return req.user;
  }
}
