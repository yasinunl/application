import { useContext, useState } from "react";
import { ScriptsContext } from "../../context/ScriptsContext";
import { OpenHideMenus } from "../../context/openHideMenus";

const YourProfileMenu = ()=>{
  const {rightMenus, rightMenuChange} = useContext(ScriptsContext)
    const {openHideR} = useContext(OpenHideMenus)
    const [clickButton, setClickButton] = useState(false)
    const changeRightButtonsHover = ()=> {
      setClickButton(!clickButton)
    }
    return (
      <>
      <div
  className={`right-0 w-3/4 text-white fixed z-40  ease-in-out duration-300 ${
    openHideR ? "-translate-x-0 nm:translate-x-1/3 md:translate-x-1/2 " : "translate-x-full nm:translate-x-full"
  }`}
>
<div className="flex lg:hidden relative transition-all duration-300">
        <div className="overscroll-none overflow-auto h-screen no-scrollbar fixed bg-sh-dark-blue w-full">
          {/* User Menu */}
          {/*userOtherMenu.menuItem*/}
          <div className="flex flex-row w-full justify-center items-center mt-2 sticky top-0">
                <button
                  onClick={() => {
                      changeRightButtonsHover()
                      rightMenuChange()}}
                  className={`border-b border-sh-phlox w-full text-left flex items-center p-2 text-base font-normal  rounded-lg ${clickButton ? " text-sh-linen " : "text-sh-phlox"}`}
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
                    {clickButton ? "Filters" : "User Menu"}
                  </span>
                </button>
              </div>
          {rightMenus[2]}
        </div>
      </div>
</div>
        <div className="hidden lg:basis-1/5 lg:flex">
        <div className="overscroll-none overflow-auto h-screen no-scrollbar fixed">
          {/* User Menu */}
          {/*userOtherMenu.menuItem*/}
          {rightMenus[0]}
        </div>
      </div></>
    )
}
export default YourProfileMenu;