// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
const accountSid = 'ACfa1ca1e10683bd493f7fb5e71c3a4452';
const authToken = '40ee1a3973fb5f2e8975aab954516a81';
const client = require('twilio')(accountSid, authToken);

client.messages.each({

                  from: '+14163578459',
                  to: '+16474908806'
                },
                    messages => console.log(messages.body)
                );
