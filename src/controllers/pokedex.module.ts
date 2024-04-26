import { Module } from '@nestjs/common';

import { PokedexRepositorie } from 'src/models/repositories/pokedex.model';

import { PaginationService } from 'src/modules/index.service';

import { PrismaService } from 'src/database/connections/mongodb.service';

import { PokedexPostgresRepositorie } from 'src/repositories/pokedex/postgres.service';
import { PokedexMongodbRepositorie } from 'src/repositories/pokedex/mongodb.service';

import { PokedexController } from './pokedex.controller';
import { PokedexService } from './pokedex.service';

@Module({
  imports: [],
  controllers: [PokedexController],
  providers: [
    PokedexService,
    PaginationService,
    PrismaService,
    { provide: PokedexRepositorie, useClass: PokedexMongodbRepositorie },
  ],
})
export class PokedexModule {}
