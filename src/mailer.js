/**
 * Created by user on 4/23/18.
 */
/*https://mailtrap.io/inboxes/372525/messages - use with google login*/
/*import nodemailer from 'nodemailer';

const from = '"Bookworm" <info@bookworm.com>';
function setup() {

    return nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
}
export function sendConfirmationEmail(user) {
    const transport = setup();
    const email = {
        from,
        to: user.email,
        subject: "Welcome to Bookworm",
        text: `
            Welcome to Bookworm. Please, confirm your email.
            
            ${user.generateConfirmationUrl()}
        `
    }

    transport.sendEmail(email);
}
*/