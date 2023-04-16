import { useContext } from "react";
import { ScriptsContext } from "../../context/ScriptsContext";
import { OpenHideMenus } from "../../context/openHideMenus";

const LeftContent = ()=>{
  const {leftMenuChange, menuName, jobFreelanceMenu, setSeachBar, clickButton, changeLeftButtonsHover} = useContext(ScriptsContext)
  const {openHide,
    changeOpenHide} = useContext(OpenHideMenus)
    //Left Menu Change
    return (<>
    <div
  className={`w-9/12 md:w-1/2 text-white fixed z-40  ease-in-out duration-300 ${
    openHide ? "-translate-x-full": "translate-x-0"
  }`}
>
<div className="flex lg:hidden relative transition-all duration-300">
            <div
              className="overscroll-none overflow-auto h-screen no-scrollbar fixed bg-sh-dark-blue w-full md:px-5"
            >
              <div className="group w-full pt-4 sticky top-0 z-40">
                <label className="relative block">
                  <input
                    onChange={(e)=>setSeachBar(e.target.value)}
                    type="text"
                    placeholder="Search..."
                    className="w-full bg-transparent focus:outline-none
                  border-b-2 border-sh-linen text-sh-linen
                  text-lg px-4 placeholder:font-bold 
                  placeholder:text-sh-linen placeholder:text-lg
                  placeholder:font-serif"
                  />

                  <span className="absolute inset-y-0 right-0 flex items-center pl-2 text-sh-phlox">
                    <i className="fa fa-search"></i>
                  </span>
                </label>
              </div>
              <div className="flex flex-row w-full justify-center items-center mt-2 sticky top-12">
                <button
                  onClick={() => {
                    if (!clickButton){
                      changeLeftButtonsHover()
                    }
                    leftMenuChange("freelance")}}
                  className={`border-b border-sh-phlox w-full text-left flex items-center p-2 text-base font-normal  rounded-lg hover:bg-sh-phlox/50 ${clickButton ? " text-sh-linen " : "text-sh-phlox"}`}
                >
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-6 h-6 transition duration-75 group-hover:text-sh-skin "
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                  </svg>
                  <span className="flex-1 ml-3 whitespace-nowrap">
                    Freelancers
                  </span>
                </button>
                <div
                  className="bg-sh-phlox h-8 w-2"
                  style={{ width: "1px" }}
                ></div>
                <button
                  onClick={() => {
                    if (clickButton){
                      changeLeftButtonsHover()
                    }
                    leftMenuChange("jobs")}}
                  className={`border-b border-sh-phlox w-full text-left flex items-center p-2 text-base font-normal rounded-lg hover:bg-sh-phlox/50 ${!clickButton ? " text-sh-linen " : "text-sh-phlox"}`}
                >
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-6 h-6 transition duration-75 group-hover:text-sh-skin"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                  </svg>
                  <span className="flex-1 ml-3 whitespace-nowrap">
                    Last Jobs
                  </span>
                </button>
              </div>
              {/* Freelancer - Jobs Content */}
              {jobFreelanceMenu[menuName]}
            </div>
          </div>
</div>
        <div className="hidden lg:flex lg:basis-1/5">
            <div
              className="overscroll-none overflow-auto h-screen no-scrollbar fixed w-1/5"
            >
              <div className="group w-full pt-4 sticky top-0 z-40">
                <label className="relative block">
                  <input
                    onChange={(e)=>setSeachBar(e.target.value)}
                    type="text"
                    placeholder="Search..."
                    className="w-full bg-transparent focus:outline-none
                  border-b-2 border-sh-dark-blue text-sh-dark-blue
                  text-lg px-4 placeholder:font-bold 
                  placeholder:text-sh-dark-blue placeholder:text-lg
                  placeholder:font-serif"
                  />

                  <span className="absolute inset-y-0 right-0 flex items-center pl-2">
                    <i className="fa fa-search"></i>
                  </span>
                </label>
              </div>
              <div className="flex flex-row w-full justify-center items-center mt-2 sticky top-12">
                <button
                  onClick={() => {
                    if (!clickButton){
                      changeLeftButtonsHover()
                    }
                    leftMenuChange("freelance")}}
                  className={`border-b border-sh-phlox w-full text-left flex items-center p-2 text-base font-normal  rounded-lg text-sh-dark-blue hover:bg-sh-phlox/50`}
                >
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-6 h-6 transition duration-75 group-hover:text-sh-skin "
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                  </svg>
                  <span className="flex-1 ml-3 whitespace-nowrap">
                    Freelancers
                  </span>
                </button>
                <div
                  className="bg-sh-phlox h-8 w-2"
                  style={{ width: "1px" }}
                ></div>
                <button
                  onClick={() => {
                    if (clickButton){
                      changeLeftButtonsHover()
                    }
                    leftMenuChange("jobs")}}
                  className={`border-b border-sh-phlox w-full text-left flex items-center p-2 text-base font-normal rounded-lg hover:bg-sh-phlox/50 text-sh-phlox`}
                >
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-6 h-6 transition duration-75 group-hover:text-sh-skin"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                  </svg>
                  <span className="flex-1 ml-3 whitespace-nowrap">
                    Last Jobs
                  </span>
                </button>
              </div>
              {/* Freelancer - Jobs Content */}
              {jobFreelanceMenu[menuName]}
            </div>
          </div>
          </>
    )
}
export default LeftContent;