import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Patch,
  Param,
} from '@nestjs/common';
import { LoginUserDto } from './dto/login_user.dto.js';
import { AuthService } from './auth.service.js';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto.username, loginUserDto.password);
  }
  @Patch('logout/:id')
  logout(@Param('id') id: number) {
    return this.authService.logout(id);
  }
}
