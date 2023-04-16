const RemoveButton = ({
  setStepIndex,
  stepCounter,
  setStepCounter,
  currentIndex,
}) => {
  const removeStep = () => {
    if (currentIndex <= 8) {
      const newStepCounter = stepCounter.map((step, index) => {
        if (currentIndex === index) {
          setStepIndex(currentIndex);
          return false;
        } else {
          return step;
        }
      });
      setStepCounter(newStepCounter);
    }
  };
  return (
    <button
      onClick={() => removeStep()}
      type="button"
      className="text-white mb-5 bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      <svg
        fill="none"
        className="h-5 w-5"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        ></path>
      </svg>
    </button>
  );
};
export default RemoveButton;
