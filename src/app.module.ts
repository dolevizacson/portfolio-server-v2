import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { MailerModule } from '@nestjs-modules/mailer';
import { google } from 'googleapis';
import { RouterModule } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';
import { SkillsCategoriesModule } from './skills-categories/skills-categories.module';
import { SkillsModule } from './skills/skills.module';
import { NewModule } from './new/new.module';
import { BlogModule } from './blog/blog.module';
import { ContactModule } from './contact/contact.module';
import { ResumeModule } from './resume/resume.module';

import envVarValidationSchema from './config/envVar.schema';
import mongodbConfig from './config/mongodb.config';
import adminCredentialsConfig from './config/admin-credentials.config';
import jwtOptionsConfig from './config/jwt-options.config';
import cloudinaryConfig from './config/cloudinary.config';
import oauth2Config, { OAuth2Config } from './config/oauth2.config';
import { UtilsModule } from './utils/utils.module';
import cookieConfig from './config/cookie.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envVarValidationSchema,
      load: [
        mongodbConfig,
        adminCredentialsConfig,
        jwtOptionsConfig,
        cloudinaryConfig,
        oauth2Config,
        cookieConfig,
      ],
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return configService.get<MongooseModuleOptions>(
          'mongoConnectionSetting',
        );
      },
    }),
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const oAuth2Config = configService.get<OAuth2Config>('oAuth2Config');

        const oAuth2Client = new google.auth.OAuth2(
          oAuth2Config.clientId,
          oAuth2Config.clientSecret,
          oAuth2Config.redirectUri,
        );

        oAuth2Client.setCredentials({
          refresh_token: oAuth2Config.refresh_token,
        });

        const accessToken = await oAuth2Client.getAccessToken();

        return {
          transport: {
            service: 'gmail',
            auth: {
              type: 'OAuth2',
              user: oAuth2Config.contactEmail,
              clientId: oAuth2Config.clientId,
              clientSecret: oAuth2Config.clientSecret,
              refreshToken: oAuth2Config.refresh_token,
              accessToken: accessToken.token,
            },
          },
        };
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client', 'build'),
    }),
    TasksModule,
    UsersModule,
    AuthModule,
    ProjectsModule,
    SkillsCategoriesModule,
    SkillsModule,
    NewModule,
    BlogModule,
    ContactModule,
    ResumeModule,
    UtilsModule,
    RouterModule.register([
      {
        path: 'api',
        module: TasksModule,
      },
      {
        path: 'api',
        module: AuthModule,
      },
      {
        path: 'api',
        module: ProjectsModule,
      },
      {
        path: 'api',
        module: SkillsCategoriesModule,
      },
      {
        path: 'api',
        module: SkillsModule,
      },
      {
        path: 'api',
        module: NewModule,
      },
      {
        path: 'api',
        module: BlogModule,
      },
      {
        path: 'api',
        module: ContactModule,
      },
      {
        path: 'api',
        module: ResumeModule,
      },
    ]),
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}
