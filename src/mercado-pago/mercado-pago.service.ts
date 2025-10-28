// src/mercado-pago/mercado-pago.service.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MercadoPagoConfig, Payment, PaymentMethod } from 'mercadopago';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class MercadoPagoService {
  private client = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN as string, // ← secreto .env del servidor
  });

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
}
