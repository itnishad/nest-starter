import { Inject, Injectable } from '@nestjs/common';
import { DB } from '../database/database.module';
import * as userSchema from './schema';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import { SignUpDto } from 'src/auth/dto/signUpSchema.dto';
@Injectable()
export class UserService {
  constructor(
    @Inject(DB)
    private readonly databaseService: NodePgDatabase<typeof userSchema>,
  ) {}

  async findUserByEmail(email: string) {
    return (
      (await this.databaseService.query.users.findFirst({
        where: eq(userSchema.users.email, email),
      })) || null
    );
  }

  async createUser(user: SignUpDto) {
    return await this.databaseService.insert(userSchema.users).values(user);
  }
}
