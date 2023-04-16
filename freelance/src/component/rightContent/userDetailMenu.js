import { useContext, useEffect, useState } from "react";
import { ScriptsContext } from "../../context/ScriptsContext";
import { useParams } from "react-router-dom";
import axios from "axios";

const UserDetailMenu = () => {
  const { openModal, changeModal, setModalNameW } = useContext(ScriptsContext);
  const id = useParams().id;
  const [userByID, setUserByID] = useState([]);
  const getUserByID = async () => {
    const response = await axios.get(`userProfile/${id}`);
    setUserByID(response.data);
  };
  useEffect(()=>{getUserByID()}, [])
  return (
    <>
      <div id="usersInfo">
        <div className="flex flex-col items-center justify-center w-full pt-20">
          <img src="/images/profil.jpg" className="h-20 w-20 rounded-full" alt="Profile Foto"/>
          <h3 className="mt-3 text-xl text-sh-phlox font-bold capitalize dark:text-blue-200">
            {userByID?.name}
          </h3>
        </div>
        <div className="flex flex-col justify-center w-full px-10 pt-8">
          <div className="flex flex-row justify-start items-center space-x-1">
            <svg
              fill="none"
              className="w-8 h-8 text-sh-phlox"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"
              ></path>
            </svg>
            <p className="text-sh-skin left-0">Jobs - {userByID.job_cound}</p>
          </div>
          <div className="my-2 text-sh-phlox flex dark:text-blue-100 mx-1">
            <i className="fa fa-globe text-2xl pr-2" aria-hidden="true"></i>
            <p className="text-sh-skin">{userByID.locations ? userByID.locations : "Location"}</p>
          </div>
          <div className="flex flex-row justify-start items-center space-x-1">
            <svg
              fill="none"
              className="w-8 h-8 text-sh-phlox"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"
              ></path>
            </svg>
            <p className="text-sh-skin left-0">Current Jobs - 5</p>
          </div>
        </div>
        <div className="flex justify-center pt-14">
          <button
            type="button"
            onClick={() => {
              changeModal("message");
              setModalNameW("login")
              openModal();
            }}
            className="inline-flex items-center text-white bg-gradient-to-br from-sh-phlox to-sh-dark-blue hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-bold rounded-lg text-lg px-10 py-1.5 text-center"
          >
            Message
            <svg
              aria-hidden="true"
              className="w-3 h-3 ml-2 mt-1 text-white"
              focusable="false"
              data-prefix="fas"
              data-icon="paper-plane"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M511.6 36.86l-64 415.1c-1.5 9.734-7.375 18.22-15.97 23.05c-4.844 2.719-10.27 4.097-15.68 4.097c-4.188 0-8.319-.8154-12.29-2.472l-122.6-51.1l-50.86 76.29C226.3 508.5 219.8 512 212.8 512C201.3 512 192 502.7 192 491.2v-96.18c0-7.115 2.372-14.03 6.742-19.64L416 96l-293.7 264.3L19.69 317.5C8.438 312.8 .8125 302.2 .0625 289.1s5.469-23.72 16.06-29.77l448-255.1c10.69-6.109 23.88-5.547 34 1.406S513.5 24.72 511.6 36.86z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};
export default UserDetailMenu;
