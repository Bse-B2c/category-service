import { CategoryService } from '@category/interfaces/categoryService.interface';
import { NextFunction, Response, Request } from 'express';
import { CategoryDto } from '@category/dtos/category.dto';
import { HttpStatusCode } from '@bse-b2c/common';
export class Controller {
	constructor(private service: CategoryService) {}

	create = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { name, description, parentId } = req.body as CategoryDto;

			const response = await this.service.create({
				name,
				description,
				parentId,
			});

			return res.status(HttpStatusCode.CREATED).send({
				statusCode: HttpStatusCode.CREATED,
				error: null,
				data: response,
			});
		} catch (e) {
			next(e);
		}
	};

	findOne = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params;

			const response = await this.service.findOne(+id);

			return res.status(HttpStatusCode.OK).send({
				statusCode: HttpStatusCode.OK,
				error: null,
				data: response,
			});
		} catch (e) {
			next(e);
		}
	};
}
