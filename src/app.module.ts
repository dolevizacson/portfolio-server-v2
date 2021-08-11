import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskListModule } from './task-list/task-list.module';
import envVarValidationSchema from './config/envVar.schema';
import mongodbConfig from './config/mongodb.config';
import { MongoConnectionOptions } from 'typeorm/driver/mongodb/MongoConnectionOptions';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envVarValidationSchema,
      load: [mongodbConfig],
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
