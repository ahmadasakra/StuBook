const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const linksOfWebsite = process.env.Website_Link;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});

async function send() {
    var email = ``;
    var heading = `
    Willkommen beim StuBook.
    `
    var message = `Hier finden Sie Informationen zu den Büchern.
                    Bitte helfen Sie anderen Nutzern, indem Sie Ihre Rezension über Bücher abgeben.
                `;
    var footerMessage = `Danke, dass Sie bei uns sind.`;

    const result = await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: 'no-reply__HR_Buchladen ',
        html: `
            <div style="width: 80%; margin: auto;">
                <div style="width: 100%; max-width: 300px; height: 120px; margin: auto;">
                    <img src='cid:logo' height="100%" width="100%">
                </div>
                <h1 style="font-size: 24px; text-align: center;">StuBook</h1>
                <h6 style="font-size: 14px; padding: 0; margin: 0; margin-top: 50px; text-align: left;">
                    ${heading}
                </h6>
                <p>${message}</p>
                <p>${footerMessage}</p>
                <p style="font-size: 14px; padding: 0; margin: 0; margin-top: 50px; text-align: left;">
                    Grüße
                </p>
                <h1 style="font-size: 16px; padding: 0; margin: 0; margin-top: 5px; text-align: left;">StuBook,</h1>
                <h3 style="font-size: 14px; padding: 0; margin: 0; text-align: left;">
                    Admin,
                </h3>
                <h3 style="font-size: 14px; padding: 0; margin: 0; margin-bottom: 50px; text-align: left;">
                    <a href="https://asakrah.com/">Profil</a>
                </h3>
                <h3 style="font-size: 14px; padding: 0; margin: 0; margin-top: 10px; margin-bottom: 10px; text-align: center;">
                    Bitte besuchen Sie: https://www.asakrah.com/
                </h3>
            </div>
        `,
        attachments: [
            {
                filename: "logo.png",
                path: "Logocomp.png",
                cid: "logo",
            },
        ]
    });
    // console.log(JSON.stringify(result, null, 4));
}

async function sendOTP(Useremail, otp) {
    var email = `${Useremail}`;
    var heading = `
    Willkommen beim StuBook.
    `
    var message = `Ihr Verifizierungscode: ${otp}
                `;
    var footerMessage = `Token ist 5 Minuten gültig `;

    const result = await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: 'Verifizierung | StuBook ',
        html: `
            <div style="width: 80%; margin: auto;">
                <div style="width: 100%; max-width: 300px; height: 120px; margin: auto;">
                    <img src='cid:logo' height="100%" width="100%">
                </div>
                <h1 style="font-size: 24px; text-align: center;">StuBook</h1>
                <p style="font-size: 14px; padding: 0; margin: 0; margin-top: 50px; text-align: left;">
                    ${heading}
                </p>
                <h6 style="font-size: 14px; padding: 0; margin: 0; margin-top: 50px; text-align: left;">${message}</h6>
                <p>${footerMessage}</p>
                <p style="font-size: 14px; padding: 0; margin: 0; margin-top: 50px; text-align: left;">
                    Grüße
                </p>
                <h1 style="font-size: 16px; padding: 0; margin: 0; margin-top: 5px; text-align: left;">StuBook,</h1>
                <h3 style="font-size: 14px; padding: 0; margin: 0; text-align: left;">
                    Admin,
                </h3>
                <h3 style="font-size: 14px; padding: 0; margin: 0; margin-bottom: 50px; text-align: left;">
                    <a href="https://www.asakrah.com">Profil</a>
                </h3>
                <h3 style="font-size: 14px; padding: 0; margin: 0; margin-top: 10px; margin-bottom: 10px; text-align: center;">
                    Bitte besuchen Sie: ${linksOfWebsite}
                </h3>
            </div>
        `,
        attachments: [
            {
                filename: "logo.png",
                path: __dirname + "/Logocomp.png",
                cid: "logo",
            },
        ]
    });
    // console.log(JSON.stringify(result, null, 4));
}

async function UserBookInfoAdd(email, name, bookname, bookauthor,imgPath) {
    var email = email;
    var heading = `
    Hallo, ${name}.
    `
    var message = `
                    <p style="margin:0;padding:0;">Willkommen beim StuBook.</p>
                    <p style="margin:0;padding:0;">Wir haben Ihren Vorschlag erhalten bezüglich</p>
                    <p style="margin:0;padding:0;">Buchname: ${bookname} </p>
                    <p style="margin:0;padding:0;">Autorenname: ${bookauthor} </p>
                    <p style="margin:0;padding:0;">ISBN: ${isbn} </p>
                    <p style="margin:0;padding:0;">Veröffentlichungsjahr: ${publishYear} </p>
                    <p style="margin:0;padding:0;">
                    wir werden dies so bald wie möglich aktualisieren.</p>
                `;

    var footerMessage = `Danke für Ihre Information.`;

    var belowMessage = `Bitte antworten Sie nicht auf diese Mail`;

    const result = await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: 'Danke für Ihren Vorschlag | StuBook',
        html: `
            <div style="width: 80%; margin: auto;">
                <div style="width: 100%; max-width: 300px; height: 120px; margin: auto;">
                    <img src='cid:logo' height="100%" width="100%">
                </div>
                <h1 style="font-size: 24px; text-align: center;">StuBook</h1>
                <h6 style="font-size: 14px; padding: 0; margin: 0; margin-top: 50px; text-align: left;">
                    ${heading}
                </h6>
                <div style="font-size: 14px; padding: 0; margin: 0; margin-top: 10px; ">${message}</div>
                <p>${footerMessage}</p>
                <p style="font-size: 14px; padding: 0; margin: 0; margin-top: 50px; text-align: left;">
                    Grüße
                </p>
                <h1 style="font-size: 14px; padding: 0; margin: 0; margin-top: 5px; text-align: left;">StuBook,</h1>
                <h3 style="font-size: 14px; padding: 0; margin: 0; font-weight:normal; text-align: left;">
                    Admin,
                </h3>
                <h3 style="font-size: 14px; padding: 0; margin: 0; font-weight:normal; margin-bottom: 50px; text-align: left;">
                    <a href="https://asakrah.com>Profil</a>
                </h3>
                <h3 style="font-size: 14px; padding: 0; margin: 0; margin-top: 10px; margin-bottom: 10px; text-align: center;">
                    ${linksOfWebsite}
                </h3>
            </div>
        `,
        attachments: [
            {
                filename: "logo.png",
                path: __dirname + "/Logocomp.png",
                cid: "logo",
            },
            {
                filename: "Uploaded Image",
                path: imgPath, // Pfad zum hochgeladenen Bild
                cid: "uploadedimage"
            }
        ]
    });
    // console.log(JSON.stringify(result, null, 4));
}


module.exports = { sendOTP, UserBookInfoAdd };
    