import {
  BanknotesIcon,
  ChartPieIcon,
  ArrowPathIcon,
  ChatBubbleLeftRightIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";

function Features() {
  return (
    <section className="container mx-auto py-18 px-6">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-text-header mb-4">
          All The Tools You Need to Succeed
        </h1>
        <p className="text-lg max-w-3xl mx-auto text-ui-gray-200">
          From automated tracking to intelligent insights, ExpenseTracker is
          designed to give you a complete and effortless overview of your
          financial life.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <BanknotesIcon className="w-10 h-10 text-brand-primary mb-4" />
          <h3 className="text-xl font-bold text-text-header mb-2">
            Bank Synchronization
          </h3>
          <p className="text-ui-gray-200">
            Securely connect your bank accounts and credit cards. Your
            transactions are automatically imported and categorized, eliminating
            manual entry forever.
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <ChartPieIcon className="w-10 h-10 text-brand-primary mb-4" />
          <h3 className="text-xl font-bold text-text-header mb-2">
            Budgeting & Forecasts
          </h3>
          <p className="text-ui-gray-200">
            Create budgets that actually work. We'll help you plan your spending
            for the month ahead and provide forecasts to keep you on track
            towards your goals.
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <ArrowPathIcon className="w-10 h-10 text-brand-primary mb-4" />
          <h3 className="text-xl font-bold text-text-header mb-2">
            Automated Recurring Bills
          </h3>
          <p className="text-ui-gray-200">
            Set up your subscriptions, rent, and other recurring payments once.
            We'll automatically track them for you so you never miss a due date.
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <ChatBubbleLeftRightIcon className="w-10 h-10 text-brand-primary mb-4" />
          <h3 className="text-xl font-bold text-text-header mb-2">
            Log Expenses via Chat
          </h3>
          <p className="text-ui-gray-200">
            On the go? Simply send a message to our smart assistant to log an
            expense in seconds. It's as easy as texting a friend.
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <LockClosedIcon className="w-10 h-10 text-brand-primary mb-4" />
          <h3 className="text-xl font-bold text-text-header mb-2">
            Bank-Grade Security
          </h3>
          <p className="text-ui-gray-200">
            Your security is our top priority. We use Plaid for bank connections
            and 256-bit encryption to ensure your data is always safe and
            private.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Features;
