const nodemailer = require("nodemailer");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASS
    }
});


const sendMail = async (to, subject, html) => {
    try {
        
        await transporter.sendMail({
            from: '"E-Commerce App" <no-reply@ecommerce.com>', 
            to,
            subject,
            html
        });
        console.log(`Email sent successfully to ${to}`);
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

module.exports = sendMail;