import { createTransport } from 'nodemailer';

const smtpTransport = createTransport({
    service: 'gmail',
    auth: {
        user: process.env.NEXT_PUBLIC_SMTP_USER,
        pass: process.env.NEXT_PUBLIC_SMTP_PASS
    }
});

export const activateEmail = ({ email, link, base_url }) => {
    const year = new Date().getFullYear();
    smtpTransport.sendMail({
        from: {
            name: 'Review Holder',
            address: process.env.NEXT_PUBLIC_SENDER_EMAIL
        },
        to: email,
        subject: `Activate your account`,
        html: `
        <div style="width: 100%; height: 100%; background-color: #F1F5F9; padding: 40px 0; font-family: 'Lato',sans-serif;">
        <style>
            #box {
                box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
            }
            @media (max-width: 600px) {
                #box {
                    width: 85% !important;
                    margin: 0 auto !important;
                }
            }
        </style>
        
        <div id="box" style='width: 500px; margin: 0 auto; border-radius: 8px; background-color: white; padding: 30px;'>
            <a href="${base_url}" target="_blank"
                style="display: block; text-decoration: none; margin-bottom: 10px; text-align: center;"
            >
                <h1 style='font-size: 30px; color: #FF7816;margin: 0;'>Review Holder</h1>
            </a>
            <hr />
            <br>
            <h2 style="margin: 0; text-align: center; font-size: 22px; font-weight: 400; color: #151C48;">
                Activate your account
            </h2>
            <br>
            <p style="margin: 0; text-align: center; font-size: 16px; font-weight: 500; color: #151C48;">
                To activate your account, Please click on the activate button below:
            </p>
            <br>
            <br>
            <div style="text-align: center;">
                <a href="${link}" style="text-decoration: none; background-color: #151C48; color: #e6e6e6; padding: 10px 24px;">
                    Activate Account
                </a>
            </div>
            <br>
            <br>
            <p style="margin: 0; text-align: center; font-size: 16px">
                For security reasons the confirmation link is only active for 1 day.
            </p>
            <br>
        </div>
        <p style="text-align: center; color: #151C48;">&copy; Review Holder ${year}</p>
    </div>
        `
    }, function (error, response) { console.log({ error, response }); });
};

export const verifyEmail = ({ email, code, base_url }) => {
    const year = new Date().getFullYear();
    smtpTransport.sendMail({
        from: {
            name: 'Review Holder',
            address: process.env.NEXT_PUBLIC_SENDER_EMAIL
        },
        to: email,
        subject: `Email verification code`,
        html: `
        <div style="width: 100%; height: 100%; background-color: #F1F5F9; padding: 40px 0; font-family: 'Lato',sans-serif;">
        <style>
            #box {
                box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
            }
            @media (max-width: 600px) {
                #box {
                    width: 85% !important;
                    margin: 0 auto !important;
                }
            }
        </style>
        
        <div id="box" style='width: 500px; margin: 0 auto; border-radius: 8px; background-color: white; padding: 30px;'>
            <a href="${base_url}" target="_blank"
                style="display: block; text-decoration: none; margin-bottom: 10px; text-align: center;"
            >
                <h1 style='font-size: 30px; color: #FF7816;margin: 0;'>Review Holder</h1>
            </a>
            <hr />
            <br>
            <h2 style="margin: 0; text-align: center; font-size: 22px; font-weight: 400; color: #151C48;">
                Verify your email address
            </h2>
            <br>
            <p style="margin: 0; text-align: center; font-size: 16px; font-weight: 500; color: #151C48;">
                To help us confirm that it’s you, please use the following One Time Password (OTP):
            </p>
            <br>
            <div style="text-align: center;">
                <h2 style="font-size: 30px; margin: 0;">
                    ${code}
                </h2>
            </div>
            <br>
            <p style="margin: 0; text-align: center; font-size: 16px">
                For security reasons this code will expire in 5 minutes.
            </p>
            <br>
        </div>
        <p style="text-align: center; color: #151C48;">&copy; Review Holder ${year}</p>
    </div>
        `
    }, function (error, response) { console.log({ error, response }); });
};