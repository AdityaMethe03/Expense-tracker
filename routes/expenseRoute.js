const express = require('express');
const expenseController = require('../controllers/expenseController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router.get("/expense-summary", expenseController.getExpenseSummary);

router.get("/top-5-expenses", expenseController.aliasTopExpenses, expenseController.getMyExpenses);

router.get("/daily-expenses-average", expenseController.getDailyExpensesAverage);

router.get('/expenses-by-month', expenseController.getExpensesByMonth);

router.get('/expenses-by-time', expenseController.getExpensesByTime);

router.get("/myexpenses", expenseController.getMyExpenses);

router.route("/")
    .get(authController.restrictTo('admin'), expenseController.getAllExpenses)
    .post(expenseController.setUserId, expenseController.createExpense);

router.route("/:id")
    .get(expenseController.getExpense)
    .patch(expenseController.checkUser, expenseController.updateExpense)
    .delete(expenseController.checkUser, expenseController.deleteExpense);

module.exports = router;
