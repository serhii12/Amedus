const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});