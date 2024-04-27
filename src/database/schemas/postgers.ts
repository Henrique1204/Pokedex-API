import { pgTable, serial, text, smallint } from 'drizzle-orm/pg-core';

export const pokemon = pgTable('pokemon', {
  id: serial('id').primaryKey().notNull(),
  name: text('name'),
  pokedex_number: smallint('pokedex_number'),
  types: text('types').array(),
});
