import { useContext } from "react";
import HeaderContent from "./headerContent/headerContent";
import CenterContent from "./centerContent/centerContent";
import LeftContent from "./leftContent/leftContent";
import Modal from "./modal/modal";
import { ScriptsContext } from "../context/ScriptsContext";
import { Route, Routes } from "react-router-dom";
import UsersList from "./centerContent/usersList";
import UserProfile from "./centerContent/userProfile";
import UserProfileMenu from "./rightContent/userProfileMenu";
import JobsList from "./centerContent/jobsList";
import JobDetail from "./centerContent/jobDetail";
import UserDetail from "./rightContent/userDetail";
import YourProfileMenu from "./rightContent/yourProfileMenu";
import IndexPage from "./centerContent/indexPage";

const HomePage = () => {
  //////////////////////////Contexts///////////////////////////////////
  const { modalControl } = useContext(ScriptsContext);
  return (
    <>
      <style>
        {`.animated {{
      -webkit-animation-duration: 1s;
      animation-duration: 1s;
      -webkit-animation-fill-mode: both;
      animation-fill-mode: both;
    }}

    .animated.faster {
      -webkit-animation-duration: 500ms;
      animation-duration: 500ms;
    }

    .fadeIn {
      -webkit-animation-name: fadeIn;
      animation-name: fadeIn;
    }

    .fadeOut {
      -webkit-animation-name: fadeOut;
      animation-name: fadeOut;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }

      to {
        opacity: 1;
      }
    }

    @keyframes fadeOut {
      from {
        opacity: 1;
      }

      to {
        opacity: 0;
      }
    }
    .no-scrollbar::-webkit-scrollbar {
      display: none;
  }
  
  /* Hide scrollbar for IE, Edge and Firefox */
  .no-scrollbar {
      -ms-overflow-style: none;  /* IE and Edge */
   `}
      </style>
      <div className="bg-transparent bg-gradient-to-tl from-sh-dark-blue to-sh-light-blue">
        <HeaderContent />
        <div className="xl:container flex flex-row  flex-nowrap min-h-screen">
          {/* left Content */}
          <LeftContent />
          {/* Center Content */}
          <Routes>
            <Route path="/" element={
            <IndexPage />
            } />
            <Route path="*" element={
            <IndexPage />
            } />
            <Route path= "/jobs" element={<JobsList />} />
            <Route path= "/freelancers" element={<UsersList />} />
            <Route path="/profile" element={<CenterContent />} />
            <Route path="/user/:id" element={<UserProfile />} />
            <Route path="/job/:id" element={<JobDetail />} />
          </Routes>
          {/* Right Content */}
          <Routes>
            <Route path="/" element={<UserProfileMenu />} />
            <Route path="/jobs" element={<UserProfileMenu />}/>
            <Route path="/profile" element={<YourProfileMenu />} />
            <Route path="/user/:id" element={<UserDetail />}/>
            <Route path="/job/:id" element={<UserDetail />} />
            <Route path="*" element={<UserProfileMenu />} />
          </Routes>
          
        </div>
      </div>
      {/* Modal */}
      {modalControl ? <Modal /> : null}
    </>
  );
};
export default HomePage;
