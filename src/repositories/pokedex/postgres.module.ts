import { Module } from '@nestjs/common';

import { PokedexPostgresRepositorie } from './postgres.service';

@Module({
  imports: [],
  controllers: [],
  providers: [PokedexPostgresRepositorie],
})
export class PokedexPostgresRepositorieModule {}
