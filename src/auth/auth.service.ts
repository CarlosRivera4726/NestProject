import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    console.log(
      `[AuthService] validateUser: email=${email}, password=${password}`
    );
    return await this.usersService.validateUser(email, password);
  }

  async login(user: LoginUserDto) {
    // console.log(`[AuthService] login: user=${JSON.stringify(user)}`);
    const payload = { email: user.email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      email: user.email,
      role: user.role,
    };
  }
}
