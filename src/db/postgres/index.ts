import { pgTable, serial, text, smallint, varchar } from 'drizzle-orm/pg-core';

export const pokemon = pgTable('pokemon', {
  id: serial('id').primaryKey(),
  name: text('name'),
  pokedex_number: smallint('pokedex_number'),
  types: text('types'),
  sprite: varchar('sprite'),
});
