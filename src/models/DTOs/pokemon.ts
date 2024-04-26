import { PokemonDatabaseData, PokemonResponseData } from 'src/models/entity/pokemon.model';

import { generateSprite } from 'src/utils/generateSprite';

export class PokemonDTO implements PokemonResponseData {
  public id: string;
  public name: string;
  public pokedexNumber: number;
  public types: string[];
  public sprite: string;

  constructor({ id, name, pokedex_number, types }: PokemonDatabaseData) {
    this.id = id.toString();
    this.name = name;
    this.pokedexNumber = pokedex_number;
    this.types = types;
    this.sprite = generateSprite(name);
  }
}
