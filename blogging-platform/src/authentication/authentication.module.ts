import { Module } from '@nestjs/common';
import { User } from 'src/models';
import { BcryptModule } from 'src/modules/bcrypt/bcrypt.module';
import { DatabaseModule } from 'src/modules/database/database.module';
import { JwtModule } from 'src/modules/jwt/jwt.module';
import { UserRepository } from 'src/repositories';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';

@Module({
  imports: [BcryptModule, JwtModule, DatabaseModule.forFeature([User])],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, UserRepository],
})
export class AuthenticationModule {}
