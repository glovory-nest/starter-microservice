import { Module } from '@nestjs/common';
import { TaskCategoryService } from './task-category.service';
import { TaskCategoryResolver } from './task-category.resolver';

@Module({
	providers: [TaskCategoryResolver, TaskCategoryService],
})
export class TaskCategoryModule {}
