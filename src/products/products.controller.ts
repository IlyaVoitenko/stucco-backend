import { Body, Controller, Param, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service.js';
import { CreateProductDto } from './dto/create_product.dto.js';
import { UpdateProductDto } from './dto/update_product.dto.js';
import { Delete, Get, Patch, Post } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { CsrfGuard } from '../auth/guards/csrf.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(AuthGuard, RolesGuard, CsrfGuard)
  @Roles('ADMIN', 'USER')
  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.productsService.create(dto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Get('all/:categoryName')
  findProductsByCategory(@Param('categoryName') categoryName: string) {
    return this.productsService.findByCategory(categoryName);
  }

  @UseGuards(AuthGuard, RolesGuard, CsrfGuard)
  @Roles('ADMIN', 'USER')
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.productsService.update(+id, dto);
  }
  @UseGuards(AuthGuard, RolesGuard, CsrfGuard)
  @Roles('ADMIN', 'USER')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
