import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';

import { TaskListModule } from './task-list/task-list.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';
import envVarValidationSchema from './config/envVar.schema';
import mongodbConfig from './config/mongodb.config';
import adminCredentialsConfig from './config/admin-credentials.config';
import jwtOptionsConfig from './config/jwt-options.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envVarValidationSchema,
      load: [mongodbConfig, adminCredentialsConfig, jwtOptionsConfig],
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return configService.get<MongooseModuleOptions>(
          'mongoConnectionSetting',
        );
      },
    }),
    TaskListModule,
    UsersModule,
    AuthModule,
    ProjectsModule,
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}
