## Tutorial de criação de API com *NestJS*, *Fastify*, *Drizzle* e *PostegreSQL*.

Este tutorial oferece um guia passo a passo para criar uma API com NestJS, Fastify, Drizzle e PostgreSQL. Aprenda a configurar o projeto, integrar tecnologias essenciais e gerenciar dados de forma eficaz. Ideal para desenvolvedores buscando construir APIs modernas e eficientes.

### Criação do Projeto.

Primeiro, crie um novo projeto executando o seguinte comando no terminal na pasta do seu projeto:

```shell
npx @nestjs/cli new .
```

### Configuração do Fastify.

Para instalar o Fastify, use os seguintes comandos:

```shell
yarn add @nestjs/platform-fastify fastify
```

```shell
npm i @nestjs/platform-fastify fastify
```

Em seguida, adicione o seguinte código ao arquivo `src/main.ts`:

```ts
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';

import * as fastify from 'fastify';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new FastifyAdapter(fastify()));


  await app.listen(3000);
}

bootstrap();
```

### Instalando Drizzle e PostegresSQL.

Para instalar as dependências necessárias, use os seguintes comandos:

```shell
yarn add @knaadh/nestjs-drizzle-postgres drizzle-orm postgres
```

```shell
npm i @knaadh/nestjs-drizzle-postgres drizzle-orm postgres
```

### Criando Schemas e Models

Crie os schemas do banco de dados no arquivo `src/database/postgres/schemas/postgers.ts`:

```ts
import { pgTable, serial, text, smallint, varchar } from 'drizzle-orm/pg-core';

export const pokemon = pgTable('pokemon', {
  id: serial('id').primaryKey(),
  name: text('name'),
  pokedex_number: smallint('pokedex_number'),
  types: text('types'),
  sprite: varchar('sprite'),
});
```

Para definir os tipos em sua aplicação, crie uma tipagem em `src/models/pokemon/entity/pokemon.model.model.ts`:

```ts
export type PokemonData = {
  id: string;
  name: string;
  pokedex_number: number;
  types: string[];
  sprite: string;
};
```

### Configurando variáveis de ambiente.

Comece instalando o módulo @nestjs/config para lidar com variáveis de ambiente:

```shell
yarn add @nestjs/config
```

Ou

```shell
npm i @nestjs/config
```

Em seu arquivo `src/app.module.ts`, importe `ConfigModule` e configure-o para carregar variáveis de ambiente de um arquivo `.env` ou do ambiente do sistema:

```ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [],
  providers: [ConfigService],
})
export class AppModule {}
```

### Criando o Módulo de Conexão com o Banco de Dados

Crie o módulo em `src/database/connections/postgres.module.ts`:

```ts
import { Module } from '@nestjs/common';

import { DrizzlePostgresModule } from '@knaadh/nestjs-drizzle-postgres';

import { DBConfigService } from './postgres.service';

@Module({
  imports: [
    DrizzlePostgresModule.registerAsync({
      tag: 'DATABASE',
      useClass: DBConfigService,
    }),
  ],
  controllers: [],
  providers: [],
})
export class PostgresDB {}
```

Crie o serviço em `src/database/connections/postgres.service.ts`:

```ts
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as schema from 'src/database/schemas/postgers';

@Injectable()
export class DBConfigService {
  constructor(@Inject(ConfigService) private readonly configService: ConfigService) {}

  create = () => {
    return {
      tag: 'DATABASE',
      postgres: {
        url: 'postgres://postgres:@127.0.0.1:5432/pokedex',
        config: {
          hostname: this.configService.get<string>('DATABASE_HOSTNAME'),
          username: this.configService.get<string>('DATABASE_USERNAME'),
          password: this.configService.get<string>('DATABASE_PASSWORD'),
          database: this.configService.get<string>('DATABASE_NAME'),
        },
      },
      config: { schema },
    };
  };
}
```
