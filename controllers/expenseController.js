
exports.getAllExpenses = (req, res, next) => {
    res.status(200).json({
        status: 'success',
        data: {
            msg: "All Expenses"
        }
    })
}