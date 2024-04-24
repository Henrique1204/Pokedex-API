import { Controller, Get, Param } from '@nestjs/common';

import { PokemonService } from './pokemon.service';

@Controller()
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get('/pokemon/:searchValue')
  async getPokemonByIdOrName(@Param('searchValue') searchValue: string | number) {
    const pokemonSeached = this.pokemonService.findPokemonByDexNumberOrName({ searchValue });

    return pokemonSeached;
  }
}
