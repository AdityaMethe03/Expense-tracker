/**
 * Maps backend error messages to user-friendly messages
 */
const errorMessages = {
    // Authentication errors
    "Incorrect email or password": "Invalid email or password. Please try again.",
    "Please provide email and password!": "Please enter both email and password.",
    "You are not logged in! Please log in to get access.":
        "Your session has expired. Please log in again.",
    "Invalid token. Please log in again": "Your session is invalid. Please log in again.",
    "Your token has expired! Please log in again.":
        "Your session has expired. Please log in again.",
    "User recently changed password! Please log in again.":
        "Password was changed recently. Please log in again.",

    // Registration errors
    "Duplicate field value": "This email is already registered. Please use a different email.",
    "Please confirm your password": "Please confirm your password.",
    "Passwords are not the same.": "Passwords do not match. Please try again.",
    "Please provide a valid email.": "Please enter a valid email address.",
    "Please tell us your name!": "Name is required.",
    "Please provide your email.": "Email is required.",
    "Please provide a password.": "Password is required.",

    // Expense errors
    "No expense found with that ID": "Expense not found.",
    "You do not have permission to modify this expense":
        "You don't have permission to modify this expense.",
    "User is required for the expense.": "Something went wrong. Please try again.",
    "Expense type is required (income or expense).": "Please select expense type.",
    "Amount is required for the expense.": "Please enter an amount.",
    "Amount must be a positive number.": "Amount must be greater than zero.",
    "Please specify the category for this expense.": "Please select a category.",
    "Please specify the date for this expense.": "Please select a date.",

    // User errors
    "No user with email address": "No account found with this email.",
    "This route is not for password updates. Please use /updatePassword.":
        "Please use the 'Change Password' option to update your password.",
    "You cannot change name or email.": "Name and email cannot be changed.",
    "Your current password is wrong.": "Current password is incorrect.",

    // Permission errors
    "You do not have permission to perform this action":
        "You don't have permission to perform this action.",

    // Network errors
    "Failed to fetch": "Network error. Please check your internet connection.",
    "Network request failed": "Unable to connect to server. Please try again.",

    // Generic errors
    "Something went very wrong!": "An unexpected error occurred. Please try again.",
};

/**
 * Get user-friendly error message
 * @param {Error | string} error - Error object or error message
 * @returns {string} User-friendly error message
 */
export function getErrorMessage(error) {
    // If the error is a string
    if (typeof error === "string") {
        return errorMessages[error] || error;
    }

    // If an error is an Error object
    const message = error?.message || "An error occurred";

    // Check if message matches any known error
    for (const [key, value] of Object.entries(errorMessages)) {
        if (message.includes(key)) {
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

    // Return original message if no match found
    return message;
}

/**
 * Get an error message and display appropriate icon
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