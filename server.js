const express = require('express');
const router = express.Router;
const path = require('path');
const cors = require('cors');
const server = express();
const mongoose = require('mongoose');

const stripe = require("stripe")("sk_test_51GtZPOEIhPBZpG1VV3Q777Ll0EwaMLIPYdHdJtBSAAhQpAApjKuk05RJlXP8uU1gsQnC6HER51TlvhsdAmYxPpaW00uRoGgFBv");

server.use(express.static(__dirname + '/dist/browser'));

server.get('*', function(req, res){
    res.sendFile( __dirname + "/dist/browser/" + "index.html" );
});


/**
 * Products API
 * GET `/products` - Get all products
 * GET `/products/:id` - Get product by id
 */

 
const productsRouter = router();

// GET all products
productsRouter.get('/', (req, res) => res.json(products));

// GET product by id
productsRouter.get('/:id', (req, res, next) => {
  const id = req.params.id;
  const product = products.find((p) => String(p.id) === id);
  if (product) {
    return res.json(product);
  }
  return next(new Error("Product doesn't exist"));
});

server.use('/products', productsRouter);

// server.use(express.json());

server.use(
    express.json(),
    cors({
      credentials: true,
      origin: true,
    }),
  );

const bodyParser = require('body-parser');

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
const cookieParser = require('cookie-parser');
server.use(cookieParser());

mongoose.connect('mongodb+srv://FriesBureau:Bagdad2015@cluster0.csz8w.gcp.mongodb.net/Avensio?retryWrites=true&w=majority', {
    //  mongoose.connect('mongodb://localhost/angular-ssr', { 
        useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true })
      .then(() =>  console.log('connection successful'))
      .catch((err) => console.error(err));

const calculateOrderAmount = items => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

server.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "dkk"
  });

  res.send({
    clientSecret: paymentIntent.client_secret
  });
});



 

const port = 4000;
server.listen(port, function() {
    console.log('server listening on port ' + port);
});

 