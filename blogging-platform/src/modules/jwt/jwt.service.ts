import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { User } from 'src/models';

@Injectable()
export class JwtService {
  private readonly JWT_PRIVATE_KEY: string;
  private readonly JWT_EXPIRES_IN: number;

  constructor(private readonly configService: ConfigService) {
    this.JWT_PRIVATE_KEY = this.configService.get<string>('JWT_PRIVATE_KEY');
    this.JWT_EXPIRES_IN = this.configService.get<number>('JWT_EXPIRES_IN');
  }

  signToken = async (user: User) => {
    const token = await new Promise((resolve, reject) => {
      jwt.sign(
        { userId: user.id },
        this.JWT_PRIVATE_KEY,
        { expiresIn: this.JWT_EXPIRES_IN },
        (err, token) => {
          if (err) {
            reject(err);
          }
          resolve(token);
        },
      );
    });

    return token;
  };

  verifyToken = async <T>(token: string) => {
    const decodedToken: T = await new Promise((resolve, reject) => {
      jwt.verify(token, this.JWT_PRIVATE_KEY, (err, decoded: T) => {
        if (err) {
          reject(err);
        }
        resolve(decoded);
      });
    });

    return decodedToken;
  };
}
