import { Inject, Injectable } from '@nestjs/common';
import { count } from 'drizzle-orm';

import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';

import { PokedexRepositorie } from 'src/models/repositories/pokedex.model';
import * as PokemonEntity from 'src/models/entity/pokemon.model';

import * as schema from 'src/database/schemas/postgers';

import { selectFormattedPokemon } from 'src/utils/drizzle/sql/selectPokemon';

@Injectable()
export class PokedexPostgresRepositorie extends PokedexRepositorie {
  private readonly pokemonSchema = schema.pokemon;

  private readonly DEFAULT_PAGE: number = 1;
  private readonly DEFAULT_LIMIT: number = 10;

  constructor(@Inject('DATABASE') private postegresDB: PostgresJsDatabase<typeof schema>) {
    super();
  }

  async findPokedexPaginated({ page = this.DEFAULT_PAGE, limit = this.DEFAULT_LIMIT }) {
    const paginationOffset = (page - this.DEFAULT_PAGE) * limit;

    const pokedexPaginated = await this.postegresDB
      .select(selectFormattedPokemon(this.pokemonSchema))
      .from(this.pokemonSchema)
      .limit(limit)
      .offset(paginationOffset);

    return pokedexPaginated as unknown as PokemonEntity.PokemonResponseData[];
  }

  async getTotalPages({ limit = this.DEFAULT_LIMIT }) {
    const totalRecordsResult = await this.postegresDB
      .select({ count: count() })
      .from(this.pokemonSchema);

    const totalRecords = totalRecordsResult[0].count;
    const totalPages = Math.ceil(totalRecords / limit);

    return totalPages;
  }

  async insertPokemon({ name, pokedexNumber, types }: PokemonEntity.PokemonInsertData) {
    await this.postegresDB.insert(this.pokemonSchema).values({
      name,
      pokedex_number: pokedexNumber,
      types,
    });
  }
}
