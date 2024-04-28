import { PokemonResponseData } from 'src/models/entity/pokemon.model';

import { generateSprite } from 'src/utils/generateSprite';

export const pokemonResponseMock: PokemonResponseData = {
  id: '1',
  name: 'bulbasaur',
  pokedexNumber: 1,
  types: ['grass', 'poison'],
  sprite: generateSprite('bulbasaur'),
};

export const pokedexResponseMock: PokemonResponseData[] = [pokemonResponseMock];
