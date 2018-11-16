var express = require("express");
var app = express();
var PORT = 8080; // default port 8080

app.set("view engine", "ejs");

// allows for simple use of data
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));


var itemsInCart = {};

app.get("/", (req,res) => {
  res.render("play")
});



app.post('/order', function(req, res) {
    let phoneKey = Math.random();
    console.log(phoneKey);
  itemsInCart[phoneKey] = req.body.usrtel;
//sends a message to the customer thanking them for their order
  console.log(itemsInCart);
});

app.get("/other", (req, res) => {
  let templateVars = {
    phoneNums: itemsInCart,
    };
  res.render("other", templateVars);
});



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
