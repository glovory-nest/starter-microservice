import { BOOT, IBoot } from '@glovory-nest/common';
import { TypeormLogger, TYPEORM_LOGGER } from '@glovory-nest/logger';
import {
	TypeOrmModuleAsyncOptions,
	TypeOrmModuleOptions,
} from '@nestjs/typeorm';

export default class TypeOrmConfig {
	static getConfig(
		config: IBoot,
		logger: TypeormLogger,
	): TypeOrmModuleOptions {
		return {
			type: config.get('database.type', 'postgres'),
			url: config.get('database.url'),
			synchronize: config.get<boolean>('database.synchronize', true),
			migrationsRun: config.get<boolean>('database.migrationsRun', false),
			autoLoadEntities: true,
			maxQueryExecutionTime: config.get(
				'database.maxQueryExecutionTime',
				1000,
			),
			logging: ['error', 'warn'],
			logger,
		};
	}
}

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
	useFactory: async (configBoot: IBoot, logger: TypeormLogger) =>
		TypeOrmConfig.getConfig(configBoot, logger),
	inject: [BOOT, TYPEORM_LOGGER],
};
