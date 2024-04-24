import { Body, Controller, Get, Post, Query } from '@nestjs/common';

import { PokemonInseertData } from 'src/models/entity/pokemon.model';

import { PokedexService } from './pokedex.service';
import { PaginationService } from 'src/modules/index.service';

@Controller()
export class PokedexController {
  constructor(
    private readonly pokedexService: PokedexService,
    private readonly paginationService: PaginationService,
  ) {}

  @Get('/pokedex')
  async getPokedexPaginated(@Query('page') page?: string, @Query('limit') limit?: string) {
    const pageNumber = this.paginationService.parsePageNumber(page);
    const limitNumber = this.paginationService.parseLimitNumber(limit);

    const totalPagesInPokedexPagination = await this.pokedexService.getTotalPages({
      limit: limitNumber,
    });

    const pokedexPaginated = await this.pokedexService.findPokedexPaginated({
      page: pageNumber,
      limit: limitNumber,
    });

    const pokedexResponseWithPagination = this.paginationService.buildResponse({
      page: pageNumber,
      totalPages: totalPagesInPokedexPagination,
      result: pokedexPaginated,
    });

    return pokedexResponseWithPagination;
  }
}
