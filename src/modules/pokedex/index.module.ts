import { Module } from '@nestjs/common';

import { PokedexController } from 'src/controllers/pokedex/index.controller';

import { PaginationService } from 'src/services/pagination/index.service';
import { PokedexService } from 'src/services/pokedex/index.service';

@Module({
  imports: [],
  controllers: [PokedexController],
  providers: [PokedexService, PaginationService],
})
export class PokedexModule {}
