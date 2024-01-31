import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RequestMethod } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerDocumentOptions } from './../node_modules/@nestjs/swagger/dist/interfaces/swagger-document-options.interface.d';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
    {
      logger: ['log', 'error', 'warn'],
      bodyParser: true,
    },
  );

  // const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  const env = configService.get('env');
  const port = configService.get<number>('port') ?? 80;

  /* App config */
  app.enableCors({
    origin: '*',
  });
  app.setGlobalPrefix('api', {
    exclude: [
      {
        path: 'health',
        method: RequestMethod.ALL,
      },
      {
        path: '',
        method: RequestMethod.ALL,
      },
    ],
  });

  /* Swagger Setup */
  const config = new DocumentBuilder()
    .setTitle('PMAI-API')
    .setDescription(`Running on environment: ${env}`)
    .setExternalDoc('swagger.json', '/swagger-json')
    .setVersion('1')
    .addBearerAuth()
    .build();

  const option: SwaggerDocumentOptions = {
    ignoreGlobalPrefix: false,
  };

  const document = SwaggerModule.createDocument(app, config, option);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(port);
  console.log(`MAI-API (${env}) is running on: ${await app.getUrl()}/api`);
}
bootstrap();
