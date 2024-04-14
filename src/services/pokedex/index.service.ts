import { Inject, Injectable } from '@nestjs/common';
import { count } from 'drizzle-orm';

import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';

import * as schema from 'src/db/postgres';
import { PokemonData } from 'src/models/pokemon/index.model';

import { selectFormattedPokemon } from 'src/repositories/pokemon/index.repositorie';

@Injectable()
export class PokedexService {
  private readonly DEFAULT_PAGE: number = 1;
  private readonly DEFAULT_LIMIT: number = 10;

  constructor(@Inject('DATABASE') private postegresDB: PostgresJsDatabase<typeof schema>) {}

  async findPokedexPaginated(
    paginationPage: number = this.DEFAULT_PAGE,
    paginationLimit: number = this.DEFAULT_LIMIT,
  ) {
    const paginationOffset = (paginationPage - this.DEFAULT_PAGE) * paginationLimit;

    const pokemonSchema = schema.pokemon;

    const pokedexPaginated = await this.postegresDB
      .select(selectFormattedPokemon(pokemonSchema))
      .from(pokemonSchema)
      .limit(paginationLimit)
      .offset(paginationOffset);

    return pokedexPaginated as unknown as PokemonData[];
  }

  async getTotalPages(limit: number = this.DEFAULT_LIMIT): Promise<number> {
    const pokemonSchema = schema.pokemon;

    const totalRecordsResult = await this.postegresDB
      .select({ count: count() })
      .from(pokemonSchema);

    const totalRecords = totalRecordsResult[0].count;
    const totalPages = Math.ceil(totalRecords / limit);

    return totalPages;
  }
}
