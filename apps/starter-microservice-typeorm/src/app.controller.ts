import { InjectBoot } from '@glovory-nest/boot';
import { IBoot } from '@glovory-nest/common';
import { Controller, Get } from '@nestjs/common';
import { HealthCheckService, TypeOrmHealthIndicator } from '@nestjs/terminus';

@Controller()
export class AppController {
	constructor(
		private readonly health: HealthCheckService,
		private readonly typeormIndicator: TypeOrmHealthIndicator,
		@InjectBoot() private readonly boot: IBoot,
	) {}

	@Get('/')
	getHello() {
		return {
			name: this.boot.get<string>('service.name', 'starter-microservice'),
			version: process.env.npm_package_version,
		};
	}

	@Get('/health')
	getHealth() {
		return this.health.check([
			() => this.typeormIndicator.pingCheck('database'),
		]);
	}
}
