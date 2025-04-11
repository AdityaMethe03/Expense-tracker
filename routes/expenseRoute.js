const express = require('express');
const expenseController = require('../controllers/expenseController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get("/myexpenses",
    authController.protect,
    expenseController.getMyExpenses
);

router.route("/")
    .get(expenseController.getAllExpenses)
    .post(expenseController.createExpense);

router.route("/:id")
    .get(expenseController.getExpense)
    .post(expenseController.updateExpense)
    .delete(expenseController.deleteExpense);

module.exports = router;
