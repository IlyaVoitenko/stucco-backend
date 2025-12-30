import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSizeProductDto {
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  width?: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  height?: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  itemPrice?: number;
}

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name!: string;
  @IsString()
  @IsNotEmpty()
  description!: string;
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  images!: string[];
  @IsNotEmpty()
  @IsString()
  material!: string;
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  price!: number;
  @IsString()
  sku?: string;
  @IsNotEmpty()
  @IsString()
  type!: string;
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  categoryId!: number;
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSizeProductDto)
  sizes?: CreateSizeProductDto[];
}
