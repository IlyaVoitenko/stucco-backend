import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  name!: string;
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  @IsOptional()
  hasWidth!: boolean;
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  @IsOptional()
  hasHeight!: boolean;
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  @IsOptional()
  hasDepth!: boolean;
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  @IsOptional()
  hasDiameter!: boolean;
}
