//APesar de ser yma variavel colocamos letra maiuscula na primeira palavra
//para indicar que é um tipo ("classe")
import Knex from 'knex';

export async function up(knex: Knex) {
  //  CRIAR TABELA
  return knex.schema.createTable('items', (table) => {
    table.increments('id').primary();
    table.string('image').notNullable();
    table.string('title').notNullable();
  });
}

export async function down(knex: Knex) {
  //VOLTAR ATRAS (DELETAR TABELA)
  return knex.schema.dropTable('items');
}
