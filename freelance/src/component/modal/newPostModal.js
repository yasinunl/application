import { useContext, useEffect, useRef, useState } from "react";
import AddButton from "./addButton";
import RemoveButton from "./removeButton";
import { ApiContext } from "../../context/ApiContext";
import { ScriptsContext } from "../../context/ScriptsContext";

const NewPostModal = () => {
  const { postNewJob, allJobs } = useContext(ApiContext);
  const { openModal } = useContext(ScriptsContext);
  //Steps
  const [stepCounter, setStepCounter] = useState([
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [stepIndex, setStepIndex] = useState(1);
  const [successMg, setSuccessMg] = useState(false);
  const [alertHidden, setAlertHidden] = useState(false);
  const [files, setFiles] = useState([]);
  useEffect(() => {}, [stepIndex, successMg]);
  ///////////////////////////////////////////////////////
  const moneyType = useRef();
  const title = useRef();
  const paymentAmount = useRef();
  const description = useRef();
  const [stepTitleInput, setStepTitleInput] = useState();
  const [stepDescriptionInput, setStepDescriptionInput] = useState();
  const onTitleChange = (e) => {
    setStepTitleInput({ ...stepTitleInput, [e.target.name]: e.target.value });
  };
  const onDescriptionChange = (e) => {
    setStepDescriptionInput({
      ...stepDescriptionInput,
      [e.target.name]: e.target.value,
    });
  };
  //
  const deleteFoto = (e) => {
    const newFiles = files.filter(file => file.name !== e.target.name)
    setFiles(newFiles)
  }

  ///
  const submitHandle = (e) => {
    e.preventDefault();
    const titles = [];
    const descriptions = [];
    const bodyFormData = new FormData();
    const paymentMethod = `['${
      paymentAmount.current.value ? paymentAmount.current.value : "0"
    }','${moneyType.current.value}']`;
    bodyFormData.append("payment_method", paymentMethod);
    bodyFormData.append("title", title.current.value);
    bodyFormData.append("description", description.current.value);
    if (stepTitleInput) {
      for (const [, value] of Object.entries(stepTitleInput)) {
        titles?.push(value);
      }
    }
    if (stepDescriptionInput) {
      for (const [, value] of Object.entries(stepDescriptionInput)) {
        descriptions?.push(value);
      }
    }
    //It's about to database
    let steps = "[";
    titles?.map((value, key) => {
      steps += `['${value
        .replaceAll("'", "\\'")
        .replaceAll('"', '\\"')}','${descriptions[key]
        .replaceAll("'", "\\'")
        .replaceAll('"', '\\"')}'],`;
    });
    steps = steps.slice(0, -1) + "]";
    bodyFormData.append("steps", steps);
    //Files 
    const newFileName = []
    files?.map((file)=> {
      newFileName.push(`'${file.name}'`)
    })
    const fileNames = `[${newFileName}]`
    bodyFormData.append("files",fileNames);
    bodyFormData.append("file-0", files[0]);
    bodyFormData.append("file-1", files[1]);
    const successF = postNewJob(bodyFormData);
    setSuccessMg(successF);
    setAlertHidden(true);
    setTimeout(() => {
      if (successF) {
        openModal();
        const date = new Date();
        const formattedDate = date.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        });
        const newDate = `${formattedDate.split(" ")[0]} ${
          formattedDate.split(" ")[1]
        }, ${formattedDate.split(" ")[2]}`;

        bodyFormData.append("date", `${newDate}`);
        bodyFormData.append("id", `${parseInt(allJobs[0].id) + 1}`);
        const newPost = {};
        for (var pair of bodyFormData.entries()) {
          newPost[pair[0]] = pair[1];
        }
      }
    }, 2000);
  };
  ///////////////////////////////////////////////////////
  return (
    <form className="newPost" onSubmit={submitHandle}>
      <section
        className="px-4 flex flex-col bg-white rounded-r-3xl overflow-auto w-[350px] md:w-[500px] lg:w-[720px]"
      >
        <div
          className={
            successMg
              ? `bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3 w-full ${
                  alertHidden ? "" : "hidden"
                }`
              : `bg-red-500 text-white border-t border-b border-red-400 px-4 py-3 w-full ${
                  alertHidden ? "" : "hidden"
                }`
          }
          role="alert"
        >
          {successMg ? (
            <>
              {" "}
              <p className="font-bold">Informational message</p>
              <p className="text-sm">Jow shared successfully.</p>
            </>
          ) : (
            <>
              {" "}
              <p className="font-bold">Informational message</p>
              <p className="text-sm">There is something wrong.</p>
            </>
          )}
        </div>
        <h1 className="text-2xl mb-2">Post new job</h1>

        <div className="job-info border-b-2 py-2 mb-5">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm mb-2"
              htmlFor="job-title"
            >
              Title
            </label>
            <input
              ref={title}
              className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-gray-500"
              id="job-title"
              name="job-title"
              placeholder="Frontend Developer"
              autoFocus
            />
          </div>
          <div className="md:flex md:justify-between lg:space-x-10">
            <div className="w-full mb-4 md:mb-0">
              <label
                htmlFor="from"
                className="block text-gray-700 text-sm mb-2"
              >
                Payment
              </label>
              <input
                ref={paymentAmount}
                type="text"
                className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-gray-500"
                name="from"
                placeholder="Amount"
              />
            </div>
            <div className="w-full mb-4 md:mb-0">
              <label
                htmlFor="from"
                className="block text-gray-700 text-sm mb-2"
              >
                {"\u00A0"}
              </label>
              <select
                ref={moneyType}
                id="countries"
                className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-gray-500"
              >
                <option value="$" defaultValue={"$"}>
                  $ Dolar
                </option>
                <option value="£">£ Pound</option>
                <option value="€">€ Euro</option>
                <option value="₺">₺ TL</option>
              </select>
            </div>
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-gray-700 text-sm mb-2"
            >
              Description
            </label>
            <textarea
              ref={description}
              name="description"
              cols=""
              rows="8"
              className="w-full border border-gray-400 rounded"
            ></textarea>
          </div>
          <AddButton
            setStepCounter={setStepCounter}
            setStepIndex={setStepIndex}
            stepCounter={stepCounter}
            stepIndex={stepIndex}
          ></AddButton>
          <span>Add Step - (Max 8)</span>
          <div id="Steps">
            {stepCounter?.map((step, index) => {
              if (step) {
                return (
                  <div className="flex flex-wrap -mx-3 border-b md:border-b-0 border-sh-dark-blue md:mb-0 mb-5" key={index}>
                    <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                      <div className="flex flex-col">
                        <div>
                          <label
                            htmlFor={`title-name-${index}`}
                            className="block text-gray-700 text-sm mb-2"
                          >
                            Step Title
                          </label>
                          <input
                            onChange={onTitleChange}
                            type="text"
                            className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-gray-500"
                            name={`title-name-${index}`}
                            placeholder="Title"
                          />

                          <RemoveButton
                            setStepCounter={setStepCounter}
                            setStepIndex={setStepIndex}
                            stepCounter={stepCounter}
                            stepIndex={stepIndex}
                            currentIndex={index}
                          />
                          <span>Remove Step </span>
                        </div>
                      </div>
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                      <label
                        htmlFor={`title-description-${index}`}
                        className="block text-gray-700 text-sm mb-2"
                      >
                        Step Description
                      </label>
                      <textarea
                        onChange={onDescriptionChange}
                        name={`title-description-${index}`}
                        cols=""
                        rows="4"
                        className="w-full border border-gray-400 rounded"
                      ></textarea>
                    </div>
                  </div>
                );
              }
            })}
          </div>
          <div className="mb-4 md:mb-0">
            <label
              htmlFor="company-logo"
              className="block text-gray-700 text-sm mb-2"
            >
              Logo Image
            </label>
            <input
             accept="image/png, image/jpeg"
              onChange={(e) => {
                setFiles([e.target.files[0], ...files]);
              }}
              type="file"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-3 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="company-logo"
              name="company-logo"
            />
            <div className="flex flex-row items-center justify-start space-x-2">
              {files?.map((file, i) => {
                return (
                  <>
                    <li className="block p-1 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 xl:w-1/8 h-24">
                      <article
                        tabindex="0"
                        className="group hasImage w-full h-full rounded-md focus:outline-none focus:shadow-outline bg-gray-100 cursor-pointer relative text-transparent hover:text-white shadow-sm"
                      >
                        <img
                          src={URL.createObjectURL(file)}
                          alt="upload preview"
                          className="img-preview w-full h-full sticky object-cover rounded-md bg-fixed"
                        />

                        <section className="flex flex-col rounded-md text-xs break-words w-full h-full z-20 absolute top-0 py-2 px-3">
                          <div className="flex">
                            <button 
                            onClick={deleteFoto}
                            name={`${file.name}`}
                            className="delete ml-auto focus:outline-none hover:bg-sh-dark-blue hover:text-sh-phlox p-1 rounded-md">
                              <svg
                                className="pointer-events-none fill-current w-4 h-4 ml-auto"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  className="pointer-events-none"
                                  d="M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z"
                                />
                              </svg>
                            </button>
                          </div>
                        </section>
                      </article>
                    </li>
                  </>
                );
              })}
            </div>
          </div>
        </div>
        <div>
        <div
          className={
            successMg
              ? `bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3 w-full ${
                  alertHidden ? "" : "hidden"
                }`
              : `bg-red-500 text-white border-t border-b border-red-400 px-4 py-3 w-full ${
                  alertHidden ? "" : "hidden"
                }`
          }
          role="alert"
        >
          {successMg ? (
            <>
              {" "}
              <p className="font-bold">Informational message</p>
              <p className="text-sm">Jow shared successfully.</p>
            </>
          ) : (
            <>
              {" "}
              <p className="font-bold">Informational message</p>
              <p className="text-sm">There is something wrong.</p>
            </>
          )}
        </div>
          <button
            className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-3 rounded"
            type="submit"
          >
            Create job
          </button>
        </div>
      </section>
    </form>
  );
};
export default NewPostModal;
