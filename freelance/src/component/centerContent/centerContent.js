import { useContext, useEffect, useRef, useState } from "react";
import { ScriptsContext } from "../../context/ScriptsContext";
import { ApiContext } from "../../context/ApiContext";
import axios from "axios";

const CenterContent = () => {
  const [successMg, setSuccessMg] = useState(false);
  const [alertHidden, setAlertHidden] = useState(false);
  const [editButton, setEditButton] = useState(false);
  const { changeModal, openModal } = useContext(ScriptsContext);
  const { userAllDetails, success } = useContext(ApiContext);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [location, setLocation] = useState();
  const [github, setGithub] = useState();
  const [job, setJob] = useState();
  const [foto, setFoto] = useState();

  const onChangeButton = () => {
    const bodyFormData = new FormData();
    bodyFormData.append("title", title);
    bodyFormData.append("description", description);
    bodyFormData.append("locations", location);
    bodyFormData.append("github", github);
    bodyFormData.append("job", job);
    bodyFormData.append("image", foto);
    axios.post("userProfile/update_profile", bodyFormData, {
      headers:{
        Authorization: "Bearer " + localStorage.getItem("access_token")
      }
    }).then((response) => {
      setSuccessMg(true)
      setAlertHidden(true)
    }).catch((error) => {
      setSuccessMg(false)
      setAlertHidden(true)
    })
    
    setTimeout(()=> {
      setAlertHidden(false);
      setEditButton(false)
    }, 2000)
  };/////////////////////////////////////
  const onCancelButton = () => {
    setFoto(null)
    setEditButton(false)
    setTitle(userAllDetails.title ? userAllDetails.title : "");
    setDescription(
      userAllDetails.description ? userAllDetails.description : ""
    );
    setLocation(userAllDetails.locations ? userAllDetails.locations : "");
    setGithub(userAllDetails.github ? userAllDetails.github : "");
    setJob(userAllDetails.job ? userAllDetails.job : "");
  }

  ////////////////////////////////////////////
  useEffect(() => {
    setTitle(userAllDetails.title ? userAllDetails.title : "");
    setDescription(
      userAllDetails.description ? userAllDetails.description : ""
    );
    setLocation(userAllDetails.locations ? userAllDetails.locations : "");
    setGithub(userAllDetails.github ? userAllDetails.github : "");
    setJob(userAllDetails.job ? userAllDetails.job : "");
  }, [userAllDetails]);
  return (
    <>
    <div className={`w-screen h-screen overflow-hidden z-50 absolute left-0 top-0 flex justify-center items-center  ${alertHidden ? '':"hidden"}`}
         style={{background: "rgba(0, 0, 0, 0.7)"}}>
          <div className={successMg ?
            `bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3 w-1/2 h-32 flex flex-col justify-center items-center`:
            `bg-red-500 text-white border-t border-b border-red-400 px-4 py-3 w-1/2 h-32 flex flex-col justify-center items-center`
          }>
          <p className="font-bold">Informational message</p>
          <p className="text-sm">There is something wrong.</p>
          </div>
        </div>
    <div
      className="flex flex-col md:flex-row lg:basis-3/5 bg-sh-linen 
      md:rounded-t-large"
    >
      <div className="flex md:basis-2/6 ">
        <div className="flex flex-col pl-10 lg:fixed lg:overscroll-none lg:overflow-auto lg:h-screen lg:no-scrollbar">
          <div className="pt-16">
            {!editButton ? (
              foto ? (
                userAllDetails.image !== foto.name ? (
                  <img
                    src={`${URL.createObjectURL(foto)}`}
                    className="rounded-full shadow-xl h-52 w-52"
                  />
                ) : (
                  <img
                    src={`http://127.0.0.1:5000/images/${userAllDetails.image}`}
                    className="rounded-full shadow-xl h-52 w-52"
                  />
                )
              ) : (
                userAllDetails.image ? (<img
                  src={`http://127.0.0.1:5000/images/${userAllDetails.image}`}
                  className="rounded-full shadow-xl h-52 w-52"
                />) : <img
                src={`/images/usericon.png`}
                className="rounded-full shadow-xl h-52 w-52"
              />
                
              )
            ) : (
              <label className="relative group cursor-pointer">
                {foto ? (
                  <img
                    src={`${URL.createObjectURL(foto)}`}
                    className="rounded-full shadow-xl h-52 w-52"
                  />
                ) : (
                  <img
                    src={`http://127.0.0.1:5000/images/${userAllDetails.image}`}
                    className="rounded-full shadow-xl h-52 w-52"
                  />
                )}

                <input
                  type="file"
                  className="hidden"
                  accept="image/png, image/jpeg"
                  onChange={(e) => setFoto(e.target.files[0])}
                />
                <svg
                  className="text-sh-dark-blue w-12 h-12 mx-auto absolute top-20 left-20 opacity-0 group-hover:opacity-100 duration-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              </label>
            )}
          </div>
          <div className="pt-4">
            <h4 className="text-2xl text-gray-800 font-bold">
              {userAllDetails.name ? userAllDetails.name : "Firstname Lastname"}
            </h4>
            <div className="md:text-lg text-gray-600 dark:text-blue-100">
              {!editButton ? (
                userAllDetails.job ? (
                  job
                ) : (
                  "Job"
                )
              ) : (
                <input
                  value={job}
                  className="border-2 p-2 border-sh-dark-blue"
                  onChange={(e) => setJob(e.target.value)}
                  type="text"
                  name="job"
                  placeholder="Job"
                />
              )}
            </div>
            <div className="my-2 text-gray-600 flex dark:text-blue-100">
              <i
                className="fa fa-envelope text-2xl pr-2"
                aria-hidden="true"
              ></i>{" "}
              <a href={userAllDetails.email ? userAllDetails.email : "#"}>
                {userAllDetails.email ? userAllDetails.email : "E-Mail"}
              </a>
            </div>
            <div className="my-2 text-gray-600 flex dark:text-blue-100">
              <i className="fa fa-globe text-2xl pr-2" aria-hidden="true"></i>
              <p>
                {!editButton ? (
                  userAllDetails.locations ? (
                    location
                  ) : (
                    "Location"
                  )
                ) : (
                  <input
                    value={location}
                    className="border-2 p-2 border-sh-dark-blue"
                    onChange={(e) => setLocation(e.target.value)}
                    type="text"
                    name="Location"
                    placeholder="Location"
                  />
                )}
              </p>
            </div>
            <div className="my-2 text-gray-600 flex dark:text-blue-200">
              <i className="fa-brands fa-github text-2xl pr-2"></i>
              <a href={userAllDetails.github ? github : "#"}>
                {!editButton ? (
                  userAllDetails.github ? (
                    userAllDetails.github.split("/").pop()
                  ) : (
                    "Github"
                  )
                ) : (
                  <input
                    value={github}
                    className="border-2 p-2 border-sh-dark-blue"
                    onChange={(e) => setGithub(e.target.value)}
                    type="text"
                    name="github"
                    placeholder="Github"
                  />
                )}
              </a>
            </div>
            <div className="my-2 text-gray-600 flex dark:text-blue-100">
              <i
                className="fa fa-calendar text-2xl pr-2"
                aria-hidden="true"
              ></i>{" "}
              02.11.1998
            </div>
          </div>
        </div>
      </div>
      <div className={` md:basis-4/6 pt-16`}>
        {success ? <div className="flex w-96 md:w-full relative">
          <button
            onClick={onChangeButton}
            className={`"flex p-2 bg-blue-500 rounded-lg absolute 
       hover:bg-blue-600 duration-500 text-white w-10 h-10 animation" ${
         !editButton
           ? "opacity-0 right-8  duration-1000"
           : "opacity-100 right-32 duration-1000"
       }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </button>
          <button
            onClick={onCancelButton}
            className={`"flex p-2 bg-red-500 rounded-lg absolute 
       hover:bg-red-600 duration-500 text-white w-10 h-10 animation duration-1000" ${
         !editButton ? "opacity-0 right-8 " : "opacity-100 right-20"
       }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <button
            onClick={() => setEditButton(() => !editButton)}
            className="flex p-2 bg-yellow-500 rounded-lg absolute right-8
       hover:bg-yellow-600 duration-500 text-white w-10 h-10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
        </div> : ""}
        
        <div className="flex flex-col p-8">
          {!editButton ? (
            <h2 className="mt-6 text-4xl text-gray-700 font-bold capitalize dark:text-blue-200">
              👋 {userAllDetails.title ? title : "Title"}
            </h2>
          ) : (
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mt-6 text-4xl text-gray-700 font-bold capitalize dark:text-blue-200 border-2 p-2 border-sh-dark-blue"
              type="text"
              name="title"
              placeholder="title"
            />
          )}
          <p className="mt-8 mb-4 dark:bg-gray-800 dark:text-blue-200 text-justify">
            {!editButton ? (
              userAllDetails.description ? (
                description
              ) : (
                "Description Area"
              )
            ) : (
              <textarea
                rows="8"
                value={description}
                className="border-2 p-2 border-sh-dark-blue w-full"
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                name="description"
                placeholder="Description Area"
              ></textarea>
            )}
          </p>
          <div className="mt-2">
            <h2 className="text-xl text-gray-700 font-bold dark:text-blue-200 capitalize">
              Frontend
            </h2>
            <ul className="flex flex-wrap gap-4 items-center">
              <li className="flex items-center">
                <svg viewBox="0 0 128 128" className="h-10 w-10">
                  <defs>
                    <linearGradient
                      id="a"
                      x1="76.079"
                      x2="523.48"
                      y1="10.798"
                      y2="365.95"
                      gradientTransform="translate(1.11 14.613) scale(.24566)"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#9013fe" offset="0"></stop>
                      <stop stopColor="#6610f2" offset="1"></stop>
                    </linearGradient>
                    <linearGradient
                      id="b"
                      x1="193.51"
                      x2="293.51"
                      y1="109.74"
                      y2="278.87"
                      gradientTransform="translate(0 52)"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#fff" offset="0"></stop>
                      <stop stopColor="#f1e5fc" offset="1"></stop>
                    </linearGradient>
                    <filter
                      id="c"
                      x="161.9"
                      y="135.46"
                      width="197"
                      height="249"
                      colorInterpolationFilters="sRGB"
                      filterUnits="userSpaceOnUse"
                    >
                      <feFlood
                        floodOpacity="0"
                        result="BackgroundImageFix"
                      ></feFlood>
                      <feColorMatrix
                        in="SourceAlpha"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      ></feColorMatrix>
                      <feOffset dy="4"></feOffset>
                      <feGaussianBlur stdDeviation="8"></feGaussianBlur>
                      <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"></feColorMatrix>
                      <feBlend
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow"
                      ></feBlend>
                      <feBlend
                        in="SourceGraphic"
                        in2="effect1_dropShadow"
                        result="shape"
                      ></feBlend>
                    </filter>
                  </defs>
                  <path
                    d="M14.985 27.712c-.237-6.815 5.072-13.099 12.249-13.099h73.54c7.177 0 12.486 6.284 12.249 13.099-.228 6.546.068 15.026 2.202 21.94 2.141 6.936 5.751 11.319 11.664 11.883v6.387c-5.913.564-9.523 4.947-11.664 11.883-2.134 6.914-2.43 15.394-2.202 21.94.237 6.815-5.072 13.098-12.249 13.098h-73.54c-7.177 0-12.486-6.284-12.249-13.098.228-6.546-.068-15.026-2.203-21.94-2.14-6.935-5.76-11.319-11.673-11.883v-6.387c5.913-.563 9.533-4.947 11.673-11.883 2.135-6.914 2.43-15.394 2.203-21.94z"
                    fill="url(#a)"
                  ></path>
                  <path
                    transform="translate(1.494 2.203) scale(.24566)"
                    d="M267.1 364.46c47.297 0 75.798-23.158 75.798-61.355 0-28.873-20.336-49.776-50.532-53.085v-1.203c22.185-3.609 39.594-24.211 39.594-47.219 0-32.783-25.882-54.138-65.322-54.138h-88.74v217zm-54.692-189.48h45.911c24.958 0 39.131 11.128 39.131 31.279 0 21.505-16.484 33.535-46.372 33.535h-38.67zm0 161.96v-71.431h45.602c32.661 0 49.608 12.03 49.608 35.49 0 23.459-16.484 35.941-47.605 35.941z"
                    fill="url(#b)"
                    filter="url(#c)"
                    stroke="#fff"
                  ></path>
                </svg>
              </li>
              <li className="flex items-center">
                <svg viewBox="0 0 50 50" className="mt-4 h-10 w-10">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M25.517 0C18.712 0 14.46 3.382 12.758 10.146c2.552-3.382 5.529-4.65 8.931-3.805 1.941.482 3.329 1.882 4.864 3.432 2.502 2.524 5.398 5.445 11.722 5.445 6.804 0 11.057-3.382 12.758-10.145-2.551 3.382-5.528 4.65-8.93 3.804-1.942-.482-3.33-1.882-4.865-3.431C34.736 2.92 31.841 0 25.517 0zM12.758 15.218C5.954 15.218 1.701 18.6 0 25.364c2.552-3.382 5.529-4.65 8.93-3.805 1.942.482 3.33 1.882 4.865 3.432 2.502 2.524 5.397 5.445 11.722 5.445 6.804 0 11.057-3.381 12.758-10.145-2.552 3.382-5.529 4.65-8.931 3.805-1.941-.483-3.329-1.883-4.864-3.432-2.502-2.524-5.398-5.446-11.722-5.446z"
                    fill="#38bdf8"
                  ></path>
                </svg>
              </li>
              <li className="flex items-center">
                <svg viewBox="0 0 128 128" className="h-10 w-10">
                  <path
                    fill="#F0DB4F"
                    d="M1.408 1.408h125.184v125.185H1.408z"
                  ></path>
                  <path
                    fill="#323330"
                    d="M116.347 96.736c-.917-5.711-4.641-10.508-15.672-14.981-3.832-1.761-8.104-3.022-9.377-5.926-.452-1.69-.512-2.642-.226-3.665.821-3.32 4.784-4.355 7.925-3.403 2.023.678 3.938 2.237 5.093 4.724 5.402-3.498 5.391-3.475 9.163-5.879-1.381-2.141-2.118-3.129-3.022-4.045-3.249-3.629-7.676-5.498-14.756-5.355l-3.688.477c-3.534.893-6.902 2.748-8.877 5.235-5.926 6.724-4.236 18.492 2.975 23.335 7.104 5.332 17.54 6.545 18.873 11.531 1.297 6.104-4.486 8.08-10.234 7.378-4.236-.881-6.592-3.034-9.139-6.949-4.688 2.713-4.688 2.713-9.508 5.485 1.143 2.499 2.344 3.63 4.26 5.795 9.068 9.198 31.76 8.746 35.83-5.176.165-.478 1.261-3.666.38-8.581zM69.462 58.943H57.753l-.048 30.272c0 6.438.333 12.34-.714 14.149-1.713 3.558-6.152 3.117-8.175 2.427-2.059-1.012-3.106-2.451-4.319-4.485-.333-.584-.583-1.036-.667-1.071l-9.52 5.83c1.583 3.249 3.915 6.069 6.902 7.901 4.462 2.678 10.459 3.499 16.731 2.059 4.082-1.189 7.604-3.652 9.448-7.401 2.666-4.915 2.094-10.864 2.07-17.444.06-10.735.001-21.468.001-32.237z"
                  ></path>
                </svg>
              </li>
              <li className="flex items-center">
                <svg viewBox="0 0 128 128" className="h-10 w-10">
                  <path
                    d="M0 8.934l49.854.158 14.167 24.47 14.432-24.47L128 8.935l-63.834 110.14zm126.98.637l-24.36.02-38.476 66.053L25.691 9.592.942 9.572l63.211 107.89zm-25.149-.008l-22.745.168-15.053 24.647L49.216 9.73l-22.794-.168 37.731 64.476zm-75.834-.17l23.002.009m-23.002-.01l23.002.01"
                    fill="none"
                  ></path>
                  <path
                    d="M25.997 9.393l23.002.009L64.035 34.36 79.018 9.404 102 9.398 64.15 75.053z"
                    fill="#35495e"
                  ></path>
                  <path
                    d="M.91 9.569l25.067-.172 38.15 65.659L101.98 9.401l25.11.026-62.966 108.06z"
                    fill="#41b883"
                  ></path>
                </svg>
              </li>
              <li className="flex items-center">
                <svg viewBox="0 0 128 128" className="h-10 w-10">
                  <path
                    d="M39.267 108.97l-.284-.567c-.567-1.135-.567-2.27-.283-3.689H8.059L53.454 24.14l19.009 34.33 6.241-4.54L59.695 19.6c-.283-.567-2.553-3.971-6.241-3.971-1.703 0-4.256.567-6.242 4.255L1.25 101.31c-.284.852-2.27 4.54-.568 7.66 1.135 1.703 2.838 3.405 6.81 3.405h38.585c-3.972 0-5.958-1.702-6.81-3.404z"
                    fill="#00c58e"
                  ></path>
                  <path
                    d="M126.65 101.59L89.767 35.201c-.567-.567-2.553-4.256-6.242-4.256-1.702 0-4.255.851-6.241 4.256l-4.823 7.944v15.321l11.065-19.009 36.599 65.254h-13.902a6.525 6.525 0 01-.568 3.972l-.284.284c-1.702 3.12-5.958 3.404-6.525 3.404h21.562c.851 0 4.823-.283 6.809-3.404.851-1.419 1.419-3.972-.567-7.377z"
                    fill="#108775"
                  ></path>
                  <path
                    d="M106.51 108.97v-.284l.284-.567c.283-1.135.567-2.27.283-3.405l-1.134-3.404-28.938-50.501-4.256-7.66h-.284l-4.256 7.66-28.938 50.5-1.134 3.405a6.81 6.81 0 00.567 4.256c1.135 1.702 2.837 3.405 6.809 3.405h53.906c.851 0 5.107-.284 7.093-3.405zM72.464 58.469l26.386 46.245H46.079z"
                    fill="#2f495e"
                  ></path>
                </svg>
              </li>
            </ul>
            <div className="mt-4">
              <h2 className="mb-2 text-xl text-gray-700 font-bold dark:text-blue-200 capitalize">
                Backend
              </h2>
              <ul className="mb-6 flex flex-wrap gap-4">
                <li className="flex items-center">
                  <svg viewBox="0 0 128 128" className="h-10 w-10">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      fill="#FD4F31"
                      d="M16.934 1.719c-1.127.088-2.234.074-3.325.373-2.387.655-4.508 1.702-6.379 3.316-1.1.948-2.06 1.97-2.875 3.174-1.258 1.859-2.115 3.857-2.545 6.106.172.301.353.617.545.938 1.219 2.038 2.439 4.062 3.661 6.098l3.212 5.341c.988 1.646 1.974 3.293 2.96 4.939l4.608 7.688 3.143 5.244c1.527 2.545 3.058 5.088 4.583 7.634l5.609 9.371c1.617 2.699 3.237 5.396 4.857 8.093l.216.314c.235.075.422.011.616-.035 2.134-.512 4.268-1.021 6.402-1.531 3.461-.827 6.922-1.651 10.383-2.479l5.421-1.297c3.499-.836 6.999-1.67 10.498-2.508 3.537-.846 7.073-1.696 10.611-2.543 1.788-.429 3.576-.856 5.365-1.283 3.461-.826 6.922-1.65 10.383-2.474l11.308-2.693.611-.165-.167-.331-3.086-4.362-3.048-4.315-3.26-4.604-3.116-4.413-3.088-4.361-3.188-4.507c-1.041-1.47-2.084-2.938-3.126-4.407l-1.647-2.326a4.275 4.275 0 01-.587-1.159c-.326-1.011.046-1.684.636-2.181.382-.323.822-.56 1.298-.7a20.898 20.898 0 012.01-.51c1.359-.257 2.727-.475 4.091-.702l4.624-.754c.975-.161 1.949-.33 2.924-.495 1.325-.224 2.65-.449 3.976-.67 1.287-.216 2.574-.43 3.861-.642l4.213-.689 2.924-.491c1.112-.186 2.223-.371 3.334-.553 1.386-.226 2.771-.454 4.157-.671.826-.129 1.652-.174 2.472.062a5.63 5.63 0 011.696.833l.721.503c.072-.166-.032-.256-.08-.351a16.543 16.543 0 00-4.26-5.422 16.399 16.399 0 00-5.636-3.09c-1.229-.389-2.492-.208-3.778-.305M55.689 127c-.062 0-.117-.45-.187-.569-1.5-2.56-3.016-5.308-4.498-7.877a1335.74 1335.74 0 01-5.557-9.74c-1.965-3.478-3.913-6.966-5.863-10.452a5709.989 5709.989 0 01-5.549-9.948c-1.115-2.005-2.223-4.014-3.337-6.02l-.296-.459-.542.107c-1.072.277-2.142.556-3.212.838-1.49.392-2.979.791-4.47 1.18-3.347.871-6.694 1.737-10.041 2.605-3.404.884-6.951 1.77-10.356 2.65-.207.053.219.071-.781.106v21.145c.412.656.373.347.399.563.079.626.207 1.257.317 1.877.412 2.31 1.339 4.425 2.679 6.351 1.965 2.826 4.582 4.846 7.788 6.082 1.145.44 2.34.75 3.562.9l1.241.328"
                    ></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      fill="#FD4F31"
                      d="M4.976 77.742c3.939-.937 7.879-1.873 11.818-2.808 1.73-.41 3.461-.815 5.191-1.227.865-.206 1.732-.402 2.59-.634.764-.206.858-.459.465-1.148-.568-.996-1.146-1.986-1.721-2.979l-5.064-8.72-5.062-8.721c-1.717-2.958-3.436-5.916-5.154-8.873l-4.412-7.59c-.636-1.094-1.408-2.191-2.047-3.284-.119-.199.42-.437-.58-.543v47.396c0-.032.453-.059.606-.096l3.37-.773zm121.248 33.878c-1.544.549-3.089 1.102-4.632 1.655l-10.545 3.781c-1.953.701-3.902 1.41-5.856 2.108-3.982 1.421-7.966 2.837-11.949 4.255-2.308.822-4.617 1.838-6.924 2.664-.632.227-1.255.917-1.881.917h26.49l.57-.327c.674-.029 1.337-.229 1.999-.35 2.719-.497 5.154-1.673 7.311-3.392 1.657-1.321 3.005-2.936 4.061-4.778 1.086-1.896 1.731-3.947 2.041-6.101.027-.186.085-.397-.071-.589-.22-.017-.414.086-.614.157zm-2.275-35.571c-1.168-1.598-2.339-3.193-3.505-4.792-1.609-2.207-3.215-4.416-4.822-6.624-.653-.896-1.315-1.785-1.952-2.691-.192-.273-.411-.346-.71-.265l-.171.049c-2.958.719-5.917 1.436-8.876 2.153l-5.302 1.287-10.372 2.519c-3.419.831-6.838 1.663-10.258 2.492l-10.662 2.582c-3.497.849-6.992 1.701-10.488 2.551l-10.142 2.462c-1.787.434-3.574.866-5.359 1.302-.263.064-.546.08-.826.292l.239.455a5999.968 5999.968 0 009.598 16.529c1.874 3.213 3.753 6.424 5.63 9.636 1.079 1.845 2.151 3.692 3.239 5.532a661.851 661.851 0 003.653 6.115c.369.607.788 1.187 1.21 1.759a3.64 3.64 0 001.046.957c.426.257.885.338 1.369.229.25-.057.495-.139.737-.223l.89-.33c3.237-1.107 6.473-2.214 9.711-3.317 2.526-.86 5.055-1.716 7.583-2.571 2.509-.851 5.02-1.698 7.53-2.545l7.474-2.524c2.548-.861 5.095-1.722 7.642-2.585 3.126-1.061 6.251-2.126 9.379-3.185 3.015-1.02 6.033-2.034 9.049-3.052.185-.062.389-.088.542-.291l.019-.439c.001-6.255-.001-12.511.006-18.766a1.38 1.38 0 00-.289-.873c-.948-1.269-1.877-2.551-2.812-3.828zm-.519-58.938c-.702-.889-1.596-1.171-2.692-.885-.477.125-.967.204-1.453.293-1.594.292-3.19.579-4.784.868-2.334.424-4.667.852-7.001 1.272-1.848.332-3.697.659-5.546.983l-7.418 1.298c-.311.054-.625.108-.925.204-.437.14-.563.414-.363.825.163.336.366.657.586.959 1.534 2.114 3.075 4.223 4.616 6.333 2.124 2.909 4.249 5.817 6.374 8.724 1.798 2.46 3.598 4.92 5.397 7.379 1.414 1.932 2.828 3.864 4.244 5.795l.279.338 12.271-3.033.029-.636c.001-8.511-.001-17.022.006-25.534 0-.376-.091-.678-.328-.976-1.032-1.303-2.045-2.621-3.066-3.933l-.226-.274zm3.301 41.241c-1.856.446-3.719.87-5.62 1.373.201.357 5.415 7.395 5.718 7.729l.19.105.021-.429.001-2.963c.001-1.719.005-3.438.001-5.157 0-.209.059-.434-.085-.646l-.226-.012z"
                    ></path>
                  </svg>
                </li>
                <li className="flex items-center">
                  <svg viewBox="0 0 128 128" className="h-10 w-10">
                    <path
                      fill="#83CD29"
                      d="M112.771 30.334L68.674 4.729c-2.781-1.584-6.402-1.584-9.205 0L14.901 30.334C12.031 31.985 10 35.088 10 38.407v51.142c0 3.319 2.084 6.423 4.954 8.083l11.775 6.688c5.628 2.772 7.617 2.772 10.178 2.772 8.333 0 13.093-5.039 13.093-13.828v-50.49c0-.713-.371-1.774-1.071-1.774h-5.623C42.594 41 41 42.061 41 42.773v50.49c0 3.896-3.524 7.773-10.11 4.48L18.723 90.73c-.424-.23-.723-.693-.723-1.181V38.407c0-.482.555-.966.982-1.213l44.424-25.561c.415-.235 1.025-.235 1.439 0l43.882 25.555c.42.253.272.722.272 1.219v51.142c0 .488.183.963-.232 1.198l-44.086 25.576c-.378.227-.847.227-1.261 0l-11.307-6.749c-.341-.198-.746-.269-1.073-.086-3.146 1.783-3.726 2.02-6.677 3.043-.726.253-1.797.692.41 1.929l14.798 8.754a9.294 9.294 0 004.647 1.246c1.642 0 3.25-.426 4.667-1.246l43.885-25.582c2.87-1.672 4.23-4.764 4.23-8.083V38.407c0-3.319-1.36-6.414-4.229-8.073zM77.91 81.445c-11.726 0-14.309-3.235-15.17-9.066-.1-.628-.633-1.379-1.272-1.379h-5.731c-.709 0-1.279.86-1.279 1.566 0 7.466 4.059 16.512 23.453 16.512 14.039 0 22.088-5.455 22.088-15.109 0-9.572-6.467-12.084-20.082-13.886-13.762-1.819-15.16-2.738-15.16-5.962 0-2.658 1.184-6.203 11.374-6.203 9.105 0 12.461 1.954 13.842 8.091.118.577.645.991 1.24.991h5.754c.354 0 .692-.143.94-.396.24-.272.367-.613.335-.979-.891-10.568-7.912-15.493-22.112-15.493-12.631 0-20.166 5.334-20.166 14.275 0 9.698 7.497 12.378 19.622 13.577 14.505 1.422 15.633 3.542 15.633 6.395 0 4.955-3.978 7.066-13.309 7.066z"
                    ></path>
                  </svg>
                </li>
              </ul>
            </div>
            <div className="opacity-100 mt-10">
              <ol className="relative border-l border-gray-200 dark:border-gray-700">
                <li className="mb-10 ml-6">
                  <span className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-8 ring-sh-linen dark:ring-gray-900 dark:bg-blue-900">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-sm font-medium m-1 items-center justify-center"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                      />
                    </svg>
                  </span>
                  <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                    2021 - Mugla University
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
                      Currently
                    </span>
                  </h3>{" "}
                  <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                    2023-Currently
                  </time>
                  <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                    Studying "Computer Engineering" in Mugla University
                  </p>
                </li>
                <li className="mb-10 ml-6">
                  <span className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-8 ring-sh-linen dark:ring-gray-900 dark:bg-blue-900">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-sm font-medium m-1 items-center justify-center"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                      />
                    </svg>
                  </span>
                  <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                    2019 - Ege University
                  </h3>{" "}
                  <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                    2017 - 2019
                  </time>
                  <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                    Studied "BSC in Computer Programming" in Ege University.
                  </p>
                </li>
                <li className="mb-10 ml-6">
                  <span className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-8 ring-sh-linen dark:ring-gray-900 dark:bg-blue-900">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-sm font-medium m-1 items-center justify-center"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                  </span>
                  <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                    Born in 1998, November 2
                  </h3>{" "}
                  <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                    Istanbul Turkey
                  </time>
                  <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                    I couldn't remember any productive work in that time. But
                  </p>
                </li>
              </ol>
            </div>
          </div>
          <div className="flex flex-col items-center mt-16">
            <div className="flex mb-3 space-x-4">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={userAllDetails.github ? userAllDetails.github : "#"}
                className="text-sm text-gray-500 transition hover:text-gray-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="24"
                  height="24"
                  className="mr-1"
                  viewBox="0 0 50 50"
                  style={{ fill: "#000000" }}
                >
                  <path d="M17.791,46.836C18.502,46.53,19,45.823,19,45v-5.4c0-0.197,0.016-0.402,0.041-0.61C19.027,38.994,19.014,38.997,19,39 c0,0-3,0-3.6,0c-1.5,0-2.8-0.6-3.4-1.8c-0.7-1.3-1-3.5-2.8-4.7C8.9,32.3,9.1,32,9.7,32c0.6,0.1,1.9,0.9,2.7,2c0.9,1.1,1.8,2,3.4,2 c2.487,0,3.82-0.125,4.622-0.555C21.356,34.056,22.649,33,24,33v-0.025c-5.668-0.182-9.289-2.066-10.975-4.975 c-3.665,0.042-6.856,0.405-8.677,0.707c-0.058-0.327-0.108-0.656-0.151-0.987c1.797-0.296,4.843-0.647,8.345-0.714 c-0.112-0.276-0.209-0.559-0.291-0.849c-3.511-0.178-6.541-0.039-8.187,0.097c-0.02-0.332-0.047-0.663-0.051-0.999 c1.649-0.135,4.597-0.27,8.018-0.111c-0.079-0.5-0.13-1.011-0.13-1.543c0-1.7,0.6-3.5,1.7-5c-0.5-1.7-1.2-5.3,0.2-6.6 c2.7,0,4.6,1.3,5.5,2.1C21,13.4,22.9,13,25,13s4,0.4,5.6,1.1c0.9-0.8,2.8-2.1,5.5-2.1c1.5,1.4,0.7,5,0.2,6.6c1.1,1.5,1.7,3.2,1.6,5 c0,0.484-0.045,0.951-0.11,1.409c3.499-0.172,6.527-0.034,8.204,0.102c-0.002,0.337-0.033,0.666-0.051,0.999 c-1.671-0.138-4.775-0.28-8.359-0.089c-0.089,0.336-0.197,0.663-0.325,0.98c3.546,0.046,6.665,0.389,8.548,0.689 c-0.043,0.332-0.093,0.661-0.151,0.987c-1.912-0.306-5.171-0.664-8.879-0.682C35.112,30.873,31.557,32.75,26,32.969V33 c2.6,0,5,3.9,5,6.6V45c0,0.823,0.498,1.53,1.209,1.836C41.37,43.804,48,35.164,48,25C48,12.318,37.683,2,25,2S2,12.318,2,25 C2,35.164,8.63,43.804,17.791,46.836z"></path>
                </svg>
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={userAllDetails.email ? userAllDetails.email : "#"}
                className="text-sm text-gray-500 transition hover:text-gray-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="mr-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  ></path>
                </svg>
              </a>
            </div>
            <div className="flex mb-2 space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <div>Copyright © 2023</div>
              <div>•</div>{" "}
              <a href="#">Md Unluoglu's blog - Let's start coding</a>
            </div>
            <div className="mb-8 text-sm text-gray-500 dark:text-gray-400">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/mdrathik/tailwind-nuxtjs-starter-blog"
              ></a>
            </div>
          </div>
        </div>
      </div>
    </div></>
  );
};
export default CenterContent;
