export const POKEMON_ART_WORK = 'https://img.pokemondb.net/artwork/';
export const POKEMON_ART_WORK_EXTENSION = '.jpg';

export function generateSprite(pokemonName: string) {
  return `${POKEMON_ART_WORK}${pokemonName}${POKEMON_ART_WORK_EXTENSION}`;
}
