function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="my-6">
      <div className="text-text-secondary py-4 px-6 text-center shadow-[0_0_2px_rgba(0,0,0,0.2)] bg-ui-gray-100/20 text-ui-gray-200">
        <p>&copy; {currentYear} ExpenseTracker. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
