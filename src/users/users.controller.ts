import { Body, Controller, Get, Post } from '@nestjs/common';
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

  @Post()
  createUser(@Body() data: CreateUserDto) {
    return this.usersService.createUser(data);
  }
}
