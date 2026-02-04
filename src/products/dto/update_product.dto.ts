import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, IsJSON } from 'class-validator';
import { CreateSizeProductDto } from './create_product.dto.js';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  material?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @Type(() => Number)
  categoryId?: number;

  @IsOptional()
  @IsJSON()
  sizes?: string | CreateSizeProductDto[];
}
