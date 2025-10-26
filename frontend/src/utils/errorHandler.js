// frontend/src/utils/errorHandler.js

/**
 * Maps backend error messages to user-friendly messages
 */
const errorMessages = {
    // Authentication errors
    "incorrect email or password": "Invalid email or password. Please try again.",
    "please provide email and password!": "Please enter both email and password.",
    "you are not logged in! Please log in to get access.":
        "Your session has expired. Please log in again.",
    "invalid token. Please log in again": "Your session is invalid. Please log in again.",
    "your token has expired! Please log in again.":
        "Your session has expired. Please log in again.",
    "user recently changed password! Please log in again.":
        "Password was changed recently. Please log in again.",

    // Registration errors
    "duplicate key error": "This email is already registered. Please use a different email.",
    "please confirm your password": "Please confirm your password.",
    "passwords are not the same.": "Passwords do not match. Please try again.",
    "please provide a valid email.": "Please enter a valid email address.",
    "please tell us your name!": "Name is required.",
    "please provide your email.": "Email is required.",
    "please provide a password.": "Password is required.",

    // Expense errors
    "no expense found with that ID": "Expense not found.",
    "you do not have permission to modify this expense":
        "You don't have permission to modify this expense.",
    "user is required for the expense.": "Something went wrong. Please try again.",
    "expense type is required (income or expense).": "Please select expense type.",
    "amount is required for the expense.": "Please enter an amount.",
    "amount must be a positive number.": "Amount must be greater than zero.",
    "please specify the category for this expense.": "Please select a category.",
    "please specify the date for this expense.": "Please select a date.",

    // User errors
    "no user with email address": "No account found with this email.",
    "this route is not for password updates. Please use /updatePassword.":
        "Please use the 'Change Password' option to update your password.",
    "you cannot change name or email.": "Name and email cannot be changed.",
    "your current password is wrong.": "Current password is incorrect.",

    // Permission errors
    "you do not have permission to perform this action":
        "You don't have permission to perform this action.",

    // Network errors
    "failed to fetch": "Network error. Please check your internet connection.",
    "network request failed": "Unable to connect to server. Please try again.",

    // Generic errors
    "something went very wrong!": "An unexpected error occurred. Please try again.",
};

/**
 * Get user-friendly error message
 * @param {Error | string} error - Error object or error message
 * @returns {string} User-friendly error message
 */
export function getErrorMessage(error) {
    // If error is a string
    if (typeof error === "string") {
        return errorMessages[error] || error;
    }

    // If error is an Error object
    const message = error.data || "An error occurred";

    // console.log("Error message:", error.data);

    // Log for debugging (can remove in production)
    if (import.meta.env.DEV) {
        console.log("Error object:", error);
        console.log("Error message:", message);
        console.log("Error status code:", error?.statusCode);
    }

    // Check if message matches any known error
    for (const [key, value] of Object.entries(errorMessages)) {
        console.log(key, value);
        let errorMessage = message.toLowerCase();
        if (errorMessage.includes(key)) {
            return value;
        }
    }

    // Check for validation errors (MongoDB)
    if (message.includes("Invalid input data")) {
        return "Please check your input and try again.";
    }

    // Check for duplicate key errors
    if (message.includes("E11000") || message.includes("duplicate")) {
        return "This email is already registered.";
    }

    // Handle HTTP status codes if no specific message matched
    if (error?.statusCode) {
        switch (error.statusCode) {
            case 400:
                return "Invalid request. Please check your input.";
            case 401:
                return "Unauthorized.";
            case 403:
                return "You don't have permission to perform this action.";
            case 404:
                return "Resource not found.";
            case 500:
                return "Server error. Please try again later.";
            default:
                return message;
        }
    }

    // Return original message if no match found
    return message;
}

/**
 * Get error message and display appropriate icon
 * @param {Error} error - Error object
 * @returns {object} { message: string, type: 'error' | 'warning' }
 */
export function parseError(error) {
    const message = getErrorMessage(error);

    // Determine severity
    const isWarning =
        message.includes("required") ||
        message.includes("must") ||
        message.includes("Please enter") ||
        message.includes("Please select");

    return {
        message,
        type: isWarning ? "warning" : "error",
    };
}