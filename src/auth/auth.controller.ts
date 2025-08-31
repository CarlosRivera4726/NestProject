import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/LocalAuthGuard';
import { LoginUserDto } from 'src/user/dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() req: LoginUserDto) {
    const result: LoginUserDto = await this.authService.validateUser(
      req.email,
      req.password
    );
    req.role = result.role || '';
    return this.authService.login(req);
  }
}
