const AddButton = ({
  setStepIndex,
  stepIndex,
  stepCounter,
  setStepCounter,
}) => {
  const addButton = () => {
    if (stepIndex <= 10) {
      const newStepCounter = stepCounter.map((step, index) => {
        if ((stepIndex === index && step === false) || step) {
          setStepIndex(index + 1);
          return true;
        } else {
          return false;
        }
      });
      setStepCounter(newStepCounter);
    }
  };
  return (
    <button
      type="button"
      onClick={() => addButton()}
      className="text-white mt-10 mb-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
          d="M12 4.5v15m7.5-7.5h-15"
        ></path>
      </svg>
    </button>
  );
};
export default AddButton;
