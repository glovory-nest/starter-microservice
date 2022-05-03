import { InputType, Field } from '@nestjs/graphql';
import { TaskStatus } from '../../../database/entity/task.entity';

@InputType()
export class CreateTaskInput {
	@Field()
	title: string;

	@Field()
	description: string;

	@Field(() => TaskStatus, { defaultValue: TaskStatus.PENDING })
	status: TaskStatus;

	@Field()
	task_category_id: string;
}
