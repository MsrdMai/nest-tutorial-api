import {
  Global,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from './database/database.module';
import { join } from 'path';
import { TypeOrmDatabaseName } from './constants/database-name.constant';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ScheduleModule } from '@nestjs/schedule';
import { RepositoriesModule } from './repositorise/repositories.module';
import { UseCaseModule } from './use-cases/usecases.module';
import { Connection } from 'typeorm';
import { RoutesModule } from './routes/routes.module';
/// inject ให้ class เป็น modul ระดับ Global
@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mssql',
        host: configService.get<string>('database.host'),
        database: configService.get<string>('database.name'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        entities: [join(__dirname, '/database/entities/*.entity{.ts,.js}')],
        migrations: [join(__dirname, '/database/migrations/*{.ts,.js}')],
        options: { encrypt: false, trustServerCertificate: true },
        autoLoadEntities: true,
        migrationsRun:
          configService.get<string>('env') === 'production' ? false : true,
        migrationsTableName: 'typeorm_migrations',
        synchronize:
          configService.get<string>('env') === 'production' ? false : true,
        logging:
          configService.get<string>('env') === 'local'
            ? 'all'
            : ['error', 'warn'],
        pool: {
          max: 1000,
          min: 1,
          idleTimeoutMillis: 3600000,
          acquireTimeoutMillis: 3600000,
          createTimeoutMillis: 3600000,
          destroyTimeoutMillis: 3600000,
          reapIntervalMillis: 3600000,
          createRetryIntervalMillis: 3600000,
        },
        requestTimeout: 3600000,
        maxQueryExecutionTime: 3600000,
        connectionTimeout: 3600000,
      }),
    }),
    ScheduleModule.forRoot(), // ตั้งเวลาให้ทำ
    DatabaseModule,
    RepositoriesModule,
    UseCaseModule,
    RoutesModule,
  ],
  exports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
