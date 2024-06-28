import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { LoginBodyDto } from './dtos/login.dto';
import { RegisterBodyDto } from './dtos/register.dto';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}
  @Post('/register')
  async register(@Body() body: RegisterBodyDto) {
    return await this.authenticationService.register(body);
  }

  @Post('/login')
  async login(@Body() body: LoginBodyDto) {
    return await this.authenticationService.login(body);
  }
}
