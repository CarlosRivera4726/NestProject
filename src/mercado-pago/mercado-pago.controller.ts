import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { MercadoPagoService } from './mercado-pago.service';
import { MercadoPagoConfig, PaymentMethod } from 'mercadopago';
import type { Response } from 'express';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Controller('mercado-pago')
export class MercadoPagoController {
  client = new MercadoPagoConfig({
    // NUNCA expongas esto en el frontend. Usa variables de entorno del servidor.
    accessToken: process.env.MP_ACCESS_TOKEN as string,
  });
  constructor(private readonly mercadoPagoService: MercadoPagoService) {}

  @Get('payment-methods')
  async getPaymentMethods(@Res() res: Response) {
    try {
      const paymentMethods = new PaymentMethod(this.client);
      paymentMethods
        .get()
        .then((result) => {
          console.log(result);
          res.status(200).json(result);
        })
        .catch((error) => {
          console.log(error);
          res.status(500).json({ error: 'Error interno' });
        });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error interno' });
    }
  }

  @Post('pay')
  async pay(@Body() dto: CreatePaymentDto) {
    return this.mercadoPagoService.createPayment(dto);
  }

  @Post('register-pay')
  async registerPay(@Body() dto: any, @Res() res: Response) {
    try {
      await this.mercadoPagoService.registerPayment(dto);
      return res.json({ message: 'Pago registrado exitosamente' });
    } catch (error) {
      console.error(error);
      throw new Error('Error registrando el pago');
    }
  }

  @Post('reverse-pay')
  async reversePay(@Body() dto: any, @Res() res: Response) {
    try {
      await this.mercadoPagoService.reversePayment(dto);
      return res.json({ message: 'Pago revertido exitosamente' });
    } catch (error) {
      console.error(error);
      throw new Error('Error revirtiendo el pago');
    }
  }
}
