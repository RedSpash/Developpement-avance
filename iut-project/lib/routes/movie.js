'use strict';

const Joi = require('joi');

module.exports = [{
    method: 'get', path: '/movies', options: {
        auth: {
            scope: ['user', 'admin']
        }, tags: ['api']
    },

    handler: async (request, h) => {
        return await request.services().get();
    }
}, {
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
}, {
    method: 'delete', path: '/movie/{id}', options: {
        auth: {
            scope: ['admin']
        }, tags: ['api'], validate: {
            params: Joi.object({
                id: Joi.string().required().description('Identifier of the movie to delete')
            })
        }
    }, handler: async (request, h) => {
        return await request.services().delete(request.params.id);
    }
},{
    method: 'patch',
    path: '/movie/{id}',
    options: {
        auth: {
            scope: ['admin']
        },
        tags: ['api'],
        validate: {
            params: Joi.object({
                id: Joi.string().required().description('Identifier of the movie to update')
            }),
            payload: Joi.object({
                title: Joi.string().min(3).example('Interstellar'),
                description: Joi.string().min(3).example('A movie about space'),
                releaseDate: Joi.date().example(new Date('2014-11-05')),
                director: Joi.string().min(3).example('Christopher Nolan')
            })
        }
    },
    handler: async (request, h) => {
        return await request.services().patch(request.params.id, request.payload);
    }
}];
