// src/mercado-pago/mercado-pago.service.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MercadoPagoConfig, Payment, PaymentMethod } from 'mercadopago';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class MercadoPagoService {
  private client = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN as string, // ← secreto .env del servidor
  });

  constructor(private prisma: PrismaService) {}

  async getPaymentMethods() {
    try {
      const pm = new PaymentMethod(this.client);
      return await pm.get();
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException(
        'No se pudieron obtener los métodos de pago'
      );
    }
  }

  async createPayment(dto: CreatePaymentDto) {
    try {
      console.log('Datos recibidos en createPayment:', dto);
      const payment = new Payment(this.client);
      const res = await payment.create({
        body: {
          transaction_amount: dto.amount,
          token: dto.token,
          description: dto.description,
          installments: dto.installments,
          payment_method_id: dto.paymentMethodId,
          issuer_id: dto.issuer, // ya lo tenías
          payer: {
            email: dto.email,
            identification: {
              type: dto.identificationType,
              number: dto.identificationNumber,
            },
          },
        },
      });
      return res;
    } catch (e) {
      console.log('Error en createPayment:', e);
      throw new InternalServerErrorException(
        e?.message || 'Error creando el pago'
      );
    }
  }

  async registerPayment(dto: any) {
    try {
      console.log('Datos recibidos en registerPayment:', dto);
      delete dto.money_release_schema;
      delete dto.order;
      delete dto.card;
      delete dto.accounts_info;
      delete dto.release_info;
      delete dto.tags;
      const res = await this.prisma.mpPayment.create({
        data: {
          ...dto,
        },
      });
      return res;
    } catch (e) {
      console.log('Error en createPayment:', e);
      throw new InternalServerErrorException(
        e?.message || 'Error creando el pago'
      );
    }
  }
  async reversePayment(dto: any) {
    try {
      console.log('Datos recibidos en reversePayment:', dto);
      const res = await this.prisma.mpPayment.delete({
        where: { id: dto.paymentId },
        select: { id: true },
      });
      return res;
    } catch (e) {
      console.log('Error en reversePayment:', e);
      throw new InternalServerErrorException(
        e?.message || 'Error revirtiendo el pago'
      );
    }
  }
}
