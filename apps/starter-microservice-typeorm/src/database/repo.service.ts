import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskEntity } from './entity/task.entity';
import { TaskCategoryEntity } from './entity/task_category.entity';

@Injectable()
export class Repo {
	constructor(
		@InjectRepository(TaskEntity)
		public readonly taskEntity: Repository<TaskEntity>,
		@InjectRepository(TaskCategoryEntity)
		public readonly taskCategoryEntity: Repository<TaskCategoryEntity>,
	) {}
}
