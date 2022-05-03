import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTaskCategoryInput {
	@Field()
	name: string;

	@Field({ defaultValue: 'FFFFFF' })
	fore_color: string;

	@Field({ defaultValue: '000000' })
	back_color: string;
}
