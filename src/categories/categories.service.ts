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
  findAll() {
    return this.prisma.category.findMany();
  }
  findOne(id: number) {
    return this.prisma.category.findUnique({ where: { id } });
  }
  update(id: number, data: UpdateCategoryDto) {
    return this.prisma.category.update({ where: { id }, data });
  }
  remove(id: number) {
    return this.prisma.category.delete({ where: { id } });
  }
}
