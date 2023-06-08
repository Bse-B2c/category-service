import { formatQueryToArray } from '@src/common/utils/query.utils';
import { Transform } from 'class-transformer';
import {
	IsIn,
	IsISO8601,
	IsNumber,
	IsOptional,
	IsString,
} from 'class-validator';

export class SearchDto {
	@IsOptional()
	@Transform(({ value }) => {
		if (value) return formatQueryToArray(value).map((e: string) => +e);

		return value;
	})
	ids?: Array<number>;

	@IsOptional()
	@IsString()
	name?: string;

	@IsOptional()
	@IsString()
	description?: string;

	@IsOptional()
	@IsISO8601()
	date: Date;

	@IsOptional()
	@IsNumber()
	@Transform(({ value }) => +value)
	parentId?: number;

	@IsIn(['DESC', 'ASC'])
	@IsOptional()
	sortOrder: string;

	@IsString()
	@IsIn(['name', 'date'])
	@IsOptional()
	orderBy?: string;

	@IsNumber({}, { message: 'page must be a valid number' })
	@IsOptional()
	@Transform(({ value }) => +value)
	page?: number;

	@IsNumber({}, { message: 'limit must be a valid number' })
	@IsOptional()
	@Transform(({ value }) => +value)
	limit?: number;
}
