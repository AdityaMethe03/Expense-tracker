const express = require('express');
const morgan = require("morgan");
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cookieParser = require('cookie-parser');

const expenseRouter = require('./routes/expenseRoute')

const app = express();

//Set Security HTTP headers
app.use(helmet());
//Development logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
    // Morgan is a middleware for logging HTTP requests in Express.js applications. It helps track incoming requests, their status codes, response times, and other information, which can be very useful for debugging and monitoring.
}

//Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());
// Data sanitization against XSS
app.use(xss());

app.use("/api/v1/expenses", expenseRouter);

module.exports = app;
