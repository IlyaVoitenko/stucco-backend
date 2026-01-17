import {
  Body,
  Controller,
  Param,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service.js';
import { CreateProductDto } from './dto/create_product.dto.js';
import { UpdateProductDto } from './dto/update_product.dto.js';
import { Delete, Get, Patch, Post } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { CsrfGuard } from '../auth/guards/csrf.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { FileInterceptor } from '@nestjs/platform-express';
import { ValidateImagePipe } from '../common/pipes.js';
import { AwsService } from '../shared/aws.services.js';
import { regexFile } from '../common/regex.js';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly awsService: AwsService,
  ) {}

  @UseGuards(AuthGuard, RolesGuard, CsrfGuard)
  @Roles('ADMIN', 'USER')
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter(req, file, callback) {
        if (!file.mimetype.match(regexFile))
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
    return this.productsService.create({ ...dto, images: [imageUrl] });
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
  @UseInterceptors(
    FileInterceptor('image', {
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter(req, file, callback) {
        if (!file.mimetype.match(regexFile))
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

    if (file) {
      for (const img of images) {
        await this.awsService.deleteFile(img);
      }

      const uploadedImage = await this.awsService.uploadFile(file);
      images.length = 0;
      images.push(uploadedImage);
    }

    return this.productsService.update(+id, {
      ...dto,
      images,
    });
  }
  @UseGuards(AuthGuard, RolesGuard, CsrfGuard)
  @Roles('ADMIN', 'USER')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
