import { Module } from '@nestjs/common';

import { PrismaService } from 'src/database/connections/mongodb.service';

import { PokemonRepositorie } from 'src/models/repositories/pokemon.model';
import { PokemonMongodbRepositorie } from 'src/repositories/pokemon/mongodb.service';

import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';

@Module({
  imports: [],
  controllers: [PokemonController],
  providers: [
    PokemonService,
    PrismaService,
    { provide: PokemonRepositorie, useClass: PokemonMongodbRepositorie },
  ],
})
export class PokemonModule {}
