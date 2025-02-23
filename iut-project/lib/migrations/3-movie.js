'use strict';

const Joi = require('joi');

module.exports = {

    async up(knex) {

        await knex.schema.createTable('movie', (table) => {
            table.increments('id').primary();
            table.string('title').notNull();
            table.string('director').notNull();
            table.dateTime('release_date').notNull();
            table.string('description').notNull();
            table.dateTime('created_at').notNull().defaultTo(knex.fn.now());
            table.dateTime('updated_at').notNull().defaultTo(knex.fn.now());
        });
    },

    async down(knex) {

        await knex.schema.dropTableIfExists('movie');
    }
};
