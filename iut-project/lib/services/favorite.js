'use strict';

const { Service } = require('@hapipal/schmervice');
const Boom = require('@hapi/boom');

module.exports = class FavoriteService extends Service {

    async get(userId) {
        const { Favorite } = this.server.models();
        const { Movie } = this.server.models();

        const favoriteIds = await Favorite.query().select('movie_id').where('user_id', '=', userId);

        const favorites = [];
        for (const favorite of favoriteIds) {
            favorites.push(await Movie.query().findById(favorite.movie_id.toString()));
        }

        return favorites;
    }
};
