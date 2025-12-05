import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';
import { compare } from 'bcrypt';

import { JwtService } from '@nestjs/jwt';
import { randomBytes } from 'crypto';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(
    username: string,
    password: string,
    res: Response,
  ): Promise<{ ok: boolean }> {
    if (!password || !username)
      throw new BadRequestException('login data is required');
    const user = await this.prisma.user.findUnique({
      where: { username },
    });
    if (!user) throw new BadRequestException('User not found');
    const passwordCompare = await compare(password, user.password);
    if (!passwordCompare) throw new UnauthorizedException('Invalid password');
    const payload = { id: user.id, username: user.username, role: user.role };
    const jwtToken = await this.jwtService.signAsync(payload);
    const csrf = randomBytes(32).toString('hex');

    await this.prisma.user.update({
      where: { id: user.id },
      data: { jwtToken, csrfToken: csrf },
    });
    res.cookie('jwtToken', jwtToken, {
      httpOnly: true,
      // secure: true,
      secure: false,
      sameSite: 'none',
      maxAge: 21600,
    });

    res.cookie('csrfToken', csrf, {
      httpOnly: false,
      secure: false,
      sameSite: 'none',
      maxAge: 21600,
    });
    return {
      ok: true,
    };
  }
  async logout(id: number, res: Response) {
    if (!id) throw new BadRequestException('logout error ');
    // const payload = await this.jwtService.verifyAsync(token);
    const user = await this.prisma.user.findFirst({
      where: { id: +id },
    });
    if (!user) throw new BadRequestException('User not found');
    res.clearCookie('jwtToken', { httpOnly: true, sameSite: 'none' });
    res.clearCookie('csrfToken', { httpOnly: false, sameSite: 'none' });
    return await this.prisma.user.update({
      where: { id: +id },
      data: { jwtToken: '', csrfToken: '' },
    });
  }
}
