import { useContext } from "react"
import { ApiContext } from "../../context/ApiContext"
import { Link } from "react-router-dom";

const JobsList = () => {
    const { allJobs } = useContext(ApiContext)
    const jobs = allJobs ?  allJobs.map((job, i) => {
        return (
            <div className="col-span-1 block bg-sh-green/20 rounded-md" key={i}>
    <div className="justify-between flex items-center py-4 px-5">
        <h4 className=" text-sh-dark-blue/80 text-xl font-bold capitalize">{job.payment_method.split("'")[3] + job.payment_method.split("'")[1]}</h4>
        <p className="text-sm text-sh-light-blue/80 font-bold">{job.date}</p>
    </div>
    <div className="justify-start space-x-3 flex items-center py-4 px-5">
        <p className="text-xs font-semibold text-sh-phlox border border-sh-phlox p-2 rounded-full bg-sh-phlox/20">asd</p>
        <p className="text-xs font-semibold text-sh-phlox border border-sh-phlox p-2 rounded-full bg-sh-phlox/20">asd</p>
    </div>
    <h2 className="text-xl capitalize m-5 font-bold text-sh-dark-blue"> {job.title} </h2>
    <p className="p-4 text-sm">{job.description ? job.description.slice(0,300) + "...": null}</p>
    <div className="flex justify-between items-center py-4 px-5">
    <div className="flex justify-start space-x-3 items-center ">
        <button type="button" className="inline-flex items-center text-white bg-gradient-to-br from-sh-phlox to-sh-green hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-thin rounded-lg text-sm px-2 py-1.5 text-center">
            Apply Now..
            <svg aria-hidden="true" className="w-3 h-3 ml-2 mt-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
        </button>
        <button type="button" /* onclick="openModal('message')" */ className="inline-flex items-center text-white bg-gradient-to-br from-sh-phlox to-sh-green hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-thin rounded-lg text-sm px-2 py-1.5 text-center">
            Message
            <svg aria-hidden="true" className="w-3 h-3 ml-2 mt-1 text-white dark:text-blue-500" focusable="false" data-prefix="fas" data-icon="paper-plane" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M511.6 36.86l-64 415.1c-1.5 9.734-7.375 18.22-15.97 23.05c-4.844 2.719-10.27 4.097-15.68 4.097c-4.188 0-8.319-.8154-12.29-2.472l-122.6-51.1l-50.86 76.29C226.3 508.5 219.8 512 212.8 512C201.3 512 192 502.7 192 491.2v-96.18c0-7.115 2.372-14.03 6.742-19.64L416 96l-293.7 264.3L19.69 317.5C8.438 312.8 .8125 302.2 .0625 289.1s5.469-23.72 16.06-29.77l448-255.1c10.69-6.109 23.88-5.547 34 1.406S513.5 24.72 511.6 36.86z"></path></svg>
        </button>
        
    </div>
    <Link to={`/job/${job.id}`} className="text-white bg-sh-phlox hover:bg-sh-phlox/80 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
    <svg aria-hidden="true" className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
        <span className="sr-only">Icon description</span>
    </Link>
</div>
</div>
        )
    }) :null;
        return (
            <div className="flex  lg:basis-3/5 bg-sh-linen 
    md:rounded-t-large">
      <div className="grid md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 p-24 w-full gap-10">
        {
           jobs
        }
        
      </div>
    </div>
        )
}
export default JobsList