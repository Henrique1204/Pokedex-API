import { sql } from 'drizzle-orm';

import { POKEMON_ART_WORK, POKEMON_ART_WORK_EXTENSION } from 'src/utils/generateSprite';

import * as schema from 'src/database/schemas/postgers';

export function selectFormattedPokemon(pokemonSchema: typeof schema.pokemon) {
  const spriteSchema =
    sql`${POKEMON_ART_WORK} || ${pokemonSchema.name} || ${POKEMON_ART_WORK_EXTENSION}`.mapWith(
      String,
    );

  return {
    id: pokemonSchema.id,
    name: sql`lower(${pokemonSchema.name})`,
    pokedexNumber: pokemonSchema.pokedex_number,
    types: pokemonSchema.types,
    sprite: spriteSchema,
  };
}
