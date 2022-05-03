import { BootModule } from '@glovory-nest/boot';
import { BOOT, CONSUL, LOADBALANCE } from '@glovory-nest/common';
import { ConfigModule } from '@glovory-nest/config';
import { ConsulModule } from '@glovory-nest/consul';
import { HttpModule as NestCloudHttpModule } from '@glovory-nest/http';
import { LoadbalanceModule } from '@glovory-nest/loadbalance';
import { LoggerModule } from '@glovory-nest/logger';
import { ServiceModule } from '@glovory-nest/service';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TerminusModule } from '@nestjs/terminus';
import { TypeOrmModule } from '@nestjs/typeorm';
import { resolve } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { gqlConfigAsync } from "./database/config/graphql.config";
import { typeOrmConfigAsync } from './database/config/typeorm.config';
import { RepoModule } from './database/repo.module';
import { TaskModule } from './modules/task/task.module';
import { TaskCategoryModule } from './modules/task-category/task-category.module';

@Module({
	imports: [
		BootModule.forRoot({
			filePath: resolve(__dirname, 'app.config.yaml'),
		}),
		LoggerModule.forRoot(),
		ConsulModule.forRootAsync({ inject: [BOOT] }),
		ConfigModule.forRootAsync({ inject: [BOOT, CONSUL] }),
		ServiceModule.forRootAsync({ inject: [BOOT, CONSUL] }),
		LoadbalanceModule.forRootAsync({ inject: [BOOT] }),
		NestCloudHttpModule.forRootAsync({ inject: [LOADBALANCE] }),
		TypeOrmModule.forRootAsync(typeOrmConfigAsync),
		GraphQLModule.forRootAsync(gqlConfigAsync),
		HttpModule,
		TerminusModule,
		RepoModule,
		TaskModule,
		TaskCategoryModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
