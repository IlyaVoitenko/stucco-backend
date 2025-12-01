import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service.js';
import { LoginUserDto } from './dto/login_user.dto.js';
import { CreateUserDto } from './dto/create_user.dto.js';
@Controller('auth/user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  getUser(@Body() data: LoginUserDto) {
    return this.usersService.loginUser(data);
  }
  @Get('all')
  getAllUsers() {
    return this.usersService.getAllUsers();
  }
  @Post()
  createUser(@Body() data: CreateUserDto) {
    return this.usersService.createUser(data);
  }
  @Patch('logout/:id')
  logoutUser(@Param('id') id: number) {
    return this.usersService.logoutUser(id);
  }
  @Get(':id')
  getUserById(@Param('id') id: number) {
    return this.usersService.getUserById(id);
  }
  @Delete(':id')
  removeUser(@Param('id') id: number) {
    return this.usersService.removeUser(id);
  }
}
