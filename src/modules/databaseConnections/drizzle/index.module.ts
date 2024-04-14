import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { DrizzlePostgresModule } from '@knaadh/nestjs-drizzle-postgres';

import * as schema from 'src/db/postgres';

const configService = new ConfigService();

@Module({
  imports: [
    DrizzlePostgresModule.register({
      tag: 'DATABASE',
      postgres: {
        url: configService.get<string>('DATABASE_URL'),
        config: {
          hostname: configService.get<string>('DATABASE_HOSTNAME'),
          username: configService.get<string>('DATABASE_USERNAME'),
          password: configService.get<string>('DATABASE_PASSWORD'),
          database: configService.get<string>('DATABASE_NAME'),
        },
      },
      config: { schema },
    }),
  ],
  controllers: [],
  providers: [],
})
export class DrizzleDB {}
