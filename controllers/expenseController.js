const Expense = require('../models/expenseModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');


exports.getAllExpenses = factory.getAll(Expense);

exports.createExpense = factory.createOne(Expense);

exports.getExpense = factory.getOne(Expense);
exports.updateExpense = factory.updateOne(Expense);
exports.deleteExpense = factory.deleteOne(Expense);

exports.getMyExpenses = catchAsync(async (req, res, next) => {
    const expenses = await Expense.find({ user: req.user.id });

    res.status(200).json({
        status: 'success',
        results: expenses.length,
        data: {
            expenses
        }
    });
});

// Get expenses
// Add expenses
// Delete expenses
// Edit expenses
// Get monthly expenses
// Get a year's expense summary
// Get a month's expense summary
// Get a day's expense summary
// Get total expense summary