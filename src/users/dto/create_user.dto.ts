import {
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { UserRole } from '../../generated/prisma/enums.js';
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username!: string;

  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}[\]|:;"'<>,.?/]).{8,}$/,
    {
      message:
        'Password must contain uppercase, lowercase, number and special character and be at least 8 characters long',
    },
  )
  password!: string;

  @IsEnum(UserRole)
  role!: UserRole;
}
