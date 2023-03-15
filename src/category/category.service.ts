import { CategoryService as Service } from '@category/interfaces/categoryService.interface';
import { CategoryDto } from '@src/category/dtos/category.dto';
import { Category } from '@category/entity/category.entity';
import {
	FindOptionsWhere,
	TreeRepository,
	In,
	Like,
	MoreThanOrEqual,
	Equal,
} from 'typeorm';
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
	findOne = async (id: number): Promise<Category> => {
		const category = await this.repository.findOne({ where: { id } });
		if (!category)
			throw new HttpException({
				statusCode: HttpStatusCode.NOT_FOUND,
				message: `Category ${id} not found`,
			});
		return category;
	};
	find = async (search: SearchDto): Promise<Array<Category>> => {
		const {
			ids,
			name,
			description,
			date,
			parentId,
			limit = 10,
			page = 0,
			orderBy = 'name',
			sortOrder = 'asc',
		} = search;
		let where: FindOptionsWhere<Category> = {};

		if (ids) where = { ...where, id: In(ids) };

		if (name) where = { ...where, name: Equal(name) };

		if (description)
			where = { ...where, description: Like(`%${description}%`) };

		if (date) where = { ...where, date: MoreThanOrEqual(new Date(date)) };

		if (parentId) where = { ...where, parent: Equal(parentId) };

		return this.repository.find({
			relations: { parent: true },
			loadRelationIds: true,
			where,
			order: { [orderBy]: sortOrder },
			take: limit,
			skip: limit * page,
		});
	};

	delete = async (id: number) => {
		const category = await this.findOne(id);
		await this.repository.delete(id);

		return category;
	};

	update = async (
		id: number,
		updateCategory: UpdateCategoryDto
	): Promise<Category> => {
		let parent = null;
		const category = await this.findOne(id);
		console.log(updateCategory.parentId);

		if (category?.parent?.id === updateCategory.parentId) {
			parent = category.parent;
		} else if (updateCategory.parentId) {
			parent = await this.findOne(updateCategory.parentId);
		}

		console.log(parent);
		Object.assign(category, {
			date: new Date(),
			description:
				updateCategory.description !== undefined
					? updateCategory.description
					: '',
			name: updateCategory.name,
			parent: parent,
		});
		return this.repository.save(category);
	};
}
