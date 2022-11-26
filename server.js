//const { response } = require("express");
// server.js
// This is where your node app starts

//load the 'express' module which makes writing webservers easy
const express = require("express");
const app = express();

//load the quotes JSON
const quotes = require("./quotes.json");

// Now register handlers for some routes:
//   /                  - Return some helpful welcome info (text)
//   /quotes            - Should return all quotes (json)
//   /quotes/random     - Should return ONE quote (json)
app.get("/", function (request, response) {
  response.send("Neill's Quote Server!  Ask me for /quotes/random, or /quotes");
});

//START OF YOUR CODE...

/** Level 1 Challenge - make the quote server **/
app.get("/quotes", function (request, response) {
  response.send(quotes);
});

app.get("/quotes/random", function (request, response) {
  response.send(pickFromArray(quotes));
});

/** Level 2 Challenge - respond from url with parameter! **/
app.get("/quotes/search", function (request, response) {
  const termParam = request.query.term.toLowerCase();
  //filter quotes based on term
  const result = quotes.filter(function (singleQuote) {
    const quoteText = singleQuote["quote"].toLowerCase();
    const quoteAuthor = singleQuote["author"].toLowerCase();
    return quoteText.includes(termParam) || quoteAuthor.includes(termParam);
  });
  response.send(result);
});

//...END OF YOUR CODE

//You can use this function to pick one element at random from a given array
//example: pickFromArray([1,2,3,4]), or
//example: pickFromArray(myContactsArray)
//
function pickFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/*** 
 function pickFromArray(quotes) {
  const randomNumber = Math.random();
  const totalNumberQuotes = quotes.length;
  const randomIndex = Math.floor(randomNumber * totalNumberQuotes);
  return quotes[randomIndex];
}
***/

//Start our server so that it listens for HTTP requests!
let port = 5000;

app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
