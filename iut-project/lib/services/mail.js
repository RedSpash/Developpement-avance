'use strict';

const { Service } = require('@hapipal/schmervice');
const Boom = require('@hapi/boom');
const Jwt = require('@hapi/jwt');
const nodemailer = require('nodemailer');
const Dotenv = require("dotenv");

Dotenv.config({ path: `.env` });

module.exports = class MailService extends Service {

    send(User){
        return this.sendWelcomeEmail(User.email, User.firstName);
    }


    async sendWelcomeEmail(to, name) {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: to,
            subject: 'Bienvenue',
            text: `Bienvenue ${name},\n Merci de vous être inscrit sur notre site.`
        };

        try {
            await transporter.sendMail(mailOptions);
        } catch (error) {
            throw new Error('Error sending email : ' + error);
        }
    };
}
