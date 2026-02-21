import {
  BadRequestException,
  Body,
  Controller,
  Param,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service.js';
import {
  CreateProductDto,
  CreateSizeProductDto,
} from './dto/create_product.dto.js';
import { UpdateProductDto } from './dto/update_product.dto.js';
import { Delete, Get, Patch, Post } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { FileInterceptor } from '@nestjs/platform-express';
import { ValidateImagePipe } from '../common/pipes.js';
import { AwsService } from '../shared/aws.services.js';
import { allowedMimeTypes } from '../common/regex.js';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly awsService: AwsService,
  ) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('ADMIN', 'USER')
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter(req, file, callback) {
        if (!allowedMimeTypes.includes(file.mimetype))
          return callback(new Error('File is invalid'), false);
        else callback(null, true);
      },
    }),
  )
  async create(
    @Body() dto: CreateProductDto,
    @UploadedFile(new ValidateImagePipe()) file: Express.Multer.File,
  ) {
    const imageUrl = await this.awsService.uploadFile(file);
    if (typeof dto.sizes === 'string') {
      const parsed = JSON.parse(dto.sizes) as CreateSizeProductDto[];

      if (!Array.isArray(parsed)) {
        throw new BadRequestException('sizes must be array');
      }

      dto.sizes = parsed;
    }
    return this.productsService.create(dto, imageUrl);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Get('all/:categoryId')
  findProductsByCategory(@Param('categoryId') categoryId: string) {
    return this.productsService.findByCategory(+categoryId);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('ADMIN', 'USER')
  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter(req, file, callback) {
        if (!allowedMimeTypes.includes(file.mimetype))
          return callback(new Error('File is invalid'), false);
        else callback(null, true);
      },
    }),
  )
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateProductDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const product = await this.productsService.findOne(+id);
    if (!product) throw new Error('Product not found');
    const images = [...product.images];

    if (typeof dto.sizes === 'string') {
      const parsed = JSON.parse(dto.sizes) as CreateSizeProductDto[];

      if (!Array.isArray(parsed)) {
        throw new BadRequestException('sizes must be array');
      }

      dto.sizes = parsed;
    }

    if (file) {
      for (const img of images) {
        await this.awsService.deleteFile(img);
      }

      const uploadedImage = await this.awsService.uploadFile(file);
      images.length = 0;
      images.push(uploadedImage);
    }

    return this.productsService.update(+id, dto, images);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('ADMIN', 'USER')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const product = await this.productsService.findOne(+id);
    if (!product) throw new Error('Product not found');
    for (const img of product.images) {
      await this.awsService.deleteFile(img);
    }
    return this.productsService.remove(+id);
  }
}
