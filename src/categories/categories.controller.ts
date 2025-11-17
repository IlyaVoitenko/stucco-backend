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
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ValidateImagePipe } from '../common/pipes';
import { AwsService } from '../shared/aws.services';

@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly awsService: AwsService,
  ) {}
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter(req, file, callback) {
        if (!file.mimetype.match(/^image\/(png|jpeg|jpg|webp|avif|svg\+xml)$/))
          return callback(new Error('File is invalid'), false);
        else callback(null, true);
      },
    }),
  )
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
    @UploadedFile(new ValidateImagePipe()) file: Express.Multer.File,
  ) {
    const imageUrl = await this.awsService.uploadFile(file);
    createCategoryDto.image = imageUrl;
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
  }
  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter(req, file, callback) {
        if (!file.mimetype.match(/^image\/(png|jpeg|jpg|webp|avif|svg\+xml)$/))
          return callback(new Error('File is invalid'), false);
        else callback(null, true);
      },
    }),
  )
  async update(
    @Param('id') id: string,
    @UploadedFile(new ValidateImagePipe()) file: Express.Multer.File,
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
      ...updateCategoryDto,
      image: newImageUrl,
    });
  }
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const selectedCategory = await this.categoriesService.findOne(+id);
    if (!selectedCategory) throw new Error('Category not found');
    await this.awsService.deleteFile(selectedCategory.image);
    return this.categoriesService.remove(+id);
  }
}
