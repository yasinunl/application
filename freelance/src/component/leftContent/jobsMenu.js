import { useContext } from "react";
import { ApiContext } from "../../context/ApiContext";
import { Link } from "react-router-dom";
import { ScriptsContext } from "../../context/ScriptsContext";

const JobsMenu = () => {
  const { allJobs } = useContext(ApiContext);
  const { searchBar } = useContext(ScriptsContext);
  return (
    <div>
      {allJobs?.map((job, i) => {
            if (
              searchBar.replace(/\s+/g, ' ').length > 2
            ) {
              const searchList = searchBar.toLowerCase().replace(/\s+/g, ' ').substr(1, searchBar.length - 1).split(" ");
              let sControl = true
              for (const textS of searchList){
                if ((job.description.toLowerCase().includes(textS) ||
                job.title.toLowerCase().includes(textS) ||
                job.payment_method
                  .split("'")[1]
                  .toLowerCase()
                  .includes(textS)) && sControl && textS !== ""){
                    sControl = false ;
                    return (
                      <Link key={i} to={`/job/${job.id}`} >
                        <div className="flex flex-row py-5 pr-3 hover:bg-sh-dark-blue/20 rounded-r-lg">
                          <div className="flex items-center group hover:cursor-pointer">
                            <div className="basis-1/4">
                              <img src="/images/logob.png" className="h-full" alt="Job Foto"/>
                            </div>
                            <div className="pl-2 basis-3/4 text-sh-phlox">
                              <div className="flex justify-between items-center pb-1">
                                <p className="text-sm font-semibold capitalize">
                                  {job.title}
                                </p>
                                <p className="text-xs font-semibold capitalize">
                                  {job.payment_method.split("'")[3] +
                                    job.payment_method.split("'")[1]}
                                </p>
                              </div>
      
                              <p className="text-xs font-thin">
                                {job.description.slice(0, 110) + "..."}
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
                <Link key={i} to={`/job/${job.id}`}>
                  <div className="flex flex-row py-5 pr-3 hover:bg-sh-dark-blue/20 rounded-r-lg">
                    <div className="flex items-center group hover:cursor-pointer">
                      <div className="basis-1/4">
                        <img src="/images/logob.png" className="h-full" alt="Job Foto"/>
                      </div>
                      <div className="pl-2 basis-3/4 text-sh-phlox">
                        <div className="flex justify-between items-center pb-1">
                          <p className="text-sm font-semibold capitalize">
                            {job.title}
                          </p>
                          <p className="text-xs font-semibold capitalize">
                            {job.payment_method.split("'")[3] +
                              job.payment_method.split("'")[1]}
                          </p>
                        </div>

                        <p className="text-xs font-thin">
                          {job.description.slice(0, 110) + "..."}
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
              <img src="/images/logob.png" className="h-full" alt="Job Foto"/>
            </div>
            <div className="pl-2 basis-3/4 text-sh-phlox">
              <div className="flex justify-between items-center pb-1">
                <p className="text-sm font-semibold capitalize">Job Title</p>
                <p className="text-xs font-semibold capitalize">Payment</p>
              </div>

              <p className="text-xs font-thin">
                Lorem ipsum dolor sit ame
              </p>
            </div>
          </div>
        </div>
      </button>
      <button type="button" className="text-left">
        <div className="flex flex-row py-5 pr-3 hover:bg-sh-dark-blue/20 rounded-r-lg">
          <div className="flex items-center group hover:cursor-pointer">
            <div className="basis-1/4">
              <img src="/images/logob.png" className="h-full" alt="Job Foto"/>
            </div>
            <div className="pl-2 basis-3/4 text-sh-phlox">
              <div className="flex justify-between items-center pb-1">
                <p className="text-sm font-semibold capitalize">Job Title</p>
                <p className="text-xs font-semibold capitalize">Payment</p>
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
export default JobsMenu;
