//respond to incoming text

const http = require('http');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const app = express();



app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();

  twiml.message('Thanks for responding');

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

http.createServer(app).listen(3000, () => {
  console.log('Express server listening on port 3000');
});
