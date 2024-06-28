import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { User } from 'src/models';
import { BcryptService } from 'src/modules/bcrypt/bcrypt.service';
import { JwtService } from 'src/modules/jwt/jwt.service';
import { UserRepository } from 'src/repositories';
import { LoginBodyDto } from './dtos/login.dto';
import { RegisterBodyDto } from './dtos/register.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService,
  ) {}

  register = async (args: RegisterBodyDto) => {
    const userExist = await this.userRepository.findOne({
      where: { username: args.username },
    });

    if (userExist) {
      throw new BadRequestException('Username already taken');
    }

    const passwordHash = await this.bcryptService.hashPassword(args.password);

    let newUser = new User({
      username: args.username,
      passwordHash: passwordHash,
    });

    newUser = await this.userRepository.save(newUser);

    const token = await this.jwtService.signToken(newUser);

    return { token };
  };

  login = async (args: LoginBodyDto) => {
    const user = await this.userRepository.findOne({
      where: { username: args.username },
    });

    if (!user) {
      throw new ForbiddenException('Username or password is incorrect');
    }

    const passwordMatch = await this.bcryptService.comparePassword(
      args.password,
      user.passwordHash,
    );

    if (!passwordMatch) {
      throw new ForbiddenException('Username or password is incorrect');
    }

    const token = await this.jwtService.signToken(user);

    return { token };
  };
}
