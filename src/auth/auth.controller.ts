import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Patch,
  Param,
  Res,
} from '@nestjs/common';
import { LoginUserDto } from './dto/login_user.dto.js';
import { AuthService } from './auth.service.js';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.login(
      loginUserDto.username,
      loginUserDto.password,
      res,
    );
  }
  @Patch('logout/:id')
  logout(@Param('id') id: number, @Res() res: Response) {
    return this.authService.logout(id, res);
  }
}
