import { Field, ObjectType } from '@nestjs/graphql';
import {
	CreateDateColumn,
	DeleteDateColumn,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@ObjectType()
export abstract class AbstractEntity {
	@Field()
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Field()
	@CreateDateColumn({
		type: 'timestamp without time zone',
		default: () => 'CURRENT_TIMESTAMP',
	})
	created_at?: Date;

	@Field({ nullable: true })
	@UpdateDateColumn({
		type: 'timestamp without time zone',
	})
	updated_at?: Date;

	@Field({ nullable: true })
	@DeleteDateColumn({
		type: 'timestamp without time zone',
	})
	deleted_at?: Date;
}
