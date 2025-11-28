import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';
import { UserRole } from '../../../generated/prisma/client';

export class UpdateUserDto {
  @IsString()
  username?: string;
  @IsString()
  @MinLength(6)
  password?: string;
  @IsEmail()
  email?: string;
  @IsEnum(UserRole)
  role?: UserRole;
}
