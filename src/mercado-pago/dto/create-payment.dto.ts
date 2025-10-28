// src/mercado-pago/dto/create-payment.dto.ts
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreatePaymentDto {
  @IsString() @IsNotEmpty() token: string;
  @IsString() @IsNotEmpty() paymentMethodId: string;
  @IsNumber() @Min(1) amount: number;
  @IsString() @IsNotEmpty() description: string;
  @IsEmail() email: string;
  @IsNumber() @Min(1) installments: number;
  @IsOptional() @IsNumber() issuer?: number; // opcional

  // Campos para la identificación del payer
  @IsString() @IsNotEmpty() identificationType: string;
  @IsString() @IsNotEmpty() identificationNumber: string;
}
