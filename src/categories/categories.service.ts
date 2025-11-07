import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}
  create(data: CreateCategoryDto) {
    if (!data.name) throw new Error('Category name cannot be empty');

    return this.prisma.category.create({ data });
  }
}
