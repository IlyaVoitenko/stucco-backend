import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';
import { compare } from 'bcrypt';

import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(
    username: string,
    password: string,
  ): Promise<{ access_token: string }> {
    if (!password || !username)
      throw new BadRequestException('login data is required');
    const user = await this.prisma.user.findUnique({
      where: { username },
    });
    if (!user) throw new BadRequestException('User not found');
    const passwordCompare = await compare(password, user.password);
    if (!passwordCompare) throw new UnauthorizedException('Invalid password');
    const payload = { sub: user.id, username: user.username, role: user.role };
    const jwtToken = await this.jwtService.signAsync(payload);
    await this.prisma.user.update({
      where: { id: user.id },
      data: { jwtToken },
    });
    return {
      access_token: jwtToken,
    };
  }
  async logout(id: number) {
    if (!id) throw new BadRequestException('logout error ');
    const user = await this.prisma.user.findFirst({
      where: { id: +id },
    });
    if (!user) throw new BadRequestException('User not found');
    return await this.prisma.user.update({
      where: { id: +id },
      data: { jwtToken: '' },
    });
  }
}
