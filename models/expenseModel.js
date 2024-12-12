const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "User ID is required for the expense."],
    },
    type: {
        type: String,
        enum: ['income', 'expense'], // Allows only 'income' or 'expense'
        required: [true, "Expense type is required (income or expense)."],
    },
    amount: {
        type: Number,
        required: [true, "Expense must include an amount."],
    },
    category: {
        type: String,
        required: [true, "Expense must have a category."],
    },
    date: {
        type: Date,
        required: [true, "Expense must have a valid date."],
    },
    notes: {
        type: String,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Expense = mongoose.model('Expense', expenseSchema);
module.exports = Expense;
