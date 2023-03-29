// backend/app.js
const debug = require('debug');
const express = require("express");
const cookieParser = require('cookie-parser');
const logger = require('morgan'); 


const cors = require('cors');
const csurf = require('csurf');
const { isProduction } = require('./config/keys');
const bodyParser = require('body-parser');

// Set a limit of 10MB for the request body
require('./models/User');
require('./models/Artwork'); 
require('./models/Review');
require('./models/CartItem')
require('./config/passport'); 
const passport = require('passport'); 

const usersRouter = require('./routes/api/users');
const artworksRouter = require('./routes/api/artworks');
const reviewsRouter = require('./routes/api/reviews');
const cartItemsRouter = require('./routes/api/cartItems')
const stripeRouter = require('./routes/api/stripe');

const csrfRouter = require('./routes/api/csrf');



const app = express();
app.use(bodyParser.json({ limit: '10mb' }));
app.use(passport.initialize());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// const stripe = require("stripe")(process.env.STRIPE_SECRET_ACCESS_KEY);

// app.get("/api/config/stripe", (req, res) => {
//   res.send(process.env.STRIPE_PUBLISHABLE_KEY);
// });

// app.post("/create-payment-intent", async (req, res) => {
//   try {
//     const paymentIntent = await stripe.paymentIntents.create({
//       currency: "EUR",
//       amount: 1999,
//       automatic_payment_methods: { enabled: true },
//     });

//     // Send publishable key and PaymentIntent details to client
//     res.send({
//       clientSecret: paymentIntent.client_secret,
//     });
//   } catch (e) {
//     return res.status(400).send({
//       error: {
//         message: e.message,
//       },
//     });
//   }
// });

// Security Middleware
if (!isProduction) {
  // Enable CORS only in development because React will be on the React
  // development server (http://localhost:3000). (In production, React files
  // will be served statically on the Express server.)
  app.use(cors());
}

// Set the _csrf token and create req.csrfToken method to generate a hashed
// CSRF token
app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true
    }
  })
);

// Attach Express routers
app.use('/api/users', usersRouter);
app.use('/api/artworks', artworksRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/csrf', csrfRouter);
app.use('/api/cartItems', cartItemsRouter);
app.use('/api/stripe', stripeRouter);


// Serve static React build files statically in production
if (isProduction) {
    const path = require('path');
    // Serve the frontend's index.html file at the root route
    app.get('/', (req, res) => {
      res.cookie('CSRF-TOKEN', req.csrfToken());
      res.sendFile(
        path.resolve(__dirname, '../frontend', 'build', 'index.html')
        );
    });
  
    // Serve the static assets in the frontend's build folder
    app.use(express.static(path.resolve("../frontend/build")));
  
    // Serve the frontend's index.html file at all other routes NOT starting with /api
    app.get(/^(?!\/?api).*/, (req, res) => {
      res.cookie('CSRF-TOKEN', req.csrfToken());
      res.sendFile(
        path.resolve(__dirname, '../frontend', 'build', 'index.html')
      );
    });
  }
  
  // Express custom middleware for catching all unmatched requests and formatting
  // a 404 error to be sent as the response.
  app.use((req, res, next) => {
      const err = new Error('Not Found');
      err.statusCode = 404;
      next(err);
    });
    
    const serverErrorLogger = debug('backend:error');
    
    // Express custom error handler that will be called whenever a route handler or
    // middleware throws an error or invokes the `next` function with a truthy value
    app.use((err, req, res, next) => {
      serverErrorLogger(err);
      const statusCode = err.statusCode || 500;
      res.status(statusCode);
      res.json({
        message: err.message,
        statusCode,
        errors: err.errors
      })
    });
  module.exports = app;