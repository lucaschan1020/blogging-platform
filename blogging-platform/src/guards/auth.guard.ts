import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { JwtService } from 'src/modules/jwt/jwt.service';
import { UserRepository } from 'src/repositories';
import { TokenContent } from 'src/types/token-content.type';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);

  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const authorization =
      context.switchToHttp().getRequest().headers?.authorization ||
      context.switchToHttp().getRequest().headers?.Authorization;

    if (!authorization) {
      return false;
    }

    const [bearer, token] = authorization.split(' ');
    if (bearer !== 'Bearer') {
      return false;
    }

    if (!token) {
      return false;
    }

    let tokenContent: TokenContent;
    try {
      tokenContent = await this.jwtService.verifyToken<TokenContent>(token);
    } catch (err) {
      this.logger.warn(err.message);
      return false;
    }

    if (!tokenContent) {
      return false;
    }

    const user = await this.userRepository.findOne({
      where: { id: tokenContent.userId },
    });

    if (!user) {
      return false;
    }

    context.switchToHttp().getRequest().userContext = tokenContent;

    return true;
  }
}
