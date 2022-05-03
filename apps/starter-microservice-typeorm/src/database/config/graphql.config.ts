import { BOOT, IBoot } from "@glovory-nest/common";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { GqlModuleAsyncOptions } from "@nestjs/graphql";
import { resolve } from "path";

export const gqlConfigAsync: GqlModuleAsyncOptions<ApolloDriverConfig> = {
    driver: ApolloDriver,
    useFactory: (configBoot: IBoot) => ({
        debug: configBoot.get<boolean>('graphql.debug', false),
        playground: configBoot.get<boolean>('graphql.playground', false),
        autoSchemaFile: resolve(__dirname, 'app.schema.gql'),
    }),
    inject: [BOOT]
}