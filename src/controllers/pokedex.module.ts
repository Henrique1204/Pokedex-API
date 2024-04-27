import { Module } from '@nestjs/common';

import { PaginationService } from 'src/modules/index.service';

import { PrismaService } from 'src/database/connections/mongodb.service';

import { PokedexRepositorie } from 'src/models/repositories/pokedex.model';
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
