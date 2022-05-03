import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { TaskEntity } from './task.entity';

@ObjectType()
@Entity({ name: 'task_category' })
export class TaskCategoryEntity extends AbstractEntity {
	@Field()
	@Column({
		type: 'varchar',
		length: 100,
	})
	name: string;

	@Field()
	@Column({
		type: 'varchar',
		length: 10,
		default: () => "'FFFFFF'",
		comment:
			'Custom foreground color using HEX without #. example: white=FFFFFF',
	})
	fore_color: string;

	@Field()
	@Column({
		type: 'varchar',
		length: 10,
		default: () => "'000000'",
		comment:
			'Custom background color using HEX without #. example: white=FFFFFF',
	})
	back_color: string;

	@OneToMany(() => TaskEntity, (column) => column.task_category)
	task: TaskEntity[];
}
