import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AuthenticationModule } from './authentication/authentication.module';
import { BlogModule } from './blog/blog.module';
import { Blog, User } from './models';
import { CaslModule } from './modules/casl/casl.module';
import { DatabaseModule } from './modules/database/database.module';

@Module({
  imports: [
    CaslModule,
    DatabaseModule,
    DatabaseModule.forFeature([User, Blog]),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MYSQL_HOST: Joi.string().required(),
        MYSQL_PORT: Joi.number().required(),
        MYSQL_DATABASE: Joi.string().required(),
        MYSQL_USERNAME: Joi.string().required(),
        MYSQL_PASSWORD: Joi.string().required(),
        MYSQL_SYNCHRONIZE: Joi.boolean().required(),
        BCRYPT_SALT_ROUNDS: Joi.number().required(),
        JWT_PRIVATE_KEY: Joi.string().required(),
        JWT_EXPIRES_IN: Joi.number().required(),
      }),
    }),
    AuthenticationModule,
    BlogModule,
  ],
})
export class AppModule {}
