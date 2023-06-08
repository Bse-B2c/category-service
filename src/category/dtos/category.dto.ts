import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CategoryDto {
	@IsNotEmpty()
	@IsString()
	name: string;

	@IsNotEmpty()
	@IsString()
	description: string;

	@IsOptional()
	@IsNumber()
	parentId: number;
}
