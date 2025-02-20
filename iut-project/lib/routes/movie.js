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
    },
    {
        method: 'post', path: '/movie', options: {
            auth: {
                scope: ['admin']
            }, tags: ['api'], validate: {
                payload: Joi.object({
                    title: Joi.string().min(3).example('Interstellar').required(),
                    director: Joi.string().min(3).example('Christopher Nolan').required(),
                    description: Joi.string().min(3).example('A movie about space').required(),
                    releaseDate: Joi.date().example(new Date('2014-11-05')).required()
                })
            }
        }, handler: async (request, h) => {
            return request.services().create(request.payload);
        }
    }
];
