import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { TaskCategoryEntity } from '../../database/entity/task_category.entity';
import { Repo } from '../../database/repo.service';
import { CreateTaskCategoryInput } from './dto/create-data.input';
import { UpdateTaskCategoryInput } from './dto/update-data';

@Injectable()
export class TaskCategoryService {
	constructor(private readonly repo: Repo) {}

	async create(
		createTaskCategoryInput: CreateTaskCategoryInput,
	): Promise<TaskCategoryEntity> {
		return this.repo.taskCategoryEntity.save(createTaskCategoryInput);
	}

	async findAll(): Promise<TaskCategoryEntity[]> {
		return this.repo.taskCategoryEntity.find();
	}

	async findOne(id: string): Promise<TaskCategoryEntity> {
        let getData: TaskCategoryEntity = await this.repo.taskCategoryEntity.findOne(id);
        if(!getData) {
            throw new UnprocessableEntityException('DATA_NOT_FOUND');
        }
		return getData;
	}

	async update(
		id: string,
		updateTaskCategoryInput: UpdateTaskCategoryInput,
	): Promise<TaskCategoryEntity> {
		let getData: TaskCategoryEntity = await this.findOne(id);
		if (!getData) {
			throw new UnprocessableEntityException('DATA_NOT_FOUND');
		}
		return this.repo.taskCategoryEntity.save({
			...getData,
			...updateTaskCategoryInput,
		});
	}

	async remove(id: string): Promise<boolean> {
		await this.repo.taskCategoryEntity.softDelete(id);
		return true;
	}
}
