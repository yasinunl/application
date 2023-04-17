import { useContext, useEffect, useRef, useState } from "react";
import { ScriptsContext } from "../../context/ScriptsContext";
import { ApiContext } from "../../context/ApiContext";
import axios from "axios";

const InboxModal = () => {
  const {inboxMessageID, openModal} = useContext(ScriptsContext)
  const {getInboxFocusedMessage} = useContext(ApiContext)
  const [message, setMessage] = useState({})
  const sendMessage = useRef()
  const [alertHidden, setAlertHidden] = useState(false)
  const [successMg, setSuccessMg] = useState(false)

  //e
  const handleSubmit = async(e)=>{
    e.preventDefault()
    const bodyFormData = new FormData();
    bodyFormData.append('description', sendMessage.current.value)
    bodyFormData.append("id", inboxMessageID)
    axios.post("/send/sendback", bodyFormData).then(()=>{
      setSuccessMg(true)
      setAlertHidden(true)
    })
    .catch((err)=> {
      console.log("some error occured")
      setSuccessMg(false)
      setAlertHidden(true)
    })
    setTimeout(()=> {openModal()}, 1000)
  }
  //
  const getMessage = async()=> {setMessage(await getInboxFocusedMessage(inboxMessageID))}
  useEffect(()=> {getMessage()}, [])
  useEffect(()=> {}, [successMg,alertHidden])
    return (
      <form className="inbox" onSubmit={handleSubmit}>
        <div className={`w-screen h-screen overflow-hidden absolute left-0 top-0 flex justify-center items-center  ${alertHidden ? '':"hidden"}`}
         style={{background: "rgba(0, 0, 0, 0.7)"}}>
          <div className={successMg ?
            `bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3 w-1/2 h-32 flex flex-col justify-center items-center`:
            `bg-red-500 text-white border-t border-b border-red-400 px-4 py-3 w-1/2 h-32 flex flex-col justify-center items-center`
          }>
          <p className="font-bold">Informational message</p>
          <p className="text-sm">There is something wrong.</p>
          </div>
        </div>
      <section
        className="px-4 flex flex-col bg-white rounded-r-3xl overflow-auto w-[350px] md:w-[500px] lg:w-[720px]"
      >
        <div className="flex justify-between items-center h-20 border-b-2 mb-8">
          <div className="flex space-x-4 items-center">
            <div className="h-12 w-12 rounded-full overflow-hidden">
              <img
                src={`${message && message.foto !== "" ? "http://127.0.0.1:5000/images/"+message.foto : "/images/usericon.png"}`}
                loading="lazy"
                className=" w-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <h3 className="font-semibold text-lg"><i className="font-thin">From - </i> {message ? message.name : "Name"}</h3>
              <p className="text-light text-gray-400">
                {message ? message.date : "Date"}
              </p>
            </div>
          </div>
        </div>
        <section>
          <h1 className="font-bold text-2xl">{message ? message.title : "Title"}</h1>
          <article className="mt-8 text-gray-500 leading-7 tracking-wider">
            <p>
              {message ? message.description : "Description"}
            </p>
          </article>
          <ul className="flex space-x-4 mt-12">
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
        <section className="mt-6 border rounded-xl bg-gray-50 mb-3">
          <textarea
            ref = {sendMessage}
            className="resize-none w-full bg-gray-50 p-2 rounded-xl outline-none"
            placeholder="Type your reply here..."
            rows="3"
          ></textarea>
          <div className="flex items-center justify-between p-2">
            <button className="h-6 w-6 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                />
              </svg>
            </button>
            <button className="bg-purple-600 text-white px-6 py-2 rounded-xl">
              Reply
            </button>
          </div>
        </section>
      </section>
    </form>
    )
}
export default InboxModal;