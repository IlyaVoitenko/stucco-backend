/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import * as PrismaPkg from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private prismaClient: any;
  private pool: Pool | null = null;

  constructor() {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
    this.pool = pool;
    const adapter = new PrismaPg(pool);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const Client =
      (PrismaPkg as any).PrismaClient ??
      (PrismaPkg as any).default?.PrismaClient ??
      (PrismaPkg as any).default ??
      (PrismaPkg as any);
    this.prismaClient = new Client({ adapter });
  }

  get category() {
    return this.prismaClient.category;
  }

  get product() {
    return this.prismaClient.product;
  }

  get sizeProduct() {
    return this.prismaClient.sizeProduct;
  }

  get user() {
    return this.prismaClient.user;
  }

  async $executeRaw(query: any, ...values: any[]) {
    return this.prismaClient.$executeRaw(query, ...values);
  }

  async $queryRaw(query: any, ...values: any[]) {
    return this.prismaClient.$queryRaw(query, ...values);
  }

  async $transaction(fn: any, options?: any) {
    return this.prismaClient.$transaction(fn, options);
  }

  async onModuleInit() {
    await this.prismaClient.$connect();
  }

  async onModuleDestroy() {
    await this.prismaClient.$disconnect();
    if (this.pool) {
      await this.pool.end();
    }
  }
}
