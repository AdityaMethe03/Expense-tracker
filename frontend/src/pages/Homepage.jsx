import { Link } from "react-router-dom";
import PageNav from "../components/PageNav";

export default function Homepage() {
  return (
    <main className="h-[93vh] m-6 font-semibold text-alice-blue bg-gradient-to-r from-bright-gray to-dark-gray">
      <PageNav />
      <section className="@container mx-auto my-16 max-w-6xl flex flex-col gap-8 items-center justify-center text-center">
        <p className="text-4xl font-bold">
          Take control of your{" "}
          <span className="text-5xl font-extrabold text-white">money</span>
          .
          <br />
          <span className="text-5xl font-extrabold text-white">
            ExpenseTracker
          </span>{" "}
          shows you where it goes.
        </p>
        <p className="text-xl">
          A powerful app that automatically tracks your spending, categorizes
          your expenses, and helps you build budgets that stick. Never wonder
          where your money went again, and start reaching your financial goals.
        </p>
        <Link
          to="/signup"
          className="px-4 py-2 text-lg rounded-lg shadow-lg hover:shadow-inner text-slate-900 bg-pearl hover:bg-parachment"
        >
          Get Started for Free
        </Link>
      </section>
    </main>
  );
}
