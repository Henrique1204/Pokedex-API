import { Test, TestingModule } from '@nestjs/testing';

import { pokedexResponseMock } from 'src/__mocks__/pokemon';

import * as PokedexRepositorieMocks from 'src/__mocks__/repositories/pokedex';

import { PokedexRepositorie } from 'src/models/repositories/pokedex.model';

import { PaginationService } from 'src/modules/index.service';

import { PokedexService } from 'src/controllers/pokedex.service';
import { PokedexController } from 'src/controllers/pokedex.controller';

describe('PokedexService', () => {
  let pokedexController: PokedexController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PokedexController],
      providers: [
        PokedexService,
        PaginationService,
        { provide: PokedexRepositorie, useClass: PokedexRepositorieMocks.PokedexRepositorieMock },
      ],
    }).compile();

    pokedexController = module.get<PokedexController>(PokedexController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should be defined.', () => {
    expect(pokedexController).toBeDefined();
  });

  it('Should return paginated data with default settings.', async () => {
    const expectedResponsePaginated = {
      next: 2,
      prev: null,
      totalPages: 2,
      result: pokedexResponseMock,
    };

    const pokedexPaginated = await pokedexController.getPokedexPaginated();

    expect(pokedexPaginated).toEqual(expectedResponsePaginated);
  });

  it('Should return paginated data with custom settings.', async () => {
    const FIMAL_PAGE = '2';
    const CUSTOM_LIMIT = '1';

    const expectedResponsePaginated = {
      next: null,
      prev: 1,
      totalPages: 2,
      result: pokedexResponseMock,
    };

    const pokedexPaginated = await pokedexController.getPokedexPaginated(FIMAL_PAGE, CUSTOM_LIMIT);

    expect(pokedexPaginated).toEqual(expectedResponsePaginated);
  });
});
