const express = require('express');
const expenseController = require('../controllers/expenseController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router.get("/topExpenses", expenseController.aliasTopExpenses, expenseController.getMyExpenses);

router.get("/myexpenses", expenseController.getMyExpenses);

router.route("/")
    .get(authController.restrictTo('admin'), expenseController.getAllExpenses)
    .post(expenseController.setUserId, expenseController.createExpense);

router.route("/:id")
    .get(expenseController.getExpense)
    .patch(expenseController.checkUser, expenseController.updateExpense)
    .delete(expenseController.checkUser, expenseController.deleteExpense);

module.exports = router;
