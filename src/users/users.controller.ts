import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Patch,
} from '@nestjs/common';
import { UsersService } from './users.service.js';
// import { LoginUserDto } from './dto/login_user.dto.js';
import { CreateUserDto } from './dto/create_user.dto.js';
@Controller('auth/user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('')
  getAllUsers() {
    return this.usersService.getAllUsers();
  }
  @Post()
  createUser(@Body() data: CreateUserDto) {
    return this.usersService.createUser(data);
  }

  @Patch(':id')
  updateUser(@Body() data: CreateUserDto, @Param('id') id: number) {
    return this.usersService.updateUser(data, id);
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
