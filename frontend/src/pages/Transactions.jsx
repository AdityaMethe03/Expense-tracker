import { Link } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/24/solid";

function Transactions() {

    return (
        <div className="h-full">

            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-text-header">Transactions</h1>
                    <p className="text-ui-gray-200">
                        View and manage all your income and expenses
                    </p>
                </div>

                <Link
                    to="/app/transactions/addtransaction"
                    className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg shadow-md font-bold text-text-on-brand bg-brand-primary hover:bg-brand-600 transition-colors duration-300"
                >
                    <PlusIcon className="w-5 h-5" />
                    Add Transaction
                </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
                <p className="text-ui-gray-200 text-center py-8">
                    No transactions yet. Click "Add Transaction" to get started!
                </p>
            </div>
        </div>
    );
}

export default Transactions;