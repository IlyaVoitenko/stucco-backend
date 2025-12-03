import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service.js';
import { CreateUserDto } from './dto/create_user.dto.js';
import { AuthGuard } from '../auth/auth.guard.js';
@Controller('auth/user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  // @UseGuards(AuthGuard)
  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }
  @UseGuards(AuthGuard)
  @Post()
  createUser(@Body() data: CreateUserDto) {
    return this.usersService.createUser(data);
  }
  @UseGuards(AuthGuard)
  @Patch(':id')
  updateUser(@Body() data: CreateUserDto, @Param('id') id: number) {
    return this.usersService.updateUser(data, id);
  }
  @UseGuards(AuthGuard)
  @Get(':id')
  getUserById(@Param('id') id: number) {
    return this.usersService.getUserById(id);
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  removeUser(@Param('id') id: number) {
    return this.usersService.removeUser(id);
  }
}
