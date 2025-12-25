import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Patch,
  Res,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common';
import { LoginUserDto } from './dto/login_user.dto.js';
import { AuthService } from './auth.service.js';
import { Response } from 'express';
import { AuthGuard } from './guards/auth.guard.js';

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
  @Patch('logout')
  @UseGuards(AuthGuard)
  logout(@Req() req: Request, @Res() res: Response) {
    return this.authService.logout(req, res);
  }
  @Get('is-logged-in')
  @UseGuards(AuthGuard)
  isLoggedIn() {
    return { auth: true };
  }
}
