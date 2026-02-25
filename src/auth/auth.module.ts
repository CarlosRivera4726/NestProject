import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { PersonaModule } from '../persona/persona.module';
import { appConstants } from '../consts/appConstants';
import { LocalStrategy } from './strategies/LocalStrategy';
import { PersonaService } from '../persona/persona.service';
import { PrismaService } from '../prisma.service';

@Module({
  imports: [
    PersonaModule,
    PassportModule,
    JwtModule.register({
      secret: appConstants.jwtSecret,
      signOptions: { expiresIn: '20m' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, PersonaService, PrismaService],
  exports: [AuthService],
})
export class AuthModule {}
