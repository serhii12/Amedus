var express = require("express");
var app = express();
var PORT = 8080; // default port 8080

app.set("view engine", "ejs");

// allows for simple use of data
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));


var itemsInCart = {};

app.get("/", (req,res) => {
  res.render("order")
});


app.post('/order', function(req, res) {
    let phoneKey = Math.round(Math.random() * 1000);
  itemsInCart[phoneKey] = req.body.item;
//sends a message to the customer thanking them for their order
  console.log(itemsInCart);
});

app.get("/cart", (req, res) => {
  let templateVars = {
    phoneNums: itemsInCart,
    };
  res.render("cart", templateVars);
});

// deleting an item
app.post("/cart/delete", (req, res) => {
  console.log(req.body.item);
  delete itemsInCart[req.body.item];
  res.redirect("/cart")
});



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
