import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginPersonaDto } from 'src/persona/dto/login-persona.dto';
import { PersonaService } from 'src/persona/persona.service';

@Injectable()
export class AuthService {
  constructor(
    private personasService: PersonaService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    console.log(
      `[AuthService] validateUser: email=${email}, password=${password}`
    );
    return await this.personasService.validateUser(email, password);
  }

  async login(persona: LoginPersonaDto) {
    // console.log(`[AuthService] login: persona=${JSON.stringify(persona)}`);
    const payload = { email: persona.email, role: persona.role };
    return {
      access_token: this.jwtService.sign(payload),
      email: persona.email,
      role: persona.role,
    };
  }
}
