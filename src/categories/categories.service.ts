import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto.js';
import { UpdateCategoryDto } from './dto/update-category.dto.js';
import { PrismaService } from '../prisma.service.js';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}
  create(data: CreateCategoryDto) {
    if (!data.name) throw new Error('Category name cannot be empty');
    return this.prisma.category.create({ data });
  }
  findAll() {
    return this.prisma.category.findMany();
  }
  findOne(id: number) {
    if (!id) throw new Error('Category ID is required or ID is invalid');
    return this.prisma.category.findUnique({ where: { id } });
  }
  update(id: number, data: UpdateCategoryDto) {
    if (!id || !data) throw new Error('error updating category');
    return this.prisma.category.update({ where: { id }, data });
  }
  remove(id: number) {
    if (!id) throw new Error('Category ID is required or ID is invalid');
    return this.prisma.category.delete({ where: { id } });
  }
}
