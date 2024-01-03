const nodemailer = require('nodemailer');
const dotenv = require('dotenv')
dotenv.config()
const fs = require('fs');
// const imageBase64 = fs.readFileSync('./path/to/your/image.png', { encoding: 'base64' });
exports.forgot_password_mail_fn = async (user_email, req, res, link) => {
    console.log(user_email)
    var transporter = await nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    var mailOptions = {
        from: process.env.FROM,
        to: user_email,
        subject: 'Password Reset Request',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2>Password Reset Request</h2>
                <p>Hello,</p>
                <p>We received a request to reset your password. If you didn't make this request, you can ignore this email.</p>
                <p>Click the link below to reset your password:</p>
                <a href="${link}"
                style="display: inline-block; background-color: #007fbc; color: white; text-decoration: none; padding: 5px 8px; border: none; border-radius: 3px;">
                Reset Password
                </a>
             <p>If the link doesn't work, copy and paste the following URL into your browser:</p>
                <p>${link}</p>
                <p>This link will expire in 1 hour for security reasons.</p>
                <p>If you have any questions, contact support at support@example.com</p>
                <p>Best regards,<br/>Your Company Name</p>
            </div>`
    };



    await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error)
            res.status(400).send({ 'val': "Somthing Wnt wrong try again" })

        } else {
            // console.log('Email sent: ' + info.response)
            res.status(200).send({ 'val': "Reset password link sended to registerd mail. " })

        }
    });
}