'use strict';

const Joi = require('joi');

module.exports = [
    {
        method: 'get', path: '/movies', options: {
            auth: {
                scope: ['user', 'admin']
            }, tags: ['api']
        },

        handler: async (request, h) => {
            return await request.services().get();
        }
    }
];
