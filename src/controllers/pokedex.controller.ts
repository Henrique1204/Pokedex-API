import { BadRequestException, Controller, Get, NotFoundException, Query } from '@nestjs/common';

import { PaginationService } from 'src/modules/index.service';

import { PokedexService } from './pokedex.service';

@Controller()
export class PokedexController {
  constructor(
    private readonly pokedexService: PokedexService,
    private readonly paginationService: PaginationService,
  ) {}

  private validateMinPageNumber(pageNumber: number): void {
    const PAGE_MIN = 1;
    const pageNumberIsLessThanPageMin = pageNumber < PAGE_MIN;
    const isNotANumber = isNaN(Number(pageNumber));

    if (pageNumberIsLessThanPageMin || isNotANumber) {
      throw new NotFoundException('O valor "page" precisa ser maior que 0.');
    }
  }

  private validateMinLimit(limit: number): void {
    const LIMIT_MIN = 1;
    const limitIsLessThanPageMin = limit < LIMIT_MIN;
    const isNotANumber = isNaN(Number(limit));

    if (limitIsLessThanPageMin || isNotANumber) {
      throw new BadRequestException('O valor "limit" precisa ser maior que 0.');
    }
  }

  private validateMaxPageNumber(pageNumber: number, totalPages: number): void {
    const limitIsBigThanPageMin = pageNumber > totalPages;
    const isNotANumber = isNaN(Number(pageNumber));

    if (limitIsBigThanPageMin || isNotANumber) {
      throw new NotFoundException(`O valor "page" precisa ser menor que ${totalPages}.`);
    }
  }

  @Get('/pokedex')
  async getPokedexPaginated(@Query('page') page?: string, @Query('limit') limit?: string) {
    const pageNumber = this.paginationService.parsePageNumber(page);
    const limitNumber = this.paginationService.parseLimitNumber(limit);

    this.validateMinLimit(limitNumber);
    this.validateMinPageNumber(pageNumber);

    const totalPagesInPokedexPagination = await this.pokedexService.getTotalPages({
      limit: limitNumber,
    });

    const pokedexPaginated = await this.pokedexService.findPokedexPaginated({
      page: pageNumber,
      limit: limitNumber,
    });

    this.validateMaxPageNumber(pageNumber, totalPagesInPokedexPagination);

    const pokedexResponseWithPagination = this.paginationService.buildResponse({
      page: pageNumber,
      totalPages: totalPagesInPokedexPagination,
      result: pokedexPaginated,
    });

    return pokedexResponseWithPagination;
  }
}
