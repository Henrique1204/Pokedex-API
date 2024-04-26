export type PokemonDatabaseData = {
  id: string | number;
  name: string;
  pokedex_number: number;
  types: string[];
};

export type PokemonResponseData = {
  id: string;
  name: string;
  pokedexNumber: number;
  types: string[];
  sprite: string;
};

export type PokemonInseertData = Pick<PokemonResponseData, 'name' | 'pokedexNumber' | 'types'>;
