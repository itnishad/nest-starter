import { z } from 'zod';

export const signUpSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export type SignUpDto = z.infer<typeof signUpSchema>;
