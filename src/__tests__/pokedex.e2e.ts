import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';

import * as request from 'supertest';

import { AppModule } from '../app.module';

describe('/pokedex (GET)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('Should return paginated data with default settings', async () => {
    const response = await request(app.getHttpServer()).get('/pokedex');

    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty('next', 2);
    expect(response.body).toHaveProperty('prev', null);
    expect(response.body).toHaveProperty('totalPages', 103);
    expect(response.body).toHaveProperty('result');

    expect(response.body.result).toHaveLength(10);
  });

  it('Should return paginated data with custom settings', async () => {
    const response = await request(app.getHttpServer())
      .get('/pokedex')
      .query({ page: 2, limit: 20 });

    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty('next', 3);
    expect(response.body).toHaveProperty('prev', 1);
    expect(response.body).toHaveProperty('totalPages', 52);

    expect(response.body).toHaveProperty('result');

    expect(response.body.result).toHaveLength(20);
  });

  it('Should return 404 if page is out of range', async () => {
    const response = await request(app.getHttpServer()).get('/pokedex').query({ page: 1000 });

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('statusCode', 404);

    expect(response.body).toHaveProperty('message', 'O valor "page" precisa ser menor que 103.');
  });
});
