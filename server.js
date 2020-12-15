const express = require("express");
const app = express();
const http = require('http');

const port = process.env.PORT || 3001;

const { resolve } = require("path");
// This is your real test secret API key.
const stripe = require("stripe")("sk_test_51GtZPOEIhPBZpG1VV3Q777Ll0EwaMLIPYdHdJtBSAAhQpAApjKuk05RJlXP8uU1gsQnC6HER51TlvhsdAmYxPpaW00uRoGgFBv");

app.use(express.static("."));
app.use(express.json());

 

app.post("/create-payment-intent", async (req, res) => {
  const { items, amount } = req.body;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "dkk"
  });

  res.send({
    clientSecret: paymentIntent.client_secret
  });
});

app.use(express.static(__dirname + '/dist/browser'));

app.get('/*', (req, res) => res.sendFile(path.join(__dirname)));

const server = http.createServer(app);

server.listen(port, () => console.log(`App running on: http://localhost:${port}`));

 