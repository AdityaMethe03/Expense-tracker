const Expense = require('../models/expenseModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');
const mongoose = require('mongoose');

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

exports.aliasTopExpenses = (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = '-amount';
    req.query.fields = "user,type,amount,category,date,notes";
    next();
}


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

exports.getExpensesByMonth = catchAsync(async (req, res, next) => {
    const userId = req.user.id;
    const isAdmin = req.user.role === 'admin';

    const { month, year } = req.query;

    if (!month || !year) {
        return res.status(400).json({
            status: 'fail',
            message: 'Please provide both month and year.'
        });
    }

    const startDate = new Date(`${year}-${month.padStart(2, '0')}-01`);
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1);

    console.log('Start Date:', startDate);
    console.log('End Date:', endDate);

    const matchQuery = {
        date: {
            $gte: startDate,
            $lt: endDate
        }
    };

    if (!isAdmin) {
        matchQuery.user = userId;
    }

    const expenses = await Expense.find(matchQuery).sort({ date: 1 });

    res.status(200).json({
        status: 'success',
        results: expenses.length,
        data: {
            expenses
        }
    });
});

exports.getExpensesByTime = catchAsync(async (req, res, next) => {
    const userId = req.user.id;
    const isAdmin = req.user.role === 'admin';

    const matchStage = isAdmin
        ? {}
        : { user: new mongoose.Types.ObjectId(userId) };

    // Optional query param: ?by=month OR ?by=year
    const groupBy = req.query.by === 'year' ? '$year' : '$month';

    const summary = await Expense.aggregate([
        { $match: matchStage },
        {
            $group: {
                _id: { [groupBy]: '$date' },
                totalAmount: { $sum: '$amount' },
                income: {
                    $sum: {
                        $cond: [{ $eq: ['$type', 'income'] }, '$amount', 0]
                    }
                },
                expense: {
                    $sum: {
                        $cond: [{ $eq: ['$type', 'expense'] }, '$amount', 0]
                    }
                },
                count: { $sum: 1 }
            }
        },
        { $sort: { '_id': 1 } }
    ]);

    res.status(200).json({
        status: 'success',
        data: {
            summary
        }
    });
});


exports.getExpenseSummary = catchAsync(async (req, res, next) => {
    const userId = req.user.id;
    const isAdmin = req.user.role === 'admin';

    const matchStage = isAdmin
        ? {} // Get all expenses if admin
        : { user: new mongoose.Types.ObjectId(userId) };

    const summary = await Expense.aggregate([
        {
            $match: matchStage
        },
        {
            $group: {
                _id: '$type', // Group by 'income' and 'expense'
                totalAmount: { $sum: '$amount' },
                averageAmount: { $avg: '$amount' },
                count: { $sum: 1 }
            }
        }
    ]);

    res.status(200).json({
        status: 'success',
        data: {
            summary
        }
    });
});
