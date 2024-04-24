import { sql } from 'drizzle-orm';

import * as schema from 'src/database/schemas/postgers';

export function selectFormattedPokemon(pokemonSchema: typeof schema.pokemon) {
  const pokemonArtworkURL = 'https://img.pokemondb.net/artwork/';
  const pokemonArtworkFileExtension = '.jpg';

  const spriteSchema =
    sql`${pokemonArtworkURL} || ${pokemonSchema.name} || ${pokemonArtworkFileExtension}`.mapWith(
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
