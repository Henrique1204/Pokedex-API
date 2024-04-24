import { Module } from '@nestjs/common';

import { PokedexRepositore } from 'src/models/pokedexRepositorie.model';

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
    { provide: PokedexRepositore, useClass: PokedexPostgresRepositorie },
  ],
})
export class PokedexModule {}
