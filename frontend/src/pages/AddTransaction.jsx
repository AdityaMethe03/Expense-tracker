import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createExpense } from "../services/apiExpenses";
import { getErrorMessage } from "../utils/errorHandler";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

// Common expense categories
const EXPENSE_CATEGORIES = [
    "Food & Dining",
    "Transportation",
    "Shopping",
    "Entertainment",
    "Bills & Utilities",
    "Healthcare",
    "Education",
    "Travel",
    "Groceries",
    "Other",
];

// Common income categories
const INCOME_CATEGORIES = [
    "Salary",
    "Freelance",
    "Business",
    "Investments",
    "Gifts",
    "Other",
];

function AddTransaction() {
    const navigate = useNavigate();
    const [type, setType] = useState("expense");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
    const [notes, setNotes] = useState("");

    const {
        mutate: addTransaction,
        isPending,
    } = useMutation({
        mutationFn: createExpense,
        onSuccess: () => {
            toast.success("Transaction added successfully!");
            navigate("/app/transactions");
        },
        onError: (err) => {
            const errorMessage = getErrorMessage(err);
            toast.error(errorMessage);
            console.error("Add transaction failed:", err.message);
        },
    });

    function handleSubmit(e) {
        e.preventDefault();

        // Validation
        if (!type) {
            toast.error("Please select transaction type.");
            return;
        }

        if (!amount || parseFloat(amount) <= 0) {
            toast.error("Please enter a valid amount.");
            return;
        }

        if (!category) {
            toast.error("Please select a category.");
            return;
        }

        if (!date) {
            toast.error("Please select a date.");
            return;
        }

        // Prepare data
        const transactionData = {
            type,
            amount: parseFloat(amount),
            category,
            date: new Date(date).toISOString(),
            notes: notes.trim() || undefined,
        };

        // Submit
        addTransaction(transactionData);
    }

    const categories = type === "expense" ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;

    return (
        <div className="h-full">
            <button
                onClick={() => navigate("/app/transactions")}
                className="flex items-center gap-2 text-ui-gray-200 hover:text-text-header mb-6 transition-colors"
            >
                <ArrowLeftIcon className="w-5 h-5" />
                Back to Transactions
            </button>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-text-header">Add Transaction</h1>
                <p className="text-ui-gray-200">Record a new income or expense</p>
            </div>

            <form
                onSubmit={handleSubmit}
                className="max-w-2xl bg-white p-8 rounded-lg shadow-lg"
            >
                <div className="mb-6">
                    <label className="block text-lg font-semibold text-text-header mb-3">
                        Transaction Type
                    </label>
                    <div className="flex gap-4">
                        <button
                            type="button"
                            onClick={() => setType("expense")}
                            className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
                                type === "expense"
                                    ? "bg-accent-red text-text-on-brand shadow-md"
                                    : "bg-bg-primary text-ui-gray-200 hover:bg-gray-200"
                            }`}
                        >
                            Expense
                        </button>
                        <button
                            type="button"
                            onClick={() => setType("income")}
                            className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
                                type === "income"
                                    ? "bg-brand-primary text-text-on-brand shadow-md"
                                    : "bg-bg-primary text-ui-gray-200 hover:bg-gray-200"
                            }`}
                        >
                            Income
                        </button>
                    </div>
                </div>

                <div className="mb-6">
                    <label htmlFor="amount" className="block text-lg font-semibold text-text-header mb-2">
                        Amount (₹)
                    </label>
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                        disabled={isPending}
                        className="w-full p-3 text-lg rounded-md bg-bg-primary border-2 border-transparent focus:outline-none focus:border-brand-primary disabled:opacity-50"
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="category" className="block text-lg font-semibold text-text-header mb-2">
                        Category
                    </label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        disabled={isPending}
                        className="w-full p-3 text-lg rounded-md bg-bg-primary border-2 border-transparent focus:outline-none focus:border-brand-primary disabled:opacity-50"
                    >
                        <option value="">Select a category</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-6">
                    <label htmlFor="date" className="block text-lg font-semibold text-text-header mb-2">
                        Date
                    </label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        disabled={isPending}
                        className="w-full p-3 text-lg rounded-md bg-bg-primary border-2 border-transparent focus:outline-none focus:border-brand-primary disabled:opacity-50"
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="notes" className="block text-lg font-semibold text-text-header mb-2">
                        Notes (Optional)
                    </label>
                    <textarea
                        id="notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Add any additional details..."
                        rows="3"
                        disabled={isPending}
                        className="w-full p-3 text-lg rounded-md bg-bg-primary border-2 border-transparent focus:outline-none focus:border-brand-primary disabled:opacity-50 resize-none"
                    />
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-4">
                    <button
                        type="button"
                        onClick={() => navigate("/app/transactions")}
                        disabled={isPending}
                        className="flex-1 py-3 text-lg rounded-lg font-bold text-ui-gray-200 bg-gray-200 hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isPending}
                        className="flex-1 py-3 text-lg rounded-lg font-bold text-text-on-brand bg-brand-primary hover:bg-brand-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {isPending ? "Adding..." : "Add Transaction"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddTransaction;