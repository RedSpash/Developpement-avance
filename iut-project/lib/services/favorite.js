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

    async add(userId, movieId) {
        const { Favorite } = this.server.models();
        const { Movie } = this.server.models();

        const alreadyFavorite = await Favorite.query().select('*')
            .where('id_user', '=', userId)
            .where('id_movie', '=', movieId);

        if (alreadyFavorite.length > 0) {
            return Boom.conflict('Movie already in favorite');
        }

        const existingMovie = await Movie.query().select('*')
            .where('id', '=', movieId);

        if (existingMovie.length === 0) {
            return Boom.notFound('Movie not found');
        }

        return Favorite.query().insert({ id_user: userId , id_movie: movieId });
    }
};
