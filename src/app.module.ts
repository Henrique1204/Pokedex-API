import { Module } from '@nestjs/common';

import { DrizzleDB } from 'src/modules/databaseConnections/drizzle/index.module';

@Module({
  imports: [DrizzleDB],
  controllers: [],
  providers: [],
})
export class AppModule {}
