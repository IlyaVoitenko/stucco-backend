import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create_product.dto.js';

export class UpdateProductDto extends PartialType(CreateProductDto) {}
