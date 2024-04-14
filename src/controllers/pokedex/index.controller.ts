import { Controller, Get, Query } from '@nestjs/common';

import { PokedexService } from 'src/services/pokedex/index.service';
import { PaginationService } from 'src/services/pagination/index.service';

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

    const totalPagesInPokedexPagination = await this.pokedexService.getTotalPages(limitNumber);

    const pokedexPaginated = await this.pokedexService.findPokedexPaginated(
      pageNumber,
      limitNumber,
    );

    const pokedexResponseWithPagination = this.paginationService.buildResponse({
      page: pageNumber,
      totalPages: totalPagesInPokedexPagination,
      result: pokedexPaginated,
    });

    return pokedexResponseWithPagination;
  }
}
