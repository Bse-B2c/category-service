import { dataSource } from '@src/database';
import { Category } from '@category/entity/category.entity';
import {} from '@category/category.controller';
import { CategoryService } from '@category/category.service';
import { CategoryController } from '@category/category.controller';

const repository = dataSource.getTreeRepository(Category);
export const categoryService = new CategoryService(repository);
export const categoryController = new CategoryController(categoryService);
