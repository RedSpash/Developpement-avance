'use strict';

const {Service} = require('@hapipal/schmervice');
const amqp = require('amqplib');
const Dotenv = require('dotenv');

Dotenv.config({path: `.env`});

module.exports = class ExportationService extends Service {

    async export(request, to) {
        const {movieService} = request.services();
        const movies = await movieService.get();

        const connection = await amqp.connect(process.env.RABBITMQ_URL);
        const channel = await connection.createChannel();
        await channel.assertQueue(process.env.QUEUE_NAME, {durable: true});

        const message = JSON.stringify({to, movies});
        channel.sendToQueue(process.env.QUEUE_NAME, Buffer.from(message), {persistent: true});

        return {message: 'You will receive an email shortly with the exported data'};
    }
};
