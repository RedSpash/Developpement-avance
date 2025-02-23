'use strict';

const Joi = require('joi');

module.exports = {

    async up(knex) {
        await knex.schema.createTable('favorite', (table) => {
            table.integer('user_id').notNull();
            table.integer('movie_id').notNull();
        });
    },

    async down(knex) {
        await knex.schema.dropTableIfExists('favorite');
    }
};
