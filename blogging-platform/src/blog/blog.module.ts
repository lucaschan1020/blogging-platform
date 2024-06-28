import { Module } from '@nestjs/common';
import { Blog, User } from 'src/models';
import { DatabaseModule } from 'src/modules/database/database.module';
import { JwtModule } from 'src/modules/jwt/jwt.module';
import { BlogRepository, UserRepository } from 'src/repositories';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';

@Module({
  imports: [DatabaseModule.forFeature([User, Blog]), JwtModule],
  controllers: [BlogController],
  providers: [BlogService, UserRepository, BlogRepository],
})
export class BlogModule {}
