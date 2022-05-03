import { Global, Module } from '@nestjs/common';
import { Repo } from './repo.service';

@Global()
@Module({
	imports: [],
	providers: [Repo],
	exports: [Repo],
})
export class RepoModule {}
