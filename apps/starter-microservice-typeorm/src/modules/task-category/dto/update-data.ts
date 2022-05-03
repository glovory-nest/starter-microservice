import { CreateTaskCategoryInput } from './create-data.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsUUID } from "class-validator";

@InputType()
export class UpdateTaskCategoryInput extends PartialType(
	CreateTaskCategoryInput,
) {
	@Field()
    @IsUUID()
	id: string;
}
