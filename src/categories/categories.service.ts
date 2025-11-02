import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  private readonly categories: CreateCategoryDto[] = [];

  create(category: CreateCategoryDto) {
    this.categories.push(category);
    return category;
  }

  findAll() {
    return this.categories;
  }

  findOne(id: number) {
    return this.categories.find((category) => category.id === id);
  }

  update(id: number, category: UpdateCategoryDto) {
    const index = this.categories.findIndex((category) => category.id === id);
    if (index === -1) throw new Error('Category not found');

    this.categories[index] = { ...this.categories[index], ...category };
    return this.categories[index];
  }

  remove(id: number) {
    const index = this.categories.findIndex((category) => category.id === id);
    if (index !== -1) {
      return this.categories.splice(index, 1);
    }
  }
}
