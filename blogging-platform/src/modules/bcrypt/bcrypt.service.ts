import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  private readonly BCRYPT_SALT_ROUNDS: number;

  constructor(private readonly configService: ConfigService) {
    this.BCRYPT_SALT_ROUNDS =
      this.configService.get<number>('BCRYPT_SALT_ROUNDS');
  }

  hashPassword = async (plainPassword: string) => {
    const passwordHash = await bcrypt.hash(
      plainPassword,
      this.BCRYPT_SALT_ROUNDS,
    );

    return passwordHash;
  };

  comparePassword = async (plainPassword: string, passwordHash: string) => {
    const isPasswordMatch = await bcrypt.compare(plainPassword, passwordHash);

    return isPasswordMatch;
  };
}
