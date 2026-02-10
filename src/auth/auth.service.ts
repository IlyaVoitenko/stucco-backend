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
  ): Promise<void> {
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
      sameSite: 'none',
      secure: true,
      maxAge: 6 * 60 * 60 * 1000,
    });

    res.cookie('csrfToken', csrf, {
      httpOnly: false,
      sameSite: 'none',
      secure: true,
      maxAge: 6 * 60 * 60 * 1000,
    });
    res.send({ ok: true });
  }
  async logout(
    req: Request & { user?: { id: number } },
    res: Response,
  ): Promise<void> {
    const userId = req.user?.id;
    if (!userId) {
      throw new UnauthorizedException();
    }

    res.clearCookie('jwtToken', {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
    });

    res.clearCookie('csrfToken', {
      httpOnly: false,
      sameSite: 'lax',
      secure: false,
    });

    await this.prisma.user.update({
      where: { id: userId },
      data: { jwtToken: '', csrfToken: '' },
    });
    res.send({ ok: true });
  }
}
