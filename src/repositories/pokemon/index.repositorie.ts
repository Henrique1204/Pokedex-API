import { sql } from 'drizzle-orm';

import { pokemon } from 'src/db/postgres';

export const selectFormattedPokemon = (pokemonSchema: typeof pokemon) => {
  const pokemonArtworkURL = 'https://img.pokemondb.net/artwork/';
  const pokemonArtworkFileExtension = '.jpg';

  const spriteSchema =
    sql`'${pokemonArtworkURL}' || ${pokemonSchema.name} || '${pokemonArtworkFileExtension}'`.mapWith(
      String,
    );

  return {
    id: pokemonSchema.id,
    name: pokemonSchema.name,
    pokedexNumber: pokemonSchema.pokedex_number,
    types: pokemonSchema.types,
    sprite: spriteSchema,
  };
};
