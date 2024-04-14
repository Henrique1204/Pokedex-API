import { Module } from '@nestjs/common';

import { DrizzleDB } from 'src/modules/databaseConnections/drizzle/index.module';
import { PokedexModule } from 'src/modules/pokedex/index.module';

@Module({
  imports: [DrizzleDB, PokedexModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
