import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TaskService } from './task.service';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { TaskEntity } from '../../database/entity/task.entity';

@Resolver()
export class TaskResolver {
	constructor(private readonly taskService: TaskService) {}

	@Mutation(() => TaskEntity)
	async taskCreate(
		@Args('createTaskInput') createTaskInput: CreateTaskInput,
	) {
		return this.taskService.create(createTaskInput);
	}

	@Query(() => [TaskEntity])
	async taskFindAll() {
		return this.taskService.findAll();
	}

	@Query(() => TaskEntity)
	async taskFindOne(@Args('id') id: string) {
		return this.taskService.findOne(id);
	}

	@Mutation(() => TaskEntity)
	async taskUpdate(
		@Args('updateTaskInput') updateTaskInput: UpdateTaskInput,
	) {
		return this.taskService.update(updateTaskInput.id, updateTaskInput);
	}

	@Mutation(() => Boolean)
	async taskRemove(@Args('id', { type: () => String }) id: string) {
		return this.taskService.remove(id);
	}
}
