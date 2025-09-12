import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // config to swagger
  const config = new DocumentBuilder()
    .setTitle('Sistema de Gestión de Inspecciones')
    .setDescription(
      'API para la gestión de personas, ubicaciones e inspecciones'
    )
    .setVersion('1.0')
    .addTag('personas', 'Operaciones relacionadas con personas')
    .addTag('auth', 'Autenticación y autorización')
    .addTag('locations', 'Gestión de ubicaciones')
    .addTag('inspections', 'Gestión de inspecciones')
    .addTag('inspectors', 'Gestión de inspectores')
    .addTag('usuario', 'Gestión de usuarios')
    .addTag('administrator', 'Gestión de administradores')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  SwaggerModule.setup('api', app, documentFactory);
  await app.listen(process.env.PORT ?? 4000);
  console.log('Server executed in port: ', 4000);
}

void bootstrap();
