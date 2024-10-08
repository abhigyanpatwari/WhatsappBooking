// Download the helper library from https://www.twilio.com/docs/node/install


import twilio from 'twilio' // Or, for ESM: import twilio from "twilio";
import dotenv from 'dotenv'
dotenv.config()

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);



async function createMessage() {
    const message = await client.messages.create({
        body: "Hello there!",
        from: "whatsapp:+14155238886",
        to: "whatsapp:+918638123203",
    });
    console.log(message.body);
}

createMessage();