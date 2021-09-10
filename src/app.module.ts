import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversacionModule } from './conversacion/conversacion.module';

@Module({
  imports: [
    ConversacionModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      installSubscriptionHandlers: true,
      formatError: (err) => ({
        ...err,
        extensions: {
          ...err.extensions,
          exception: null,
        },
      }),
      context: ({ req, connection }) => {
        if (connection?.context) {
          return { req: { headers: connection.context } };
        }
        return { req };
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'postgres',
      database: 'chatest',
      entities: ['dist/**/*.model.js'],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
