import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ScriptsContext } from "../../context/ScriptsContext";
import { ApiContext } from "../../context/ApiContext";

const JobDetail = ()=> {
  const [jobDetail, setJobDetail] = useState();
  const [fotoID, setFotoID] = useState(0);
  const [lastFotoID, setLastFotoID] = useState();
  const {changeModal, openModal} = useContext(ScriptsContext);
  const {setMessageID,
    setMessageName } = useContext(ApiContext);
    const getJobByID = async(id)=> {
        const response = await axios.get(`new_post/${id}`)
        setJobDetail(response.data.data)
        setLastFotoID(new Function("return " + response.data.data.files+ ";")().length - 1)
    }
    const {id} = useParams()

    const changeFoto = (fotoid) => {
        if (fotoID === 0 && fotoid < 0)setFotoID(lastFotoID)
        else if (fotoID === lastFotoID && fotoid > 0)setFotoID(0)
        else setFotoID((foto) => foto + fotoid)
    }

    useEffect(()=> {}, [lastFotoID])
    useEffect(()=>{getJobByID(id)}, [id])

    useEffect(()=>{
        getJobByID(id)
        setMessageName("job")
        setMessageID(id)
    }, [])
    return (
        <div className="flex  lg:basis-3/5 bg-sh-linen 
    md:rounded-t-large">
      <div className="flex flex-col pt-16 p-8 w-full">
        <div className="pt-12 px-12 relative h-96" style={{ background: "rgba(0,0,0,.5)", display: "flex" }}>
            <img id="jobFoto" src={`${jobDetail ? "http://127.0.0.1:5000/images/"+new Function("return " + jobDetail.files+ ";")()[fotoID] : null}`} className="duration-500 object-contain w-full h-80" alt=""/>
            <button onClick={()=>changeFoto(-1)}
             type="button" className="flex absolute top-5 left-10 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none" data-carousel-prev>
                <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                    <span className="hidden">Previous</span>
                </span>
            </button>
            <button onClick={()=> changeFoto(+1)}
            type="button" className="flex absolute top-5 right-10 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none" data-carousel-next>
                <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                    <span className="hidden">Next</span>
                </span>
            </button>
            <div id="jobFotoIndex" className="flex space-x-2 absolute bottom-8 left-96  duration-1000">
            {jobDetail ? new Function("return " + jobDetail.files+ ";")().map((_, i) => {
              if (i === fotoID) {return <div className=" w-3 h-3 lg:w-4 lg:h-4 rounded-full bg-sh-phlox" key={i}></div>}
              else {return<button key={i} className=" w-3 h-3 lg:w-4 lg:h-4 rounded-full bg-sh-dark-blue" onClick={()=>setFotoID(i)}></button>}
            }): null}
              </div>
        </div>
        <h2 className="mt-6 text-4xl text-gray-700 font-bold capitalize dark:text-blue-200">
          👋 {jobDetail ? jobDetail.title: "Title"}
        </h2>
        <p className="mt-8 mb-4 dark:bg-gray-800 dark:text-blue-200 text-justify">
          {jobDetail ? jobDetail.description: "Description"}
        </p>
        <h3 className="mt-6 text-4xl text-gray-700 font-bold capitalize dark:text-blue-200 underline">Contents</h3>
        <div className="mt-2">
          <div className="opacity-100 mt-10">
            <ol className="relative border-l border-gray-200 dark:border-gray-700">
                {jobDetail ? new Function("return " + jobDetail.steps+ ";")().map((step, i)=> (
                    <li className="mb-10 ml-6" key={i}><span
                    className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-8 ring-sh-linen dark:ring-gray-900 dark:bg-blue-900"><svg
                      xmlns="http://www.w3.org/2000/svg" className="text-sm font-medium m-1 items-center justify-center"
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"></path>
                    </svg></span>
                  <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                    {step[0]}
                       </h3>
                  <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                    {step[1]}
                  </p>
                </li>
                )): null}
              
            </ol>
          </div>
        </div>
        <div className="flex flex-col items-center mt-16">
          <div className="mb-8 text-sm text-gray-500 dark:text-gray-400"><a target="_blank" rel="noopener noreferrer"
              href="https://github.com/mdrathik/tailwind-nuxtjs-starter-blog"></a></div> 
              <button type="button"
            onClick={()=>{changeModal("message"); openModal();}} target="_blank"><img
              src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee"
              style={{height:"60px",width:"217px"}}/></button>
        </div>
      </div>
    </div>
    )
}
export default JobDetail;