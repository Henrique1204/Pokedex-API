import { Inject, Injectable } from '@nestjs/common';
import { count, eq, sql } from 'drizzle-orm';

import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';

import {
  FindPokemonByDexNumberParams,
  FindoPokemonByNameParams,
  PokemonRepositorie,
} from 'src/models/repositories/pokemon.model';

import * as PokemonEntity from 'src/models/entity/pokemon.model';

import * as schema from 'src/database/schemas/postgers';

import { selectFormattedPokemon } from 'src/utils/drizzle/sql/selectPokemon';

@Injectable()
export class PokemonPostgresRepositorie extends PokemonRepositorie {
  private readonly pokemonSchema = schema.pokemon;

  constructor(@Inject('DATABASE') private postegresDB: PostgresJsDatabase<typeof schema>) {
    super();
  }

  async findPokemonByDexNumber({
    pokemonDexNumber,
  }: FindPokemonByDexNumberParams): Promise<PokemonEntity.PokemonResponseData> {
    const pokemonSelected = await this.postegresDB
      .select(selectFormattedPokemon(this.pokemonSchema))
      .from(this.pokemonSchema)
      .where(eq(this.pokemonSchema.pokedex_number, pokemonDexNumber));

    return pokemonSelected as unknown as PokemonEntity.PokemonResponseData;
  }

  async findPokemonByName({
    pokemonName,
  }: FindoPokemonByNameParams): Promise<PokemonEntity.PokemonResponseData> {
    const pokemonSelected = await this.postegresDB
      .select(selectFormattedPokemon(this.pokemonSchema))
      .from(this.pokemonSchema)
      .where(eq(this.pokemonSchema.name, pokemonName.toLowerCase()));

    return pokemonSelected as unknown as PokemonEntity.PokemonResponseData;
  }
}
