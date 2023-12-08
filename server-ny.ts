/***************************************************************************************************
 * Load `$localize` onto the global scope - used if i18n tags appear in Angular templates.
 */
import '@angular/localize/init';
import 'zone.js/dist/zone-node';

// Refrence Error Event Not Found Solution
global['Event'] = null;

const http = require('http'); 
const stripe = require("stripe")("sk_test_51GtZPOEIhPBZpG1VV3Q777Ll0EwaMLIPYdHdJtBSAAhQpAApjKuk05RJlXP8uU1gsQnC6HER51TlvhsdAmYxPpaW00uRoGgFBv");



// Refrence Error Window Not found  solution
const domino = require('domino');
const fs = require('fs');
const path = require('path');
const template = fs.readFileSync(path.join(__dirname, '../', '', 'frontend/dist/browser/index.html')).toString();
const win = domino.createWindow(template);
global['window'] = win;
global['document'] = win.document;
global['navigator'] = win.navigator;

// Refrence Error localStorage Not found  solution
import 'localstorage-polyfill'
global['localStorage'] = localStorage;
import { enableProdMode } from '@angular/core';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import * as cors from 'cors';
import { join } from 'path';
import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';
import { ngExpressEngine } from '@nguniversal/express-engine';

import { ProductRoute } from './express/routes/products-route';

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// The Express app is exported so that it can be used by serverless Functions.
export function app() {
  const server = express(); 

  // This is your real test secret API key.
const stripe = require("stripe")("sk_test_51GtZPOEIhPBZpG1VV3Q777Ll0EwaMLIPYdHdJtBSAAhQpAApjKuk05RJlXP8uU1gsQnC6HER51TlvhsdAmYxPpaW00uRoGgFBv");

server.use(express.json());


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

  const distFolder = join(process.cwd(), 'dist/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';
  const LAZY_MODULE_MAP = require('./src/main.server');
  const productRoute: ProductRoute = new ProductRoute();

  mongoose.connect('mongodb+srv://FriesBureau:Bagdad2015@cluster0.csz8w.gcp.mongodb.net/Avensio?retryWrites=true&w=majority', {
    //  mongoose.connect('mongodb://localhost/angular-ssr', { 
        useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true })
      .then(() =>  console.log('connection successful'))
      .catch((err) => console.error(err));
      
  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
    providers: [
      provideModuleMap(LAZY_MODULE_MAP)
    ]
  }));
  server.set('view engine', 'html');
  server.set('views', distFolder);

  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));

  server.use(cors());

  productRoute.productRoute(server);

  // Example Express Rest API endpoints
  // app.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render(indexHtml, { req, 
      providers: [{ 
        provide: APP_BASE_HREF,
        useValue: req.baseUrl 
      }]
    });
  });

  return server;
}

function run() {
  const port = process.env.PORT || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

 
  run();
 

export * from './src/main.server';
export { renderModule, renderModuleFactory } from '@angular/platform-server';