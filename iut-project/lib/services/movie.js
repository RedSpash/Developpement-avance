'use strict';

const { Service } = require('@hapipal/schmervice');
const Mail = require('./mail');

module.exports = class MovieService extends Service {

    get() {
        return this.server.models().query();
    }

    async create(movie) {
        return this.server.models().query().insertAndFetch(movie);
    }

    async delete(movieId) {
        const res = await this.server.models().query().deleteById(movieId);
        return res === 1 ? '' : 'An error occurred while deleting the movie';
    }
};
