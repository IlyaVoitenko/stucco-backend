import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';
import { CreateProductDto } from './dto/create_product.dto.js';
import { UpdateProductDto } from './dto/update_product.dto.js';
@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateProductDto, imageUrl?: string) {
    return this.prisma.product.create({
      data: {
        ...dto,
        images: imageUrl ? [imageUrl] : [],
        sizes: dto.sizes ? { create: dto.sizes } : undefined,
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

  async findByCategory(categoryId: number) {
    return this.prisma.product.findMany({
      where: { categoryId: categoryId },
      include: {
        sizes: true,
        category: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async update(id: number, dto: UpdateProductDto, imageUrls?: string[]) {
    await this.findOne(id);

    const { categoryId, sizes, ...rest } = dto;

    return this.prisma.product.update({
      where: { id },
      data: {
        ...rest,

        ...(imageUrls ? { images: imageUrls } : {}),

        ...(categoryId
          ? {
              category: {
                connect: { id: categoryId },
              },
            }
          : {}),

        ...(sizes
          ? {
              sizes: {
                deleteMany: {},
                create: sizes,
              },
            }
          : {}),
      },
      include: {
        sizes: true,
        category: true,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.$transaction([
      this.prisma.sizeProduct.deleteMany({
        where: { productId: id },
      }),
      this.prisma.product.delete({
        where: { id },
      }),
    ]);
  }
}
