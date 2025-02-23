'use strict';

const Joi = require('joi');
const {Model} = require('@hapipal/schwifty');

module.exports = class User extends Model {

    static get tableName() {
        return 'user';
    }

    static get joiSchema() {
        return Joi.object({
            id: Joi.number().integer().greater(0),
            firstName: Joi.string().min(3).example('John').description('Firstname of the user'),
            lastName: Joi.string().min(3).example('Doe').description('Lastname of the user'),
            email: Joi.string().email(),
            password: Joi.string(),
            username: Joi.string(),
            roles: Joi.array().items(Joi.string()).default(['user']),
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

    static get jsonAttributes() {
        return ['roles']
    }


};
