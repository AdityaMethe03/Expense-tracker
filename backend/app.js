const express = require('express');
const morgan = require("morgan");
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const expenseRouter = require('./routes/expenseRoute')
const userRouter = require('./routes/userRoute')

const app = express();

//Enable CORS
app.use(cors({
    origin: process.env.FRONTEND_URL, // Your frontend's origin
    credentials: true
}));

//Set Security HTTP headers
app.use(helmet());
//Development logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
    // Morgan is a middleware for logging HTTP requests in Express.js applications. It helps track incoming requests, their status codes, response times, and other information, which can be very useful for debugging and monitoring.
}

const reactivationLimiter = rateLimit({
    max: 3, // e.g., allow only 3 attempts
    windowMs: 60 * 60 * 1000, // per hour
    message: 'Too many reactivation attempts. Try again later.'
});
app.use('/api/v1/users/reactivate', reactivationLimiter);

//Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());
// Data sanitization against XSS
app.use(xss());

app.use("/api/v1/expenses", expenseRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
