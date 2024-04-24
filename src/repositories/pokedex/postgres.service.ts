import { Inject, Injectable } from '@nestjs/common';
import { count, sql } from 'drizzle-orm';

import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';

import { PokedexRepositore } from 'src/models/pokedexRepositorie.model';
import * as PokemonEntity from 'src/models/entity/pokemon.model';

import * as schema from 'src/database/schemas/postgers';
import { pokemon } from 'src/database/schemas/postgers';

@Injectable()
export class PokedexPostgresRepositorie extends PokedexRepositore {
  private readonly pokemonSchema = schema.pokemon;

  private readonly DEFAULT_PAGE: number = 1;
  private readonly DEFAULT_LIMIT: number = 10;

  constructor(@Inject('DATABASE') private postegresDB: PostgresJsDatabase<typeof schema>) {
    super();
  }

  private selectFormattedPokemon(pokemonSchema: typeof pokemon) {
    const pokemonArtworkURL = 'https://img.pokemondb.net/artwork/';
    const pokemonArtworkFileExtension = '.jpg';

    const spriteSchema =
      sql`${pokemonArtworkURL} || ${pokemonSchema.name} || ${pokemonArtworkFileExtension}`.mapWith(
        String,
      );

    return {
      id: pokemonSchema.id,
      name: pokemonSchema.name,
      pokedexNumber: pokemonSchema.pokedex_number,
      types: pokemonSchema.types,
      sprite: spriteSchema,
    };
  }

  async findPokedexPaginated({ page = this.DEFAULT_PAGE, limit = this.DEFAULT_LIMIT }) {
    const paginationOffset = (page - this.DEFAULT_PAGE) * limit;

    const pokedexPaginated = await this.postegresDB
      .select(this.selectFormattedPokemon(this.pokemonSchema))
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

  async insertPokemon(uai: PokemonEntity.PokemonInseertData) {
    const { name, pokedexNumber, types } = uai;

    await this.postegresDB.insert(this.pokemonSchema).values({
      name,
      pokedex_number: pokedexNumber,
      types,
    });
  }
}
