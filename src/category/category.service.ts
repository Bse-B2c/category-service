import { CategoryService as Service } from '@category/interfaces/categoryService.interface';
import { CategoryDto } from '@src/category/dtos/category.dto';
import { Category } from '@category/entity/category.entity';
import { TreeRepository } from 'typeorm';
import { HttpException, HttpStatusCode } from '@bse-b2c/common';
import { UpdateCategoryDto } from '@category/dtos/updateCategory.dto';
import { SearchDto } from '@category/dtos/search.dto';

export class CategoryService implements Service {
	constructor(private repository: TreeRepository<Category>) {}

	create = async ({
		name,
		description,
		parentId,
	}: CategoryDto): Promise<Category> => {
		let parent = null;
		if (parentId) {
			parent = await this.findOne(parentId);
		}
		const category = await this.repository.findOne({
			where: { name },
		});
		if (category)
			throw new HttpException({
				statusCode: HttpStatusCode.CONFLICT,
				message: 'The category already exists.',
			});
		const newCategory = this.repository.create({
			name,
			description,
			parent,
		});
		return this.repository.save(newCategory);
	};
	//find
	findOne = async (id: number): Promise<Category> => {
		const category = await this.repository.findOne({ where: { id } });
		if (!category)
			throw new HttpException({
				statusCode: HttpStatusCode.NOT_FOUND,
				message: `Category ${id} not found`,
			});
		return category;
	};
	/*delete
    update*/
}
