'use strict';

const Joi = require('joi');
const { Model } = require('@hapipal/schwifty');

module.exports = class Movie extends Model {

    static get tableName() {
        return 'movie';
    }

    static get joiSchema() {
        return Joi.object({
            id: Joi.number().integer().greater(0),
            title: Joi.string().min(3).example('Interstellar'),
            director: Joi.string().min(3).example('Christopher Nolan'),
            description: Joi.string().min(3).example('A movie about space'),
            release_date: Joi.date(),
            created_at: Joi.date(),
            updated_at: Joi.date()
        });
    }

    $beforeInsert(queryContext) {
        this.updated_at = new Date();
        this.created_at = this.updated_at;
    }

    $beforeUpdate(opt, queryContext) {
        this.updated_at = new Date();
    }

};
