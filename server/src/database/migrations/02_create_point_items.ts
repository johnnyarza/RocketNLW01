//APesar de ser yma variavel colocamos letra maiuscula na primeira palavra
//para indicar que é um tipo ("classe")
import Knex from 'knex';

export async function up(knex: Knex) {
  //  CRIAR TABELA
  return knex.schema.createTable('point_items', (table) => {
    table.increments('id').primary();
    table.integer('point_id').notNullable().references('id').inTable('points');
    table.integer('item_id').notNullable().references('id').inTable('items');
  });
}

export async function down(knex: Knex) {
  //VOLTAR ATRAS (DELETAR TABELA)
  //a
  return knex.schema.dropTable('items');
}
