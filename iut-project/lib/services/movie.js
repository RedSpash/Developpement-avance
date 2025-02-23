'use strict';

const {Service} = require('@hapipal/schmervice');
const Mail = require('./mail');
const User = require('./user');

module.exports = class MovieService extends Service {

    get() {
        const {Movie} = this.server.models();
        return Movie.query();
    }

    async create(movie) {
        const {Movie} = this.server.models();

        const createdMovie = Movie.query().insertAndFetch(movie);

        const mail = new Mail();

        const usersMails = await User.query().select('mail');
        for (const userMail of usersMails) {
            await mail.sendNewMovieNotification(userMail.mail, createdMovie);
        }

        return createdMovie
    }

    async delete(movieId) {
        const res = await this.server.models().query().deleteById(movieId);
        return res === 1 ? '' : 'An error occurred while deleting the movie';
    }

    async update(id, movie) {
        const {Movie} = this.server.models();

        await Movie.query().findById(id).patch(movie);
        return Movie.query().findById(id);
    }
};
