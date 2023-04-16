import { useContext } from "react";
import { ScriptsContext } from "../../context/ScriptsContext";
import { Link } from "react-router-dom";
import { ApiContext } from "../../context/ApiContext";

const IndexPage = () => {
    const { openModal, setModalNameW } =
    useContext(ScriptsContext);
    const {success} = useContext(ApiContext)
  return (
    <div
      className="flex  lg:basis-3/5 bg-sh-dark-blue/50
      md:rounded-t-large"
    >
      <div className="pt-12 flex flex-col w-full">
      <section className="h-96 lg:h-128 group relative">
    <img src="/images/homepage.png" alt="Main Image" className="h-full w-full object-cover" />
    <div className="absolute bottom-0 w-full bg-gradient-to-b from-transparent to-black">
      <div className="container pl-10">
        <h1 className="text-4xl lg:text-xl w-1/3 text-sh-skin capitalize group-hover:mb-1 duration-500">
        Find the perfect freelance services for your business
        </h1>
        <p className="text-sh-phlox group-hover:mb-2 duration-500 text-sm lg:text-base w-3/4 lg:w-2/3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quas officia aut quidem? Numquam fuga quis
          repellendus ad beatae culpa?
        </p>
        <div className="flex space-x-8 opacity-0 group-hover:opacity-100 group-hover:mb-10 lg:group-hover:mb-10 duration-1000">
          <div className="flex space-x-2 items-center cursor-pointer">
            <Link to={"/freelancers"} className="text-sh-phlox uppercase lg:text-lg duration-500">Hire A Freelancer</Link>
            <div className="flex h-8 w-8 rounded-full text-center items-center justify-center text-sh-phlox">
              <i className="fas fa-play"></i>
            </div>
          </div>

          <div className="flex space-x-2 items-center cursor-pointer">
            {!success ? <button type="button" onClick={()=>{
                setModalNameW("login");
                openModal();
            }} className="text-sh-phlox uppercase lg:text-lg duration-500">Earn Money Freelancing</button> : 
            <Link to={"/jobs"} className="text-sh-phlox uppercase lg:text-lg duration-500">Earn Money Freelancing</Link>}
            <div className="flex h-8 w-8 rounded-full text-center items-center justify-center text-sh-phlox">
              <i className="fas fa-arrow-right"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
        <div className="">
        <section className="py-24 px-5 bg-sh-dark-blue/50 text-sh-skin">
    <div className="container px-10 lg:px-0">
      <h2><a href="#">Popular Posts</a></h2>
      <div className="grid grid-cols-6 gap-10">
        <div className="col-span-6 md:col-span-3 border">
          <div className="border-b p-4 flex items-center justify-between">
            <h3>ACCUSANTIUM DOLOREMQUE LAUDANT...</h3>
            <img src="./images/usericon.png" alt="" className="rounded-full w-10 h-10"/>
          </div>
          <p className="p-4 text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, consequatur
            temporibus dolorem nihil
            excepturi quos. Amet cupiditate aperiam temporibus perferendis?</p>
          <div className="border-t p-4 flex items-center justify-end space-x-4 font-bold font-gemunu text-xs">
            <p>ON DEC 17, 2022</p>
            <div className="flex items-center justify-center space-x-1">
              <i className="fa-regular fa-comment"></i>
              <p>12</p>
              <i className="fa-regular fa-heart"></i>
              <p>09</p>
            </div>
          </div>
        </div>

        <div className="col-span-6 md:col-span-3 border">
          <div className="border-b p-4 flex items-center justify-between">
            <h3>ACCUSANTIUM DOLOREMQUE LAUDANT...</h3>
            <img src="./images/usericon.png" alt="" className="rounded-full w-10 h-10"/>
          </div>
          <p className="p-4 text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, consequatur
            temporibus dolorem nihil
            excepturi quos. Amet cupiditate aperiam temporibus perferendis?</p>
          <div className="border-t p-4 flex items-center justify-end space-x-4 font-bold font-gemunu text-xs">
            <p>ON DEC 17, 2022</p>
            <div className="flex items-center justify-center space-x-1">
              <i className="fa-regular fa-comment"></i>
              <p>12</p>
              <i className="fa-regular fa-heart"></i>
              <p>09</p>
            </div>
          </div>
        </div>
        <div className="col-span-6 md:col-span-3 lg:col-span-2 border">
          <div className="border-b p-4 flex items-center justify-between">
            <h3>ACCUSANTIUM DOLOREMQUE LAUDANT...</h3>
            <img src="./images/usericon.png" alt="" className="rounded-full w-10 h-10"/>
          </div>
          <p className="p-4 text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, consequatur
            temporibus dolorem nihil
            excepturi quos. Amet cupiditate aperiam temporibus perferendis?</p>
          <div className="border-t p-4 flex items-center justify-end space-x-4 font-bold font-gemunu text-xs">
            <p>ON DEC 17, 2022</p>
            <div className="flex items-center justify-center space-x-1">
              <i className="fa-regular fa-comment"></i>
              <p>12</p>
              <i className="fa-regular fa-heart"></i>
              <p>09</p>
            </div>
          </div>
        </div>
        <div className="col-span-6 md:col-span-3 lg:col-span-2 border">
          <div className="border-b p-4 flex items-center justify-between">
            <h3>ACCUSANTIUM DOLOREMQUE LAUDANT...</h3>
            <img src="./images/usericon.png" alt="" className="rounded-full w-10 h-10"/>
          </div>
          <p className="p-4 text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, consequatur
            temporibus dolorem nihil
            excepturi quos. Amet cupiditate aperiam temporibus perferendis?</p>
          <div className="border-t p-4 flex items-center justify-end space-x-4 font-bold font-gemunu text-xs">
            <p>ON DEC 17, 2022</p>
            <div className="flex items-center justify-center space-x-1">
              <i className="fa-regular fa-comment"></i>
              <p>12</p>
              <i className="fa-regular fa-heart"></i>
              <p>09</p>
            </div>
          </div>
        </div>
        <div className="hidden lg:block lg:col-span-2 border">
          <div className="border-b p-4 flex items-center justify-between">
            <h3>ACCUSANTIUM DOLOREMQUE LAUDANT...</h3>
            <img src="./images/usericon.png" alt="" className="rounded-full w-10 h-10"/>
          </div>
          <p className="p-4 text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, consequatur
            temporibus dolorem nihil
            excepturi quos. Amet cupiditate aperiam temporibus perferendis?</p>
          <div className="border-t p-4 flex items-center justify-end space-x-4 font-bold font-gemunu text-xs">
            <p>ON DEC 17, 2022</p>
            <div className="flex items-center justify-center space-x-1">
              <i className="fa-regular fa-comment"></i>
              <p>12</p>
              <i className="fa-regular fa-heart"></i>
              <p>09</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <footer className=" bg-sh-dark-blue/50 text-sh-phlox px-5">
    <div className="container flex flex-col md:flex-row px-10 lg:px-0 pb-8">
      <div className="basis-1/3">
        <Link to={"/"} className="text-2xl lg:text-3xl font-bold text-transparent bg-gradient-to-r bg-clip-text from-sh-green to-sh-phlox/70">UNL</Link>
        <p className="text-sm mt-2">2022 YasinUNL No © COPYRIGHT</p>
      </div>
      <div className="basis-1/3">
        <h2 className="mb-2 underline">LINKS</h2>
        <div className="grid grid-cols-5 gap-2 uppercase">
          <Link to={"/"} className="col-span-2 duration-500" href="#">Home Page</Link>
          {!success ? <button type="button" onClick={()=>{
                setModalNameW("signup");
                openModal();
            }} className="col-span-2 duration-500">Sign UP</button> : ""}
          <Link to={"/"} className="col-span-2 duration-500" href="#">Jobs</Link>
          {!success ? <button type="button" onClick={()=>{
                setModalNameW("login");
                openModal();
            }} className="col-span-2 duration-500">Log IN</button> : ""}
          <Link to={"/"} className="col-span-2 duration-500" href="#">Freelancers</Link>
        </div>
      </div>
      <div className="basis-1/3">
        <h2 className="mb-2">FOLLOW US</h2>
        <form action="" className="flex">
          <input className="py-1 px-2 bg-transparent border  placeholder:text-xs outline-none" placeholder="TYPE YOUR EMAIL" type="text"/>
          <button className="py-1 px-2 bg-transparent border font-gemunu uppercase" type="button">Subscribe</button>
        </form>
      </div>
    </div>
  </footer>
        </div>
      </div>
    </div>
  );
};
export default IndexPage;
