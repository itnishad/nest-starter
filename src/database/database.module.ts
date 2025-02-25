import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';

export const DB = 'DATABASE_CONFIG';

@Module({
  providers: [
    {
      provide: DB,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const dbUrl = configService.get<string>('DATABASE_URL');
        const pool = new Pool({
          connectionString: dbUrl,
        });
        return drizzle(pool, {
          schema: {},
        });
      },
    },
  ],
  exports: [DB],
})
export class DatabaseModule {}
