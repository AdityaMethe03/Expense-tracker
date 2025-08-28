import { Link } from "react-router-dom";
import PageNav from "../components/PageNav";

export default function Homepage() {
  return (
    <main
      id="home"
      className="h-[93.5vh] mx-6 mt-6 font-semibold text-text-dark bg-background"
    >
      <PageNav />
      <section className="@container mx-auto my-16 max-w-6xl flex flex-col gap-8 items-center justify-center text-center">
        <p className="text-4xl font-bold">
          Take control of your{" "}
          <span className="text-5xl font-extrabold">money</span>
          .
          <br />
          <span className="text-5xl font-extrabold">ExpenseTracker</span> shows
          you where it goes.
        </p>
        <p className="text-xl">
          A powerful app that automatically tracks your spending, categorizes
          your expenses, and helps you build budgets that stick. Never wonder
          where your money went again, and start reaching your financial goals.
        </p>
        <Link
          to="/signup"
          className="px-4 py-2 text-lg rounded-lg shadow-lg hover:shadow-inner text-text-dark bg-accent hover:bg-parachment"
        >
          Get Started for Free
        </Link>
      </section>
    </main>
  );
}
