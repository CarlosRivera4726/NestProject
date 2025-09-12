import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InspectionModule } from './inspection/inspection.module';
import { LocationModule } from './location/location.module';
import { PersonaModule } from './persona/persona.module';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [InspectionModule, LocationModule, PersonaModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
