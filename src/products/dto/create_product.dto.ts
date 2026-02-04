import {
  IsInt,
  IsJSON,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class CreateSizeProductDto {
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  width?: number | null;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  height?: number | null;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  depth?: number | null;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  diameter?: number | null;

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
  // @IsArray()
  // @ArrayNotEmpty()
  // @IsString({ each: true })
  // images!: string[];
  @IsNotEmpty()
  @IsString()
  material!: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Transform(({ value }) => Number(value))
  price!: number;

  @IsString()
  @IsOptional()
  sku?: string;

  @IsNotEmpty()
  @IsString()
  type!: string;

  @Type(() => Number)
  @IsInt()
  @IsPositive()
  categoryId!: number;

  @IsOptional()
  @IsJSON()
  sizes?: string | CreateSizeProductDto[];
}
