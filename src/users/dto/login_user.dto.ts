import { IsNotEmpty, IsString, MinLength } from 'class-validator';
export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  username!: string;

  @IsString()
  @MinLength(6)
  password!: string;
}
