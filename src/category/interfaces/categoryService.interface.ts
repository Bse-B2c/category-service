import { CategoryDto } from '@src/category/dtos/category.dto';
import { Category } from '@category/entity/category.entity';
import { UpdateCategoryDto } from '@src/category/dtos/updateCategory.dto';
import { SearchDto } from '@category/dtos/search.dto';
export interface CategoryService {
	create(category: CategoryDto): Promise<Category>;
	findOne(id: number): Promise<Category>;
	//delete(id: number): Promise<Category>;
	//update(id: number, category: UpdateCategoryDto): Promise<Category>;
	find(search: SearchDto): Promise<Array<Category>>;
}
