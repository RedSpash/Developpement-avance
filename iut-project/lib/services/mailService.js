const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendWelcomeEmail = async (to, name) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: 'Welcome to Our Service',
        text: `Hello ${name},\n\nWelcome to our service! We're glad to have you with us.\n\nBest regards,\nThe Team`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Welcome email sent successfully');
    } catch (error) {
        console.error('Error sending welcome email:', error);
    }
};

module.exports = { sendWelcomeEmail };