import { useContext, useRef, useState } from "react";
import { ApiContext } from "../../context/ApiContext";
import { ScriptsContext } from "../../context/ScriptsContext";
import axios from "axios";

const MessageModal = () => {
  const {messageID,
    messageName,} = useContext(ApiContext)
  const {openModal} = useContext(ScriptsContext)
  const [successMg, setSuccessMg] = useState(false);
  const [alertHidden, setAlertHidden] = useState(false);
  const title = useRef();
  const description = useRef();
  const handleOnSubmit = async(e) => {
    e.preventDefault();
    const dataBody = new FormData();
    dataBody.append('title', title.current.value);
    dataBody.append('description', description.current.value);
    dataBody.append("messageID", messageID);
    dataBody.append("nameOfMessage", messageName);
    const response = await axios.post("send/add", dataBody, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      }
    }).catch((error)=>{
      console.log(error)
    })
    setSuccessMg(response.data.success);
    setAlertHidden(true);
    if (response.data.success) {
      setTimeout(()=> {
        openModal()
      }, 2000)
    }
  }
  return (
    <form className="message" onSubmit={handleOnSubmit}>
      <div
        className="editor w-10/12 flex flex-col max-w-2xl"
        style={{ width: "720px" }}
      >
        <div className="flex justify-between items-center h-20 border-b-2 mb-8">
          <div className="flex space-x-4 items-center">
            <div className="h-12 w-12 rounded-full overflow-hidden">
              <img
                src="/images/usericon.png"
                loading="lazy"
                className=" w-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <h3 className="font-semibold text-lg">Send Message</h3>
            </div>
          </div>
        </div>
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
        <input
          ref={title}
          className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none mt-5"
          spellCheck="false"
          placeholder="Title"
          type="text"
        />
        <textarea
          ref={description}
          className="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none"
          spellCheck="false"
          placeholder="Describe everything about this post here"
        ></textarea>

        <section>
          <ul className="flex space-x-4 mt-12 w-full">
            <li className="border rounded-lg p-1 cursor-pointer transition duration-200 text-indigo-600 hover:bg-blue-100">
              <button
                type="submit"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center focus:outline-none "
              >
                Send Message
                <svg
                  aria-hidden="true"
                  className="w-4 h-4 ml-2 -mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </li>
            <li className="w-10 h-10 border rounded-lg p-1 cursor-pointer transition duration-200 text-indigo-600 hover:bg-blue-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                />
              </svg>
            </li>
            <li className="w-10 h-10 border rounded-lg p-1 cursor-pointer transition duration-200 text-blue-800 hover:bg-blue-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
                />
              </svg>
            </li>
            <li className="w-10 h-10 border rounded-lg p-1 cursor-pointer transition duration-200 text-pink-400 hover:bg-blue-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
                />
              </svg>
            </li>
            <li className="w-10 h-10 border rounded-lg p-1 cursor-pointer transition duration-200 text-yellow-500 hover:bg-blue-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
                />
              </svg>
            </li>
          </ul>
        </section>
      </div>
    </form>
  );
};
export default MessageModal;
