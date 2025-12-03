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
import { AuthGuard } from '../auth/guards/auth.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
@Controller('auth/user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @UseGuards(AuthGuard)
  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }
  @UseGuards(AuthGuard)
  @Roles('ADMIN')
  @Post()
  createUser(@Body() data: CreateUserDto) {
    return this.usersService.createUser(data);
  }
  @UseGuards(AuthGuard)
  @Roles('ADMIN')
  @Patch(':id')
  updateUser(@Body() data: CreateUserDto, @Param('id') id: number) {
    return this.usersService.updateUser(data, id);
  }
  @UseGuards(AuthGuard)
  @Roles('ADMIN')
  @Get(':id')
  getUserById(@Param('id') id: number) {
    return this.usersService.getUserById(id);
  }
  @UseGuards(AuthGuard)
  @Roles('ADMIN')
  @Delete(':id')
  removeUser(@Param('id') id: number) {
    return this.usersService.removeUser(id);
  }
}
