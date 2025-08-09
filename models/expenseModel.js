const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "User is required for the expense."],
    },
    type: {
        type: String,
        enum: ['income', 'expense'], // Allows only 'income' or 'expense'
        required: [true, "Expense type is required (income or expense)."],
    },
    amount: {
        type: Number,
        required: [true, "Amount is required for the expense."],
        min: [0, "Amount must be a positive number."],
    },
    category: {
        type: String,
        required: [true, "Please specify the category for this expense."],
        trim: true,
    },
    date: {
        type: Date,
        default: Date.now(),
        required: [true, "Please specify the date for this expense."],
    },
    notes: {
        type: String,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        // select: false,
    },
});

expenseSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'user',
        select: 'name', // Include user name and photo
    });
    next();
});

const Expense = mongoose.model('Expense', expenseSchema);
module.exports = Expense;
