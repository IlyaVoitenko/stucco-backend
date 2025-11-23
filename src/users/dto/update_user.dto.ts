import { IsEmail, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  username?: string;
  @IsString()
  @MinLength(6)
  password?: string;
  @IsEmail()
  email?: string;
  @IsString()
  role?: string;
}
