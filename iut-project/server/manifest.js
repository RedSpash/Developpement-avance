'use strict';

const Dotenv = require('dotenv');
const Confidence = require('@hapipal/confidence');
const Toys = require('@hapipal/toys');
const Schwifty = require('@hapipal/schwifty');

Dotenv.config({ path: `.env` });

module.exports = new Confidence.Store({
    server: {
        host: 'localhost',
        port: {
            $param: 'PORT',
            $coerce: 'number',
            $default: 3000
        },
        debug: {
            $filter: 'NODE_ENV',
            $default: {
                log: ['error', 'start'],
                request: ['error']
            },
            production: {
                request: ['implementation']
            }
        }
    },
    register: {
        plugins: [
            {
                plugin: '../lib', // Main plugin
                options: {}
            },
            {
                plugin: './plugins/swagger'
            },
            {
                plugin  : '@hapipal/schwifty',
                options : {
                    $filter    : 'NODE_ENV',
                    $default   : {},
                    $base      : {
                        migrateOnStart : true,
                        knex           : {
                            client     : 'mysql',
                            connection : {
                                host     : process.env.DB_HOST || '0.0.0.0',
                                user     : process.env.DB_USER || 'root',
                                password : process.env.DB_PASSWORD || 'hapi',
                                database : process.env.DB_DATABASE || 'user',
                                port     : process.env.DB_PORT || 3307
                            }
                        }
                    },
                    production : {
                        migrateOnStart : false
                    }
                }
            },
            {
                plugin: {
                    $filter: 'NODE_ENV',
                    $default: '@hapipal/hpal-debug',
                    production: Toys.noop
                }
            }
        ]
    }
});
