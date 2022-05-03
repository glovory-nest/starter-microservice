import { BootModule } from '@glovory-nest/boot';
import { BOOT, CONSUL, IService, LOADBALANCE } from '@glovory-nest/common';
import { ConfigModule } from '@glovory-nest/config';
import { ConsulModule } from '@glovory-nest/consul';
import { LoadbalanceModule } from '@glovory-nest/loadbalance';
import { InjectService, ServiceModule } from '@glovory-nest/service';
import { HttpModule as NestCloudHttpModule } from '@glovory-nest/http';
import { Module, OnModuleInit } from '@nestjs/common';
import { resolve } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { LoggerModule } from '@glovory-nest/logger';
import { RepoModule } from "./database/repo.module";

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
		HttpModule,
		TerminusModule,
        RepoModule
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule implements OnModuleInit {
    constructor(@InjectService() private readonly service: IService) {}
    onModuleInit() {
        const servers = this.service.getServiceServers('starter-microservice-typeorm', true);
        console.log(servers);
    }
}
