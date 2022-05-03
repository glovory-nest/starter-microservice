import { BOOT, IBoot } from '@glovory-nest/common';
import { NestLogger } from '@glovory-nest/logger';
import { BadRequestException, ClassSerializerInterceptor, ValidationError, ValidationPipe } from "@nestjs/common";
import { NestFactory, Reflector } from '@nestjs/core';
import { resolve } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		logger: new NestLogger({
			filePath: resolve(__dirname, 'app.config.yaml'),
		}),
	});
	process.on('SIGINT', async () => {
		setTimeout(() => process.exit(1), 5000);
		await app.close();
		process.exit(0);
	});
    process.on('SIGTERM', async () => {
		setTimeout(() => process.exit(1), 5000);
		await app.close();
		process.exit(0);
	});

    // Add validation pipe
    app.useGlobalPipes(new ValidationPipe({
        exceptionFactory: (error: ValidationError[] = []) => {
            let fields: Record<string, Record<string, string>> = {};
            error.forEach(field => {
                fields[field.property] = field.constraints;
            })
            return new BadRequestException({
                statusCode: 400,
                message: 'BAD_USER_INPUT',
                data: fields
            });
        },
    }));
    app.useGlobalInterceptors(
        new ClassSerializerInterceptor(app.get(Reflector))
    );

	const boot = app.get<IBoot>(BOOT);
	await app.listen(boot.get('service.port', 3000));
}
bootstrap();
