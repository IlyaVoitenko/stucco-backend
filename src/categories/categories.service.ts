import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoriesService {
  private readonly categories = [];

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
    const index = this.categories.findIndex((cat) => cat.id === id);
    if (index === -1) throw new Error('Category not found');

    this.categories[index] = { ...this.categories[index], ...category };
    return this.categories[index];
  }

  remove(id: number) {
    const index = this.categories.findIndex((cat) => cat.id === id);
    if (index !== -1) {
      return this.categories.splice(index, 1);
    }
  }
}
