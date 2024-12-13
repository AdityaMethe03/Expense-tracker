const Expense = require('../models/expenseModel');
// const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.getAllExpenses = factory.getAll(Expense);

exports.createExpense = factory.createOne(Expense);

exports.getTour = factory.getOne(Expense);
