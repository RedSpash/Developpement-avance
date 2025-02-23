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
        const alreadyFavorite = await this.getUserFavorites(userId, movieId);

        if (alreadyFavorite.length > 0) {
            return Boom.conflict('Movie already in favorite');
        }

        const existingMovie = await Movie.query().select('*')
            .where('id', '=', movieId);

        if (existingMovie.length === 0) {
            return Boom.notFound('Movie not found');
        }

        return Favorite.query().insert({ user_id: userId , movie_id: movieId });
    }

    async getUserFavorites(userId, movieId) {
        const { Favorite } = this.server.models();

        return Favorite.query().select('*')
            .where('user_id', '=', userId)
            .where('movie_id', '=', movieId);
    }

    async delete(userId, movieId) {
        const { Favorite } = this.server.models();
        const { Movie } = this.server.models();

        if (await this.getUserFavorites(userId, movieId).length === 0) {
            return Boom.conflict('Movie not in favorite');
        }

        const existingMovie = await Movie.query().select('*')
            .where('id', '=', movieId);
        if (existingMovie.length === 0) {
            return Boom.notFound('Movie not found');
        }

        return Favorite.query().delete()
            .where('user_id', '=', userId)
            .where('movie_id', '=', movieId);
    }
};
