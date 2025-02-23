'use strict';

module.exports = [{
    method: 'GET',
    path: '/favorite/get',
    options: {
        auth: {
            scope: ['admin', 'user']
        },
        tags: ['api']
    },
    handler: async (request, h) => {

        const { favoriteService } = request.services();

        return await favoriteService.get(request.auth.credentials.id);
    }
},
];
