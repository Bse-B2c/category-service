import { dataSource } from '@src/database';
import { Category } from '@category/entity/category.entity';
import {} from '@category/category.controller';
import { CategoryService } from '@category/category.service';

const repository = dataSource.getTreeRepository(Category);
export const categoryService = new CategoryService(repository);
