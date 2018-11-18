
#Amedus-project 
Amedus is a simple, single-page Twitter clone.

Users are provided a display of historical tweets that have been made via testing.  The compose button will allow them to create a new tweet of 140 characters or less.  It will then display immediately via ajax & mongoDB.  The app will add a time stamp, a name and avatar to simulate a random user with each tweet.

## Dependencies

  - Node 5.10.x or above
  - NPM 3.8.x or above
  - body-parser": "^1.18.3",
  - chance": "^1.0.16",
  - express": "^4.16.4",
  - md5": "^2.2.1",
  - mongodb": "^2.2.36"

## Getting Started

## Functionality

The user clicks the 'Order Now' button in the center of the page scrolls down to a menu.  User can .  If the form field exceeds 140 characters the counter moves past zero to negative numbers and the counter color changes color to red.

There are two error messages possible:
- Blank field: error message warns user that they cannot submit a blank tweet and nothing is submitted to database
- Greater than 140 characters: error message warns user that tweet is too large and nothing is submitted to database

A succesful tweet submission immediately:
- publishes the tweet below the form
- empties the text entry field
- resets the counter to 140

## File Structure

<ul>
  <li>/Tweeter</li>
  <ul>
    <li>/public</li>
    <ul>
      <li>/images: contains graphics and screenshots</li>
      <li>/scripts: app.js is main file driving tweet display <b>important</b></li>
      <li>/styles: css for nav and main screen <b>important</b></li>
      <li>/vendor: provided...not relevant</li>
      <li>index.html: single app web page</li>
      <li>date.js: small function to determine 'days since' tweet</li>
    </ul>
    <li>/server</li>
    <ul>
      <li>/data-files: original .json file for testing purposes</li>
      <li>/lib</li>
      <li>/routes: data-helpers.js file interacts with mongoDB <b>important</b></li>
      <li>index.js: runs the express (server) and connection to DB <b>important</b></li>
    </ul>
    <li>/node_modules</li>
    <li>package.json</li>
    <li>README.md</li>
  </ul>
</ul>

Homescreen:
![alt text](public/assets/screenshots/homepage.png)

Ready for tweet:
![alt text](public/screenshots/readyfortweet.png)

User attempts to tweet with no text:

![alt text](public/screenshots/blanktweet.png)

User attempts to tweet with more than 140 characters:

![alt text](public/screenshots/longtweet.png)


