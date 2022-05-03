import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber, IsUUID } from "class-validator";

@InputType()
export class FindTaskCategoryInput {

    @Field()
    @IsUUID()
    @IsNotEmpty()
    id: string;
}