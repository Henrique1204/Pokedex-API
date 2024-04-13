import { DrizzlePostgresModule } from '@knaadh/nestjs-drizzle-postgres';

import { Module } from '@nestjs/common';

import * as schema from 'src/db/postgres';

@Module({
  imports: [
    DrizzlePostgresModule.register({
      tag: 'DATABASE',
      postgres: {
        url: 'postgres://postgres:@seuHost:suaPorta/seuBanco',
        config: {
          hostname: 'secret',
          username: 'secret',
          password: 'secret',
          database: 'secret',
        },
      },
      config: { schema },
    }),
  ],
  controllers: [],
  providers: [],
})
export class DrizzleDB {}
