import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';
import { CreateProductDto } from './dto/create_product.dto.js';
import { UpdateProductDto } from './dto/update_product.dto.js';
@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateProductDto) {
    return this.prisma.product.create({
      data: {
        name: dto.name,
        description: dto.description,
        images: dto.images,
        material: dto.material,
        price: dto.price,
        sku: dto.sku,
        type: dto.type,
        categoryId: dto.categoryId,

        sizes: dto.sizes
          ? {
              create: dto.sizes,
            }
          : undefined,
      },
      include: {
        sizes: true,
        category: true,
      },
    });
  }

  async findAll() {
    return this.prisma.product.findMany({
      include: {
        sizes: true,
        category: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        sizes: true,
        category: true,
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async findByCategory(category: string) {
    return this.prisma.product.findMany({
      where: { category: { name: category } },
      include: {
        sizes: true,
        category: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async update(id: number, dto: UpdateProductDto) {
    await this.findOne(id);

    return this.prisma.product.update({
      where: { id },
      data: {
        ...dto,
        sizes: dto.sizes
          ? {
              deleteMany: {},
              create: dto.sizes,
            }
          : undefined,
      },
      include: {
        sizes: true,
        category: true,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.product.delete({
      where: { id },
    });
  }
}
