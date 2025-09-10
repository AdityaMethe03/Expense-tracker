import AppNav from "../components/AppNav";
import Summary from "../components/Summary";

function Dashboard() {
  return (
    <div className="h-full">
      {/* Page Header */}
      <AppNav />

      {/* Summary Cards */}
      <Summary />

      {/* Placeholder for future charts and transaction lists */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-text-header mb-4">
          Recent Activity
        </h2>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p className="text-ui-gray-200">
            Your recent transactions will appear here...
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
