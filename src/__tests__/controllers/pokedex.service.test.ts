import { Test, TestingModule } from '@nestjs/testing';

import { pokedexResponseMock, pokemonResponseMock } from 'src/__mocks__/pokemon';
import * as PokedexRepositorieMocks from 'src/__mocks__/repositories/pokedex';

import { PokedexRepositorie } from 'src/models/repositories/pokedex.model';

import { PokedexService } from 'src/controllers/pokedex.service';

describe('PokedexService', () => {
  let pokedexService: PokedexService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PokedexService,
        { provide: PokedexRepositorie, useClass: PokedexRepositorieMocks.PokedexRepositorieMock },
      ],
    }).compile();

    pokedexService = module.get<PokedexService>(PokedexService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should be defined.', () => {
    expect(pokedexService).toBeDefined();
  });

  it('Should return an array of pokemons paginated with default settings.', async () => {
    const pokedexData = await pokedexService.findPokedexPaginated({});

    expect(pokedexData).toBe(pokedexResponseMock);

    expect(PokedexRepositorieMocks.findPokedexPaginatedMock).toHaveBeenCalledTimes(1);

    expect(PokedexRepositorieMocks.findPokedexPaginatedMock).toHaveBeenCalledWith({
      limit: PokedexRepositorieMocks.DEFAULT_LIMIT,
      page: PokedexRepositorieMocks.DEFAULT_PAGE,
    });
  });

  it('Should return an array of pokemons paginated with custom settings.', async () => {
    const CUSTOM_LIMIT = 20;
    const CUSTOM_PAGE = 2;

    const pokedexData = await pokedexService.findPokedexPaginated({
      limit: CUSTOM_LIMIT,
      page: CUSTOM_PAGE,
    });

    expect(pokedexData).toBe(pokedexResponseMock);

    expect(PokedexRepositorieMocks.findPokedexPaginatedMock).toHaveBeenCalledTimes(1);

    expect(PokedexRepositorieMocks.findPokedexPaginatedMock).toHaveBeenCalledWith({
      limit: CUSTOM_LIMIT,
      page: CUSTOM_PAGE,
    });
  });

  it('Should return the total number of pages for pagination with default limit.', async () => {
    const totalPages = await pokedexService.getTotalPages({});

    expect(totalPages).toBe(PokedexRepositorieMocks.DEFAULT_TOTAL_PAGE);

    expect(PokedexRepositorieMocks.getTotalPagesMock).toHaveBeenCalledTimes(1);

    expect(PokedexRepositorieMocks.getTotalPagesMock).toHaveBeenCalledWith({
      limit: PokedexRepositorieMocks.DEFAULT_LIMIT,
    });
  });

  it('Should return the total number of pages for pagination with custom limit.', async () => {
    const CUSTOM_LIMIT = 20;

    const totalPages = await pokedexService.getTotalPages({ limit: CUSTOM_LIMIT });

    expect(totalPages).toBe(PokedexRepositorieMocks.DEFAULT_TOTAL_PAGE);

    expect(PokedexRepositorieMocks.getTotalPagesMock).toHaveBeenCalledTimes(1);

    expect(PokedexRepositorieMocks.getTotalPagesMock).toHaveBeenCalledWith({
      limit: CUSTOM_LIMIT,
    });
  });

  it('Should execute the insert method of the repository with the defined object.', async () => {
    const newPokemon = {
      name: pokemonResponseMock.name,
      pokedexNumber: pokemonResponseMock.pokedexNumber,
      types: pokemonResponseMock.types,
    };

    const voidReturn = await pokedexService.insertPokemon(newPokemon);

    expect(voidReturn).toBeUndefined();

    expect(PokedexRepositorieMocks.insertPokemonMock).toHaveBeenCalledTimes(1);
    expect(PokedexRepositorieMocks.insertPokemonMock).toHaveBeenCalledWith(newPokemon);
  });
});
