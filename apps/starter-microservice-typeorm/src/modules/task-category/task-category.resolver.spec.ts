import { Test, TestingModule } from '@nestjs/testing';
import { TaskCategoryResolver } from './task-category.resolver';
import { TaskCategoryService } from './task-category.service';

describe('TaskCategoryResolver', () => {
	let resolver: TaskCategoryResolver;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [TaskCategoryResolver, TaskCategoryService],
		}).compile();

		resolver = module.get<TaskCategoryResolver>(TaskCategoryResolver);
	});

	it('should be defined', () => {
		expect(resolver).toBeDefined();
	});
});
