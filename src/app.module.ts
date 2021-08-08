import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskListModule } from './task-list/task-list.module';
import envVarValidationSchema from './config/envVar.schema';
import { LoggerModule, Params } from 'nestjs-pino';
import loggerConfig from './config/logger.config';
import mongodbConfig from './config/mongodb.config';
import { MongoConnectionOptions } from 'typeorm/driver/mongodb/MongoConnectionOptions';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envVarValidationSchema,
      load: [loggerConfig, mongodbConfig],
    }),
    LoggerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return configService.get<Params>('loggerConfiguration');
      },
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return configService.get<MongoConnectionOptions>(
          'mongoConnectionSetting',
        );
      },
    }),
    TaskListModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
