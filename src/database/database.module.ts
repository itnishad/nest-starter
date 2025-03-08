import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as userSchema from '../user/schema';
export const DB = 'DATABASE_CONFIG';

@Module({
  providers: [
    {
      provide: DB,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const DBURL = configService.get<string>('DATABASE_URL');
        const pool = new Pool({
          connectionString: DBURL,
        });
        return drizzle(pool, {
          schema: { ...userSchema },
        });
      },
    },
  ],
  exports: [DB],
})
export class DatabaseModule {}
