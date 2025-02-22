import { z } from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number().default(8000),
});

export default envSchema;
