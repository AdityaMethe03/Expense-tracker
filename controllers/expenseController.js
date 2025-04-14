const Expense = require('../models/expenseModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

// middleware/restrictExpenseAccess.js
exports.restrictExpenseAccess = catchAsync((req, res, next) => {
    if (req.user.role !== 'admin') {
        // Restrict filter to current user's expenses
        req.filter = { user: req.user._id };
    } else {
        // Admin gets full access
        req.filter = {};
    }

    next();
});

exports.getAllExpenses = factory.getAll(Expense);

exports.setUserId = (req, res, next) => {
    if (!req.body.user) req.body.user = req.user.id;
    next();
};

exports.createExpense = factory.createOne(Expense);

exports.getExpense = factory.getOne(Expense);

exports.checkUser = catchAsync(async (req, res, next) => {

    const expense = await Expense.findById(req.params.id);

    if (!expense) {
        return next(new AppError('No expense found with that ID', 404));
    }

    // console.log(req.body);
    // console.log(expense.user.id.toString());
    // console.log(req.user.id);

    if (expense.user.id.toString() !== req.user.id) {
        return next(new AppError('You do not have permission to modify this expense', 403));
    }

    next();
});

exports.updateExpense = factory.updateOne(Expense);
exports.deleteExpense = factory.deleteOne(Expense);

exports.getMyExpenses = catchAsync(async (req, res, next) => {

    const filterUser = { user: req.user.id };

    const features = new APIFeatures(Expense.find(filterUser), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
    // const doc = await features.query.explain();
    const expenses = await features.query;

    res.status(200).json({
        status: 'success',
        results: expenses.length,
        data: {
            expenses
        }
    });
});
