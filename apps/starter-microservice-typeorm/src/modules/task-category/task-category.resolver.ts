import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTaskCategoryInput } from './dto/create-data.input';
import { FindTaskCategoryInput } from './dto/find-data.input';
import { UpdateTaskCategoryInput } from './dto/update-data';
import { TaskCategoryService } from './task-category.service';
import { TaskCategoryEntity } from '../../database/entity/task_category.entity';

@Resolver()
export class TaskCategoryResolver {
	constructor(private readonly taskCategoryService: TaskCategoryService) {}

	@Mutation(() => TaskCategoryEntity)
	async taskCategoryCreate(
		@Args('createTaskCategoryInput')
		createTaskCategoryInput: CreateTaskCategoryInput,
	) {
		return this.taskCategoryService.create(createTaskCategoryInput);
	}

	@Query(() => [TaskCategoryEntity])
	async taskCategoryFindAll() {
		return this.taskCategoryService.findAll();
	}

	@Query(() => TaskCategoryEntity)
	async taskCategoryFindOne(
        @Args('findTaskCategoryInput') 
        findTaskCategoryInput: FindTaskCategoryInput
    ) {
		return this.taskCategoryService.findOne(findTaskCategoryInput.id);
	}

	@Mutation(() => TaskCategoryEntity)
	async taskCategoryUpdate(
		@Args('updateTaskCategoryInput')
		updateTaskCategoryInput: UpdateTaskCategoryInput,
	) {
		return this.taskCategoryService.update(
			updateTaskCategoryInput.id,
			updateTaskCategoryInput,
		);
	}

	@Mutation(() => Boolean)
	async taskCategoryRemove(@Args('id', { type: () => String }) id: string) {
		return this.taskCategoryService.remove(id);
	}
}
