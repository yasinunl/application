import { useContext } from "react";
import { ApiContext } from "../../context/ApiContext";
import { Link } from "react-router-dom";
import { ScriptsContext } from "../../context/ScriptsContext";
import { OpenHideMenus } from "../../context/openHideMenus";

const FreelancerMenu = () => {
  const { userInfo } = useContext(ApiContext);
  const { searchBar } = useContext(ScriptsContext);
  const {openHide} = useContext(OpenHideMenus)
  return (
    <div>
      {userInfo?.map((user, i) => {
            if (
              searchBar.replace(/\s+/g, ' ').length > 2
            ) {
              const searchList = searchBar.toLowerCase().replace(/\s+/g, ' ').substr(1, searchBar.length - 1).split(" ");
              let sControl = true
              for (const textS of searchList){
                if ((user.description.toLowerCase().includes(textS) ||
                user.job.toLowerCase().includes(textS) ||
                user.name
                  .toLowerCase()
                  .includes(textS)) && sControl && textS !== ""){
                    sControl = false ;
                    return (
                      <Link key={i} to={`/user/${user.id}`}>
                        <div className="flex flex-row py-5 pr-3 hover:bg-sh-dark-blue/20 rounded-r-lg">
                          <div className="flex items-center group hover:cursor-pointer">
                            <div className="basis-1/4">
                              <img src="/images/logob.png" className="h-full" alt="Profil Foto"/>
                            </div>
                            <div className="pl-2 basis-3/4 text-sh-linen lg:text-sh-dark-blue">
                              <div className="flex justify-between items-center pb-1">
                                <p className="text-sm font-semibold capitalize">
                                  {user.job}
                                </p>
                                <p className="text-xs font-semibold capitalize">
                                  {user.name}
                                </p>
                              </div>
      
                              <p className="text-xs font-thin">
                                {user.description.slice(0, 110) + "..."}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                }
              }
            }else{
              return (
                <Link key={i} to={`/user/${user.id}`}>
                  <div className="flex flex-row py-5 pr-3 hover:bg-sh-dark-blue/20 rounded-r-lg">
                    <div className="flex items-center group hover:cursor-pointer">
                      <div className="basis-1/4">
                        <img src="/images/logob.png" className="h-full" alt="Profil Foto"/>
                      </div>
                      <div className={`pl-2 basis-3/4 text-sh-linen lg:text-sh-dark-blue`}>
                        <div className="flex justify-between items-center pb-1">
                          <p className="text-sm font-semibold capitalize">
                            {user.job}
                          </p>
                          <p className="text-xs font-semibold capitalize">
                            {user.name}
                          </p>
                        </div>

                        <p className="text-xs font-thin">
                          {user.description.slice(0, 110) + "..."}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            }
          })}
      <button type="button" className="text-left w-full">
        <div className="flex flex-row py-5 pr-3 hover:bg-sh-dark-blue/20 rounded-r-lg">
          <div className="flex items-center group hover:cursor-pointer w-full">
            <div className="basis-1/4">
              <img src="/images/logob.png" className="h-full" alt="Profil Foto"/>
            </div>
            <div className="pl-2 basis-3/4 text-sh-linen lg:text-sh-dark-blue">
            <div className="flex justify-between items-center pb-1">
                <p className="text-sm font-semibold capitalize">Job Title</p>
                <p className="text-xs font-semibold capitalize">First-Last Name</p>
                </div>
              <p className="text-sm font-thin">Description</p>
            </div>
          </div>
        </div>
      </button>
      <button type="button" className="text-left">
        <div className="flex flex-row py-5 pr-3 hover:bg-sh-dark-blue/20 rounded-r-lg">
          <div className="flex items-center group hover:cursor-pointer">
            <div className="basis-1/4">
              <img src="/images/logob.png" className="h-full" alt="Profil Foto"/>
            </div>
            <div className="pl-2 basis-3/4 text-sh-linen lg:text-sh-dark-blue">
            <div className="flex justify-between items-center pb-1">
                <p className="text-sm font-semibold capitalize">Job Title</p>
                <p className="text-xs font-semibold capitalize">First-Last Name</p>
                </div>
              <p className="text-xs font-thin">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              </p>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
};
export default FreelancerMenu;
