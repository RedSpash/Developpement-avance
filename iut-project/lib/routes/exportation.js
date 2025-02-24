'use strict';

const Joi = require("joi");
module.exports = {
    method: 'GET',
    path: '/exportation/movies',
    options: {
        auth: {
            scope: ['admin']
        },
        tags: ['api']
    },
    handler: async (request, h) => {
        const {exportService} = request.services();
        return await exportService.export(request, request.auth.credentials.email);
    }
};
