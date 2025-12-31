import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}
  create(data: {
    name: string;
    image: string;
    hasWidth?: boolean;
    hasHeight?: boolean;
    hasDepth?: boolean;
    hasDiameter?: boolean;
  }) {
    if (!data.name)
      throw new BadRequestException('Category name cannot be empty');
    return this.prisma.category.create({ data });
  }
  findAll() {
    return this.prisma.category.findMany();
  }
  findOne(id: number) {
    if (!id)
      throw new BadRequestException('Category ID is required or ID is invalid');
    return this.prisma.category.findUnique({ where: { id } });
  }
  findOneByName(name: string) {
    if (!name)
      throw new BadRequestException(
        'Category name is required or name is invalid',
      );
    return this.prisma.category.findUnique({ where: { name } });
  }
  update(id: number, data: { name?: string; image?: string }) {
    if (!id || !data) throw new BadRequestException('error updating category');
    return this.prisma.category.update({ where: { id }, data });
  }
  remove(id: number) {
    if (!id)
      throw new BadRequestException('Category ID is required or ID is invalid');
    return this.prisma.category.delete({ where: { id } });
  }
}
