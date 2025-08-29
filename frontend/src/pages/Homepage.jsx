import { Link } from "react-router-dom";
import {
  ArrowLongRightIcon,
  CurrencyDollarIcon,
  CurrencyEuroIcon,
  CurrencyPoundIcon,
  CurrencyRupeeIcon,
} from "@heroicons/react/24/solid";

export default function Homepage() {
  return (
    <section className="container mx-auto my-20 max-w-6xl flex flex-col gap-8 items-center justify-center text-center cursor-default">
      <p className="text-4xl font-bold">
        Take control of your{" "}
        <span className="text-5xl font-extrabold">money</span>
        .
        <br />
        <span className="text-5xl font-extrabold">ExpenseTracker</span> shows
        you where it goes.
      </p>
      <p className="text-xl">
        A powerful app that automatically tracks your spending, categorizes your
        expenses, and helps you build budgets that stick. Never wonder where
        your money went again, and start reaching your financial goals.
      </p>
      <div className="flex flex-row items-center justify-evenly gap-4">
        <CurrencyDollarIcon className="h-8 w-8 hover:text-text-header" /> |
        <CurrencyRupeeIcon className="h-8 w-8 hover:text-text-header" /> |
        <CurrencyEuroIcon className="h-8 w-8 hover:text-text-header" /> |
        <CurrencyPoundIcon className="h-8 w-8 hover:text-text-header" />
      </div>
      <Link
        to="/login"
        className="flex flex-row items-center justify-evenly gap-1 px-4 py-2 text-lg rounded-lg shadow-md hover:shadow-xl text-text-on-brand bg-brand-primary"
      >
        Get Started for Free
        <ArrowLongRightIcon className="h-6 w-6" />
      </Link>
    </section>
  );
}
