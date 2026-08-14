const SuccessMessage = () => {
  const handleNaviagate = () => {
    window.location.reload();
    localStorage.removeItem('investmentPlan');
    // clearStorage();
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 px-4">
      <div className="max-w-md rounded-2xl bg-white p-8 text-center shadow-xl">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <svg
            className="h-8 w-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h2 className="mb-2 text-2xl font-bold text-gray-800">Plan Submitted Successfully</h2>
        <p className="mb-6 text-gray-600">
          Your real estate investment plan has been saved. You’re officially in the game.
        </p>

        <button
          onClick={handleNaviagate}
          className="rounded-lg bg-green-500 px-6 py-3 font-medium text-white hover:bg-green-600"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default SuccessMessage;
