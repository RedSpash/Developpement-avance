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
};
