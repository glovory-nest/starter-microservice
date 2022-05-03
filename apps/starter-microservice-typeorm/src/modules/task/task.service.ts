import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { TaskEntity } from '../../database/entity/task.entity';
import { Repo } from '../../database/repo.service';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';

@Injectable()
export class TaskService {
	constructor(private readonly repo: Repo) {}

	async create(createTaskInput: CreateTaskInput): Promise<TaskEntity> {
		return this.repo.taskEntity.save(createTaskInput);
	}

	async findAll(): Promise<TaskEntity[]> {
		return this.repo.taskEntity.find();
	}

	async findOne(id: string): Promise<TaskEntity> {
        let getData: TaskEntity = await this.repo.taskEntity.findOne(id);
		if (!getData) {
			throw new UnprocessableEntityException('DATA_NOT_FOUND');
		}
		return getData;
	}

	async update(
		id: string,
		updateTaskInput: UpdateTaskInput,
	): Promise<TaskEntity> {
		let getData: TaskEntity = await this.findOne(id);
		if (!getData) {
			throw new UnprocessableEntityException('DATA_NOT_FOUND');
		}
		return this.repo.taskEntity.save({
			...getData,
			...updateTaskInput,
		});
	}

	async remove(id: string): Promise<boolean> {
		await this.repo.taskEntity.softDelete(id);
		return true;
	}
}
