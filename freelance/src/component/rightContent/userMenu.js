import axios from "axios";
import { useContext } from "react";
import { ApiContext } from "../../context/ApiContext";
import { ScriptsContext } from "../../context/ScriptsContext";
import { Link } from "react-router-dom";
import { OpenHideMenus } from "../../context/openHideMenus";

const UserMenu = () => {
  const { openModal, changeModal, setInboxMessageID, setModalNameW } =
    useContext(ScriptsContext);
  const { setAccessToken, success, userInbox, userSendBox } =
    useContext(ApiContext);
  const {openHideR} = useContext(OpenHideMenus)
  //Dropdown
  const openHideDropdown = (dropdownName) => {
    const dropdown = document.getElementById(dropdownName);
    if (dropdown.className === "hidden") dropdown.classList.remove("hidden");
    else dropdown.className += "hidden";
  };
  ////////////////////////////////////////////////////////////////////////////
  // LogOut
  const logOut = async () => {
    localStorage.removeItem("access_token");
    setAccessToken((e) => "");
  };
  ////////////////////////////////////////////////////////////////////////
  const seeTheMessage = async (id) => {
    axios.post(`inbox/see/${id}`, {});
  };
  ////////////////////////////////////////////////////////////////////////
  return (
    <div id="separator-sidebar" className={`lg:flex ${!openHideR ? "hidden" : ""}`}>
      <aside
        className="z-40 w-72 h-screen"
        aria-label="Sidebar"
      >
        <div className="h-full ml-4 py-4">
          {success ? (
            <ul className="space-y-2">
              <li>
                <Link
                  to="/profile"
                  className="w-full text-left flex items-center p-2 text-base font-normal text-sh-skin rounded-lg dark:text-white hover:bg-sh-phlox/50 dark:hover:bg-gray-700"
                >
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-6 h-6 text-sh-phlox transition duration-75 dark:text-gray-400 group-hover:text-sh-skin dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    ></path>
                  </svg>

                  <span className="ml-3">Profile</span>
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    changeModal("newPost");
                    openModal();
                  }}
                  className="w-full text-left flex items-center p-2 text-base font-normal text-sh-skin rounded-lg dark:text-white hover:bg-sh-phlox/50 dark:hover:bg-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="flex-shrink-0 w-6 h-6 text-sh-phlox transition duration-75 dark:text-gray-400 group-hover:text-sh-skin dark:group-hover:text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
                    />
                  </svg>

                  <span className="flex-1 ml-3 whitespace-nowrap">
                    Share New Job
                  </span>
                  <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-sh-phlox rounded-full dark:bg-gray-700 dark:text-gray-300">
                    New
                  </span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openHideDropdown("inbox")}
                  className="flex items-center w-full p-2 text-base font-normal text-sh-skin transition duration-75 rounded-lg group hover:bg-sh-phlox/50 dark:text-white dark:hover:bg-gray-700"
                >
                  <svg
                    className="flex-shrink-0 w-6 h-6 text-sh-phlox transition duration-75 group-hover:text-sh-skin dark:text-gray-400 dark:group-hover:text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H6.911a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z"
                    />
                  </svg>

                  <span
                    className="flex-1 ml-3 text-left whitespace-nowrap"
                    sidebar-toggle-item="true"
                  >
                    Inbox
                  </span>
                  <svg
                    sidebar-toggle-item="true"
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
                <div id="inbox" className="hidden">
                  <ul className="py-2 space-y-2">
                    {userInbox?.map((message, index) => (
                      <li key={index} className="bg-sh-phlox/5 rounded-sm">
                        <button
                          type="button"
                          onClick={() => {
                            seeTheMessage(message.id);
                            setInboxMessageID(message.id);
                            changeModal("inbox");
                            openModal();
                          }}
                          className={`flex items-center w-full p-2 text-base font-normal text-sh-skin transition duration-75 rounded-lg pl-11 group hover:bg-sh-phlox/50 ${
                            !message.seen ? "bg-sh-phlox/20" : ""
                          }`}
                        >
                          <div className="flex justify-between items-center w-full">
                            {message.from_user_name}
                            <div
                              className={`w-6 h-6 rounded-full bg-sh-dark-blue/50 text-sh-phlox
                          font-semibold text-xs flex items-center justify-center ${
                            message.seen ? "hidden" : ""
                          }`}
                            >
                              !
                            </div>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openHideDropdown("sendBox")}
                  className="flex items-center w-full p-2 text-base font-normal text-sh-skin transition duration-75 rounded-lg group hover:bg-sh-phlox/50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="flex-shrink-0 w-6 h-6 text-sh-phlox transition duration-75 group-hover:text-sh-skin dark:text-gray-400 dark:group-hover:text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                    />
                  </svg>

                  <span
                    className="flex-1 ml-3 text-left whitespace-nowrap"
                    sidebar-toggle-item="true"
                  >
                    Send Box
                  </span>
                  <svg
                    sidebar-toggle-item="true"
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
                <div id="sendBox" className="hidden">
                  <ul className="py-2 space-y-2">
                    {userSendBox?.map((message, index) => (
                      <li key={index} className="bg-sh-phlox/5 rounded-sm">
                        <button
                          type="button"
                          onClick={() => {
                            setInboxMessageID(message.id);
                            changeModal("sendBox");
                            openModal();
                          }}
                          className={`flex items-center w-full p-2 text-base font-normal text-sh-skin transition duration-75 rounded-lg pl-11 group hover:bg-sh-phlox/50`}
                        >
                          <div className="flex justify-between items-center w-full">
                            {message.from_user_name}
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
              <li>
                <Link
                  to='/jobs'
                  className="flex items-center p-2 text-base font-normal text-sh-skin rounded-lg dark:text-white hover:bg-sh-phlox/50 dark:hover:bg-gray-700"
                >
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-6 h-6 text-sh-phlox transition duration-75 dark:text-gray-400 group-hover:text-sh-skin dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="flex-1 ml-3 whitespace-nowrap">Jobs</span>
                </Link>
              </li>
              <li>
              <Link
                  to='/'
                  className="flex items-center p-2 text-base font-normal text-sh-skin rounded-lg dark:text-white hover:bg-sh-phlox/50 dark:hover:bg-gray-700"
                >
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-6 h-6 text-sh-phlox transition duration-75 dark:text-gray-400 group-hover:text-sh-skin dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="flex-1 ml-3 whitespace-nowrap">FreeLancers</span>
                </Link>
              </li>
              <li>
                <button
                  onClick={logOut}
                  href=""
                  className="flex items-center p-2 text-base font-normal text-sh-skin rounded-lg dark:text-white hover:bg-sh-phlox/50 dark:hover:bg-gray-700 w-full text-left"
                >
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-6 h-6 text-sh-phlox transition duration-75 dark:text-gray-400 group-hover:text-sh-skin dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="flex-1 ml-3 whitespace-nowrap">
                    Sign Out
                  </span>
                </button>
              </li>
            </ul>
          ) : (
            <ul className="space-y-2">
              <li>
                <button
                  onClick={()=>{
                    openModal()
                    setModalNameW("login")
                  }}
                  className="flex lg:hidden  items-center p-2 text-base font-normal text-sh-skin rounded-lg dark:text-white hover:bg-sh-phlox/50 dark:hover:bg-gray-700 w-full text-left"
                >
                  <svg
                    aria-hidden="true"
                    className="rotate-180 flex-shrink-0 w-6 h-6 text-sh-phlox transition duration-75 dark:text-gray-400 group-hover:text-sh-skin dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="flex-1 ml-3 whitespace-nowrap">
                    Log IN
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={()=>{
                    openModal()
                    setModalNameW("signup")
                  }}
                  className="flex lg:hidden items-center p-2 text-base font-normal text-sh-skin rounded-lg dark:text-white hover:bg-sh-phlox/50 dark:hover:bg-gray-700 w-full text-left"
                >
                  <svg
                    aria-hidden="true"
                    className="-rotate-90 flex-shrink-0 w-6 h-6 text-sh-phlox transition duration-75 dark:text-gray-400 group-hover:text-sh-skin dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="flex-1 ml-3 whitespace-nowrap">
                    Sign UP
                  </span>
                </button>
              </li>
            </ul>
          )}
          <ul className="pt-4 mt-4 space-y-2 border-t border-gray-200 dark:border-gray-700">
            <li>
              <button
                type="button"
                className="flex items-center p-2 text-base font-normal text-sh-skin transition duration-75 rounded-lg hover:bg-sh-phlox/50 w-full text-left"
              >
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-5 h-5 text-sh-phlox transition duration-75 group-hover:text-sh-skin dark:group-hover:text-white dark:text-gray-400"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="gem"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M378.7 32H133.3L256 182.7L378.7 32zM512 192l-107.4-141.3L289.6 192H512zM107.4 50.67L0 192h222.4L107.4 50.67zM244.3 474.9C247.3 478.2 251.6 480 256 480s8.653-1.828 11.67-5.062L510.6 224H1.365L244.3 474.9z"
                  ></path>
                </svg>
                <span className="ml-4">Upgrade to Pro</span>
              </button>
            </li>
            <li>
              <button
                className="flex items-center p-2 text-base font-normal text-sh-skin transition duration-75 rounded-lg hover:bg-sh-phlox/50 w-full text-left"
              >
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-6 h-6 text-sh-phlox transition duration-75 dark:text-gray-400 group-hover:text-sh-skin dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                  <path
                    fillRule="evenodd"
                    d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="ml-3">Documentation</span>
              </button>
            </li>
            <li>
              <button
                className="flex items-center p-2 text-base font-normal text-sh-skin transition duration-75 rounded-lg hover:bg-sh-phlox/50 w-full text-left"
              >
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-6 h-6 text-sh-phlox transition duration-75 dark:text-gray-400 group-hover:text-sh-skin dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path>
                </svg>
                <span className="ml-3">Components</span>
              </button>
            </li>
            <li>
              <button
                className="flex items-center p-2 text-base font-normal text-sh-skin transition duration-75 rounded-lg hover:bg-sh-phlox/50 w-full text-left"
              >
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-6 h-6 text-sh-phlox transition duration-75 dark:text-gray-400 group-hover:text-sh-skin dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="ml-3">Help</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};
export default UserMenu;
