import { useContext, useEffect, useRef, useState } from "react";
import { ApiContext } from "../../context/ApiContext";
import { ScriptsContext } from "../../context/ScriptsContext";
import { Link } from "react-router-dom";
import { OpenHideMenus } from "../../context/openHideMenus";

const HeaderContent = () => {
  const { rightMenuChange, openModal, setModalNameW } =
    useContext(ScriptsContext);
  const { success, userDetail } = useContext(ApiContext);
  const { changeOpenHide, changeOpenHideR } = useContext(OpenHideMenus);
  const [windowSize, setWindowSize] = useState([window.innerWidth]);
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth]);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  return (
    <header
      className="backdrop-blur-2xl backdrop-brightness-50  bg-sh-dark-blue/30 text-sh-linen sticky top-0 z-50 
  uppercase px-0 xl:px-8 lg:px-8 md:pr-8 border-sh-dark-blue/20"
      style={{ borderWidth: "1px" }}
    >
      <div className="flex flex-row items-center justify-between space-x-4 xl:space-x-16 h-14">
        <div className="basis-1/5">
          {windowSize[0] >= 1024 ? (
             <Link to={"/"} className="text-2xl lg:text-3xl font-bold text-transparent bg-gradient-to-r bg-clip-text from-sh-green to-sh-phlox/70">UNL</Link>
          ) : (
            <label className="cursor-pointer pl-5" onClick={changeOpenHide}>
              <i className="fa fa-search"></i>
            </label>
          )}
        </div>
        <nav className="flex flex-row basis-3/5 justify-between flex-1 ">
          <div className="flex items-center text-md space-x-3 xl:space-x-8">
            <Link
              to="/"
              className="text-sh-linen hover:text-sh-phlox transition duration-500"
            >
              Home Page
            </Link>
            <Link
              to="/freelancers"
              className="text-sh-linen hover:text-sh-phlox transition duration-500"
            >
              Freelancer
            </Link>
            <Link
              to="/jobs"
              className="text-sh-linen hover:text-sh-phlox transition duration-500"
            >
              Jobs
            </Link>
          </div>
          {/* If someone log in or log out  */}
          {success ? (
            <div className="flex flex-row basis-1/5 items-center lg:space-x-3 ">
              <li className="group/item relative flex items-center justify-between rounded-xl p-4 group">
                {windowSize[0] >= 1024 ? (
                  <div className="flex items-center gap-2">
                    <button
                      className="text-sm font-semibold whitespace-nowrap group-hover:text-sh-phlox duration-500 uppercase"
                      onClick={() => rightMenuChange()}
                    >
                      <span
                        className="rounded-xl absolute inset-0"
                        aria-hidden="true"
                      ></span>
                      {`${userDetail.firstname} ${userDetail.lastname}`}
                    </button>
                    <div className="flex-shrink-0">
                      <img
                        className="h-8 w-8 rounded-full"
                        src="/images/usericon.png"
                        alt=""
                      />
                    </div>
                    <div className="flex-shrink-0">
                      <i className="fa fa-angle-down group-hover:text-sh-phlox duration-500"></i>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      className="text-sm font-semibold whitespace-nowrap group-hover:text-sh-phlox duration-500 uppercase"
                      onClick={() => changeOpenHideR()}
                    >
                      <span
                        className="rounded-xl absolute inset-0"
                        aria-hidden="true"
                      ></span>
                      {`${userDetail.firstname} ${userDetail.lastname}`}
                    </button>
                    <div className="flex-shrink-0">
                      <img
                        className="h-8 w-8 rounded-full"
                        src="/images/usericon.png"
                        alt=""
                      />
                    </div>
                    <div className="flex-shrink-0">
                      <i className="fa fa-angle-down group-hover:text-sh-phlox duration-500"></i>
                    </div>
                  </div>
                )}
              </li>
            </div>
          ) : (
              <div className="flex flex-row  items-center space-x-4 lg:space-x-8 lg:text-lg">
                <button
                  onClick={() => {
                    setModalNameW("login");
                    openModal();
                  }}
                  className="hover:text-sh-phlox hidden lg:flex"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setModalNameW("signup");
                    openModal();
                  }}
                  className="hidden lg:flex
                  bg-sh-phlox/80 px-3 py-1 hover:bg-sh-phlox hover:text-gega-grey cursor-pointer transition duration-500 whitespace-nowrap rounded-sm"
                >
                  Sign Up
                </button>
                <button
                className="lg:hidden text-sm font-semibold whitespace-nowrap group-hover:text-sh-phlox duration-500 uppercase"
                onClick={() => changeOpenHideR()}
              >
                <div className="flex flex-col space-y-1">
                  <div className="w-5 h-1 bg-sh-skin"></div>
                  <div className="w-5 h-1 bg-sh-skin"></div>
                  <div className="w-5 h-1 bg-sh-skin"></div>
                </div>
              </button>
              </div>
          )}
        </nav>
      </div>
    </header>
  );
};
export default HeaderContent;
