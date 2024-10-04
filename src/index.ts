import {Twilio} from 'twilio'
import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
dotenv.config()

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN

const whatsappNumber = process.env.WHATSAPP_NUMBER;


const app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.post('/receive-message', async(req: express.Request, res: express.Response) =>{

    try{
        const client = new Twilio(accountSid, authToken);
        const incomingMessage = req.body.Body;
        if(incomingMessage.split()[0] === 'join') {
            const responseMessage = "Hello there, I can assist you book an appointment with abhigyan";
            const formattedFromNumber = req.body.From.includes('whatsapp:') ? req.body.From : `whatsapp:${req.body.From}`
            const message = await client.messages.create({
                body: responseMessage,
                from: `whatsapp:${whatsappNumber}`,
                to: formattedFromNumber,
            })
            console.log(message.body);
            res.status(200).send('message processed');
        }else{
            res.status(400).send('Invalid message');
        }
    }catch(err){
        console.error(err);
        res.status(500).send('Internal server error')
    }
})

app.post('/message-status', async(req: express.Request, res: express.Response)=>{

    const messageSid = req.body.MessageSid;
    const messageStatus = req.body.MessageStatus;
    console.log(`SID: ${messageSid} Status: ${messageStatus}`);
    res.status(200).send('Status received');
})


app.listen(3000, () => {
    console.log('Server is running on port 3000...')
})