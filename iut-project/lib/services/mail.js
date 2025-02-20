'use strict';

const { Service } = require('@hapipal/schmervice');
const nodemailer = require('nodemailer');
const Dotenv = require("dotenv");

Dotenv.config();

module.exports = class MailService extends Service {

    createTransporter() {
        return nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
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
            text: `Bienvenue ${name},\n Merci de vous être inscrit sur notre site.`
        };

        try {
            await transporter.sendMail(mailOptions);
        } catch (error) {
            throw new Error('Error sending email : ' + error);
        }
    };
}
