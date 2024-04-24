import { Module } from '@nestjs/common';

import { PokedexRepositorie } from 'src/models/repositories/pokedex.model';

import { PaginationService } from 'src/modules/index.service';

import { PokedexPostgresRepositorie } from 'src/repositories/pokedex/postgres.service';

import { PokedexController } from './pokedex.controller';
import { PokedexService } from './pokedex.service';

@Module({
  imports: [],
  controllers: [PokedexController],
  providers: [
    PokedexService,
    PaginationService,
    { provide: PokedexRepositorie, useClass: PokedexPostgresRepositorie },
  ],
})
export class PokedexModule {}
