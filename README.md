
## Amedus-project

Amedus is a simple restaurant app.

Users are provided a menu of items to add to a shopping cart.  They may remove items from the cart as well as increase the quanity of a particular item.  Pricing totals will update dynamically.  Once the user confirms their order they provide their telephone number and payment information (payment info for placeholding purposes only).  The user is sent an SMS confirming their order while the restaurant is sent an SMS indicating an order has been placed (the user name, telephone number and a link to review the user order is provided).  The restaurant owner has the option to click the link in the SMS and choose to edit the time for order pickup, cancel the order and add an optional custom message.  The contents of the message are sent via SMS to the user.

## Dependencies

  - body-parser 1.15.2
  - card 2.4.0
  - cookie-session 2.0.0-beta.3
  - dotenv 2.0.0
  - ejs 2.4.1
  - express 4.13.4
  - knex 0.11.7
  - knex-logger 0.1.0
  - morgan 1.7.0
  - node-sass-middleware 0.9.8
  - pg 6.0.2
  - twilio 3.23.2

## Getting Started

S...please fill this in ....what you need to do to run it...migration...npm run local etc.

## Functionality

Main menu page (/)...customer can:
- add an item to cart
- cart changes dynamically
- click cart to go to cart page

Cart page (/checkout)...customer can:
- view all items in cart
- add or reduce quantity of a particular item in cart
- remove an item from cart
- return to menu to add more items

SMS: upon confirmation of an order:
- SMS sent to customer thanking them and telling them a pickup time will be sent
- SMS sent to restuarant with link to order to view order, set pickup time, cancel order and set an optional custom message

Order and time for pickup page (/ordertime)...restaurant owner can: 
- view username, phone number of customer who ordered
- see all items and total cost of order
- select 5, 15, 30 minutes OR cancel order
- provide an optional custom message

SMS: upon restaurant owner selecting a time or cancelling order
- customer is informed of pickup time OR order has been cancelled
- customer recieves any custom message created by restuarant


## File Structure

Important folders and files are indicated in the tree diagram below:


<ul>
  <li>/Amedus</li>
  <ul>
    <li>/db</li>
    <ul>
      <li>/migrations: list of previous dB migraitons</li>
      <li>/seeds: intial data set of menu items and test orders</li>
    </ul>
    <li>/public</li>
    <ul>
      <li>/assets: contains graphics and screenshots</li>
      <li>/css: styling </li>
      <li>/dist</li>
      <li>/saas</li>
      <li>/scripts</li>
      <li>/vendor</li>
    </ul>
    <li>/routes</li>
    <ul>
      <li>cart.js: </li>
      <li>checkout.js:</li>
      <li>orderdisplay.js:</li>
    </ul>
    <li>/views</li>
    <ul>
      <li>/partials: </li>
      <li>checkout.ejs</li>
      <li>index.ejs: </li>
      <li>orderdisplay.ejs: </li>
    </ul>
    <li>README.md</li>
    <li>knexfile.js</li>
    <li>package.json</li>
    <li>server.js</li>
  </ul>
</ul>


## Screenshots

#### Homescreen:
![alt text](public/assets/screenshots/mainscreen.png)

#### Menu:
![alt text](public/assets/screenshots/menu.png)

#### Cart with dynamic pricing changes:
![alt text](public/assets/screenshots/cart.png)

#### Initial SMS to user(customer) and restaurant:

![alt text](public/assets/screenshots/initialsms.png)

#### Order page where restaurant can set pickup time and custom message:

![alt text](public/assets/screenshots/orderandtimeset.png)

#### Final SMS to user indicating time for pickup:

![alt text](public/assets/screenshots/timesenttouser.png)




