import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	Tree,
	TreeChildren,
	TreeParent,
} from 'typeorm';

@Entity()
@Tree('closure-table')
export class Category {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	description: string;

	@Column({ default: new Date() })
	date: Date;

	@TreeParent()
	parent: Category | null;

	@TreeChildren()
	children: Array<Category>;
}
