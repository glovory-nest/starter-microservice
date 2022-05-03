import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './entity/task.entity';
import { TaskCategoryEntity } from './entity/task_category.entity';
import { Repo } from './repo.service';

@Global()
@Module({
	imports: [
		// Load entity
		TypeOrmModule.forFeature([TaskEntity, TaskCategoryEntity]),
	],
	providers: [Repo],
	exports: [Repo],
})
export class RepoModule {}
