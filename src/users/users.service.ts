import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';
import { User } from '../../generated/prisma/client.js';
import { CreateUserDto } from './dto/create_user.dto.js';
import { UpdateUserDto } from './dto/update_user.dto.js';
import { LoginUserDto } from './dto/login_user.dto.js';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  async createUser(data: CreateUserDto): Promise<User> {
    if (!data) throw new Error('Data is required to create a user');
    return await this.prisma.user.create({ data });
  }
  async updateUser(data: UpdateUserDto, idUser: number): Promise<User> {
    if (!data || !idUser)
      throw new Error('Data and User ID are required to update a user');
    return await this.prisma.user.update({
      where: { id: idUser },
      data,
    });
  }
  async removeUser(idUser: number): Promise<User> {
    if (!idUser) throw new Error('User ID is required to remove a user');
    return await this.prisma.user.delete({
      where: { id: idUser },
    });
  }
  async loginUser(data: LoginUserDto): Promise<User | null> {
    if (!data) throw new Error('Data is required to login a user');
    const { username, email, password } = data;
    if (username) {
      return await this.prisma.user.findFirst({
        where: {
          username,
          password,
        },
      });
    } else {
      return await this.prisma.user.findFirst({
        where: {
          email,
          password,
        },
      });
    }
  }
}
