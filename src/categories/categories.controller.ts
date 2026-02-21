import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { CategoriesService } from './categories.service.js';
import { CreateCategoryDto } from './dto/create-category.dto.js';
import { UpdateCategoryDto } from './dto/update-category.dto.js';
import { FileInterceptor } from '@nestjs/platform-express';
import { ValidateImagePipe } from '../common/pipes.js';
import { AwsService } from '../shared/aws.services.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { AuthGuard } from '../auth/guards/auth.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { allowedMimeTypes } from '../common/regex.js';

@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
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
    @Body() dto: CreateCategoryDto,
    @UploadedFile(new ValidateImagePipe()) file: Express.Multer.File,
  ) {
    const exists = await this.categoriesService.findOneByName(dto.name);
    if (exists)
      throw new BadRequestException('Category with this name already exists');
    const imageUrl = await this.awsService.uploadFile(file);
    return this.categoriesService.create({
      ...dto,
      image: imageUrl,
    });
  }
  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
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
    @UploadedFile() file: Express.Multer.File,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    const category = await this.categoriesService.findOne(+id);
    if (!category) throw new Error('Category not found');

    let newImageUrl = category.image;

    if (file) {
      await this.awsService.deleteFile(category.image);
      newImageUrl = await this.awsService.uploadFile(file);
    }

    return this.categoriesService.update(+id, {
      name: updateCategoryDto.name,
      image: newImageUrl,
    });
  }
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('ADMIN', 'USER')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const selectedCategory = await this.categoriesService.findOne(+id);
    if (!selectedCategory) throw new Error('Category not found');
    await this.awsService.deleteFile(selectedCategory.image);
    return this.categoriesService.remove(+id);
  }
}
