import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  BanknotesIcon,
  CreditCardIcon,
} from "@heroicons/react/24/outline";

function SummaryCard({ title, value, icon, color }) {
  const Icon = icon;
  return (
    <div className="p-6 rounded-2xl bg-white shadow-lg flex items-start gap-4">
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <h2 className="text-lg font-bold text-ui-gray-200">{title}</h2>
        <p className="text-3xl font-semibold mt-2 text-text-header">{`₹${value}`}</p>
      </div>
    </div>
  );
}

function Summary() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <SummaryCard
        title="Total Income"
        value="50,000"
        icon={ArrowTrendingUpIcon}
        color="bg-brand-primary"
      />
      <SummaryCard
        title="Total Expenses"
        value="32,500"
        icon={ArrowTrendingDownIcon}
        color="bg-accent-red"
      />
      <SummaryCard
        title="Balance"
        value="17,500"
        icon={BanknotesIcon}
        color="bg-text-primary"
      />
      <SummaryCard
        title="Subscriptions"
        value="1,200"
        icon={CreditCardIcon}
        color="bg-feedback-warning"
      />
    </div>
  );
}

export default Summary;
