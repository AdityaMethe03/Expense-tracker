// frontend/src/services/apiExpenses.js

import { api } from "./apiClient";

// Get all expenses (admin only)
export async function getAllExpenses(queryString = "") {
    return api.get(`/expenses${queryString}`);
}

// Get my expenses
export async function getMyExpenses(queryString = "") {
    return api.get(`/expenses/myexpenses${queryString}`);
}

// Get single expense
export async function getExpense(id) {
    return api.get(`/expenses/${id}`);
}

// Create new expense
export async function createExpense(expenseData) {
    return api.post("/expenses", expenseData);
}

// Update expense
export async function updateExpense(id, expenseData) {
    return api.patch(`/expenses/${id}`, expenseData);
}

// Delete expense
export async function deleteExpense(id) {
    return api.delete(`/expenses/${id}`);
}

// Get expense summary
export async function getExpenseSummary() {
    return api.get("/expenses/expense-summary");
}

// Get top 5 expenses
export async function getTopExpenses() {
    return api.get("/expenses/top-5-expenses");
}

// Get daily expenses average
export async function getDailyExpensesAverage() {
    return api.get("/expenses/daily-expenses-average");
}

// Get expenses by month
export async function getExpensesByMonth(month, year) {
    return api.get(`/expenses/expenses-by-month?month=${month}&year=${year}`);
}

// Get expenses by time (month or year)
export async function getExpensesByTime(groupBy = "month") {
    return api.get(`/expenses/expenses-by-time?by=${groupBy}`);
}