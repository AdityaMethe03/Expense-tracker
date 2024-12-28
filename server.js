const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require("./app");
const Expense = require('./models/expenseModel');
const User = require('./models/userModel');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("DB connection successfull!")
    })
    .catch(err => console.log(err))

// const testExpense = new Expense({
//     user: new mongoose.Types.ObjectId(), // Simulating a valid ObjectId
//     type: 'expense',
//     amount: 1000,
//     category: 'Travel',
//     date: new Date('2024-12-10'),
//     notes: 'Business trip to Bangalore'
// })

// const testUser = new User({
//     name: 'Clark Kent',
//     email: 'clarkkent@example.com',
//     password: 'test1234',
//     passwordConfirm: 'test1234',
//     role: 'user',
//     photo: 'default.jpg',
//     active: true
// });

// testExpense.save().then(doc => {
//     console.log(doc);
// }).catch(err => {
//     console.log("Error: ", err)
// })

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
    console.log(`App running on port ${port}...`);
})