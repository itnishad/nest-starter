import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './configuration/confg';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import envSchema from './configuration/schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      validate: (env) => {
        const result = envSchema.safeParse(env);
        if (!result.success) {
          throw new Error(
            `Configuration validation error: ${result.error.message}`,
          );
        }
        return result.data;
      },
    }),
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
