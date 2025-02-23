'use strict';

const {Service} = require('@hapipal/schmervice');
const nodemailer = require('nodemailer');
const Dotenv = require("dotenv");

Dotenv.config();

module.exports = class MailService extends Service {

    createTransporter() {
        return nodemailer.createTransport({
            host: process.env.EMAIL_HOST, port: process.env.EMAIL_PORT, auth: {
                user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS
            }
        });
    }


    async sendWelcomeEmail(to, name) {
        console.log(process.env.EMAIL_HOST);
        const transporter = this.createTransporter()

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: to.email,
            subject: 'Bienvenue',
            text: 'Bienvenue ${name},\n Merci de vous être inscrit sur notre site.'
        };

        await transporter.sendMail(mailOptions);
    };

    async sendNewMovieNotification(to, movie) {
        await this.createTransporter().sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject: 'Nouveau film',
            text: 'Un nouveau film \'' + movie.title + '\' a été ajouté!',
            html: 'Venez découvrir le film : ${movie.title}'
        });
    }

    async sendPatchMovieNotification(to, movie) {
        await this.createTransporter().sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject: 'Votre film favori a été modifié',
            text: 'Le film \'' + movie.title + '\' a été modifié!',
            html: 'Votre film favori \'' + movie.title + '\' a été modifié!'
        });
    }
}
