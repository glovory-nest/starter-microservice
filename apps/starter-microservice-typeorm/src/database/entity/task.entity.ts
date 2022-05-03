import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { TaskCategoryEntity } from './task_category.entity';

export enum TaskStatus {
	PENDING = '1',
	OPEN = '2',
	IN_PROGRESS = '3',
	HOLD = '4',
	CLOSED = '5',
	COMPLETED = '6',
}
registerEnumType(TaskStatus, { name: 'TaskStatus' });

@ObjectType()
@Entity({ name: 'task' })
export class TaskEntity extends AbstractEntity {
	@Field()
	@Column({
		type: 'varchar',
		length: '255',
		nullable: true,
	})
	title: string;

	@Field()
	@Column({
		type: 'text',
		nullable: true,
	})
	description: string;

	@Field(() => TaskStatus)
	@Column({
		type: 'enum',
		enum: TaskStatus,
		default: TaskStatus.PENDING,
	})
	status: TaskStatus;

	@Field()
	@Column({ type: 'uuid' })
	task_category_id: string;

	@Field(() => TaskCategoryEntity, { nullable: true })
	@ManyToOne(() => TaskCategoryEntity, (column) => column.task)
	@JoinColumn({ name: 'task_category_id', referencedColumnName: 'id' })
	task_category: TaskCategoryEntity;
}
