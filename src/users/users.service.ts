import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';
import { CreateUserDto } from './dto/create_user.dto.js';
import { UpdateUserDto } from './dto/update_user.dto.js';
import { LoginUserDto } from './dto/login_user.dto.js';
import { hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  async createUser(data: CreateUserDto) {
    if (!data.password || !data.username)
      throw new Error('Data is required to create a user');
    const { password, username } = data;
    const userExist = await this.prisma.user.findUnique({
      where: { username },
    });
    if (userExist) throw new Error('User already exists');
    const hashedPassword = await hash(password, 10);

    return await this.prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });
  }
  async updateUser(data: UpdateUserDto, idUser: number) {
    if (!data || !idUser)
      throw new Error('Data and User ID are required to update a user');
    return await this.prisma.user.update({
      where: { id: idUser },
      data,
    });
  }
  async removeUser(idUser: number) {
    if (!idUser) throw new Error('User ID is required to remove a user');
    return await this.prisma.user.delete({
      where: { id: idUser },
    });
  }
  async loginUser(data: LoginUserDto) {
    if (!data.password || !data.username) throw new Error('login error ');
    const { username, password } = data;
    const user = await this.prisma.user.findFirst({
      where: {
        username,
      },
    });
    if (!user) throw new Error('User not found');
    const passwordCompare = await compare(password, user.password);
    if (!passwordCompare) throw new Error('Invalid password');

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.SECRET_KEY as string,
      { expiresIn: '6h' },
    );
    await this.prisma.user.update({
      where: { id: user.id },
      data: { jwtToken: token },
    });
    return token;
  }
}
