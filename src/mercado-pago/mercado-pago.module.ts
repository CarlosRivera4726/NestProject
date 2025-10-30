import { Module } from '@nestjs/common';
import { MercadoPagoService } from './mercado-pago.service';
import { MercadoPagoController } from './mercado-pago.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [MercadoPagoController],
  providers: [MercadoPagoService, PrismaService],
})
export class MercadoPagoModule {}
