// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console

//need to add a hook that: goes off when an order is POST...we will need to:
// 1. take the phone number; 2.

const accountSid = 'ACfa1ca1e10683bd493f7fb5e71c3a4452';
const authToken = '40ee1a3973fb5f2e8975aab954516a81';
const client = require('twilio')(accountSid, authToken);

// let userPhone = 4163578459;
// let pickupTime = 15;

client.messages
  .create({
     body: `Thanks for your order from RESTAURANT...it  will be ready for pickup in ${pickupTime} minutes.`,
     from: '+16474908806',
     to: `'+1'${userPhone}'`
   })
  .then(message => console.log(message.sid))
  .done();
