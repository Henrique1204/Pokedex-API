import { Module } from '@nestjs/common';

import { DrizzlePostgresModule } from '@knaadh/nestjs-drizzle-postgres';

import { DBConfigService } from './postgres.service';

@Module({
  imports: [
    DrizzlePostgresModule.registerAsync({
      tag: 'DATABASE',
      useClass: DBConfigService,
    }),
  ],
  controllers: [],
  providers: [],
})
export class PostgresDB {}
