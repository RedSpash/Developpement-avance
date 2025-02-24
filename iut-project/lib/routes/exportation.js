'use strict';

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
        return await exportService.get(request, request.auth.credentials.email);
    }
};
