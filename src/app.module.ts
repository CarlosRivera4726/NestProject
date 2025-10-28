import { Module } from '@nestjs/common';
import { InspectionModule } from './inspection/inspection.module';
import { LocationModule } from './location/location.module';
import { PersonaModule } from './persona/persona.module';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { InspectorModule } from './inspector/inspector.module';
import { AdministratorModule } from './administrator/administrator.module';
import { UsuarioModule } from './usuario/usuario.module';
import { MercadoPagoModule } from './mercado-pago/mercado-pago.module';

@Module({
  imports: [
    InspectionModule,
    LocationModule,
    PersonaModule,
    AuthModule,
    InspectorModule,
    AdministratorModule,
    UsuarioModule,
    MercadoPagoModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
