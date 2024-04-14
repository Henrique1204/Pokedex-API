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

Crie os schemas do banco de dados no arquivo `src/db/postgres/index.ts`:

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

Para definir os tipos em sua aplicação, crie uma tipagem em `src/models/pokemon/index.model.ts`:

```ts
export type PokemonData = {
  id: string;
  name: string;
  pokedex_number: number;
  types: string[];
  sprite: string;
};
```

### Criando o Módulo de Conexão com o Banco de Dados

Crie o módulo em `src/modules/databaseConnections/drizzle/index.module`:

```ts
import { DrizzlePostgresModule } from '@knaadh/nestjs-drizzle-postgres';

import { Module } from '@nestjs/common';

import * as schema from 'src/db/postgres';

@Module({
  imports: [
    DrizzlePostgresModule.register({
      tag: 'DATABASE',
      postgres: {
        url: 'postgres://postgres:@seuHost:suaPorta/seuDB',
        config: {
          hostname: 'secret',
          username: 'secret',
          password: 'secret',
          database: 'secret',
        },
      },
      config: { schema },
    }),
  ],
  controllers: [],
  providers: [],
})
export class DrizzleDB {}
```

### Integrando o Módulo de Conexão com o App.

Finalmente, importe o módulo de conexão com o banco de dados e relacione-o ao módulo da aplicação em `src/app.module.ts`:

```ts
import { Module } from '@nestjs/common';

import { DrizzleDB } from 'src/modules/databaseConnections/drizzle/index.module';

@Module({
  imports: [DrizzleDB],
  controllers: [],
  providers: [],
})
export class AppModule {}
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

import { DrizzleDB } from 'src/modules/databaseConnections/drizzle/index.module';

@Module({
  imports: [
    DrizzleDB,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
```

No arquivo `src/modules/databaseConnections/drizzle/index.module.ts`, configure a conexão com o banco de dados usando DrizzlePostgresModule e ConfigService:

```ts
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { DrizzlePostgresModule } from '@knaadh/nestjs-drizzle-postgres';

import * as schema from 'src/db/postgres';

const configService = new ConfigService();

@Module({
  imports: [
    DrizzlePostgresModule.register({
      tag: 'DATABASE',
      postgres: {
        url: configService.get<string>('DATABASE_URL'),
        config: {
          hostname: configService.get<string>('DATABASE_HOSTNAME'),
          username: configService.get<string>('DATABASE_USERNAME'),
          password: configService.get<string>('DATABASE_PASSWORD'),
          database: configService.get<string>('DATABASE_NAME'),
        },
      },
      config: { schema },
    }),
  ],
  controllers: [],
  providers: [],
})
export class DrizzleDB {}
```