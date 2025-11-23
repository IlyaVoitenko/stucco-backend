import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create_user.dto';
import { UpdateUserDto } from './dto/update_user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  async createUser(data: CreateUserDto): Promise<User> {
    if (!data) throw new Error('Data is required to create a user');
    return await (this.prisma as any).user.create({ data });
  }
  async updateUser(data: UpdateUserDto, idUser: number): Promise<User> {
    if (!data || !idUser)
      throw new Error('Data and User ID are required to update a user');
    return await (this.prisma as any).user.update({
      where: { id: idUser },
      data,
    });
  }
  async removeUser(idUser: number): Promise<User> {
    if (!idUser) throw new Error('User ID is required to remove a user');
    return await (this.prisma as any).user.delete({
      where: { id: idUser },
    });
  }
}
