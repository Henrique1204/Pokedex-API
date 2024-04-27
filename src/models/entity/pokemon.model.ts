export type ID = string | number;

export type PokemonDatabaseData = {
  id: ID;
  name: string;
  pokedex_number: number;
  types: string[];
};

export type PokemonResponseData = {
  id: ID;
  name: string;
  pokedexNumber: number;
  types: string[];
  sprite: string;
};

export type PokemonInsertData = Pick<PokemonResponseData, 'name' | 'pokedexNumber' | 'types'>;
