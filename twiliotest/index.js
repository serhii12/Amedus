const PORT          = 3000;
const http          = require('http');
const express       = require('express');
const numberRoutes  = express.Router();
const app           = express();

const MessagingResponse = require('twilio').twiml.MessagingResponse;


const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

const accountSid = 'ACfa1ca1e10683bd493f7fb5e71c3a4452';
const authToken = '40ee1a3973fb5f2e8975aab954516a81';
const client = require('twilio')(accountSid, authToken);



app.set("view engine", "ejs")

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.render('index');
});

app.get('/time', function(req, res) {
    res.render('ordertime');
});

app.post('/order', function(req, res) {
    console.log(req.body.usrtel);

//sends a message to the customer thanking them for their order
    client.messages
  .create({
    body: 'Thank you for your order 🦋.  We\'ll send a pickup time shortly',
     // body: `Thanks for your order from RESTAURANT...it  will be ready for pickup in 15 minutes.`,
     from: '+16474908806',
     to: `'+1'${req.body.usrtel}'`
   })
  .then(message => console.log(message.sid))
  .done();

//sends a message to the restaurant with phone number of customer asks for time input
      client.messages
  .create({
     body: `🦕Customer ${req.body.usrtel} just placed an order.\nPickup is set to 15 minutes\nClick here view order or change time\nhttp://bit.ly/2qNy6Lm`,
     from: '+16474908806',
     to: '+14163578459'
   })
  .then(message => console.log(message.sid))
  .done();

    res.send('thanks for your order');
});

app.post('/ordertime/', function(req, res) {
  console.log(req.body.time);

//sends a message to the customer with confirm order and time
  // if(req.body.time === 'cancel') {
  //   const custMessage = `Thank you 🦄.  Your order will be ready in ${req.body.time} minutes.`
  // } else {
  //   const custMessage = `Sorry 😕.  Your order has been cancelled by the restaurant.`
  // };

    client.messages
  .create({
     // body: custMessage,
     body: `Thank you 🦄.  Your order will be ready in ${req.body.time} minutes.`,
     from: '+16474908806',
     to: '+14163578459'
   })
  .then(message => console.log(message.sid))
  .done();

  res.send('thanks for your input');
});

app.post('/sms', (req, res) => {

  const twiml = new MessagingResponse();
  // this returns the content of the text message
  console.log(req.body.Body);
  twiml.message('For letting the customer know...');

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});





app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
