import { Module } from '@nestjs/common';

import { PokemonRepositorie } from 'src/models/repositories/pokemon.model';

import { PokemonPostgresRepositorie } from 'src/repositories/pokemon/postgres.service';

import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';

@Module({
  imports: [],
  controllers: [PokemonController],
  providers: [
    PokemonService,
    { provide: PokemonRepositorie, useClass: PokemonPostgresRepositorie },
  ],
})
export class PokemonModule {}
