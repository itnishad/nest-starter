import { z } from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number().default(8000),
  DATABASE_URL: z.coerce.string(),
});

export default envSchema;
