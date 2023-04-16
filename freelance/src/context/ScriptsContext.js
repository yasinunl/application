import { createContext, useState } from "react";
import FreelancerMenu from "../component/leftContent/freelancerMenu";
import InboxModal from "../component/modal/inboxModal";
import JobsMenu from "../component/leftContent/jobsMenu";
import LoginModal from "../component/modal/loginModal";
import MessageModal from "../component/modal/messageModal";
import NewPostModal from "../component/modal/newPostModal";
import SignUpModal from "../component/modal/signUpModal";
import UserMenu from "../component/rightContent/userMenu";
import FilterList from "../component/rightContent/filterList";
import UserDetailMenu from "../component/rightContent/userDetailMenu";
import SendBoxModal from "../component/modal/sendBoxModal";
export const ScriptsContext = createContext();

const ScriptsContextProvider = (props) => {
  const [modalControl, setModalControl] = useState(false);
  const openModal = () => {
    if (modalControl) {
      setModalControl(false);
    } else {
      setModalControl(true);
    }
  };
  ///////////////////////////////////////////////////////////////////////////////////////
  //Inbox IDs
  const [inboxMessageID, setInboxMessageID] = useState("");
  ///////////////////////////////////////////////////////////////////////////
  //Modals
  const [modalNameW, setModalNameW] = useState("login");
  const [modalComponents] = useState({
    login: <LoginModal />,
    signup: <SignUpModal />,
    inbox: <InboxModal />,
    newPost: <NewPostModal />,
    message: <MessageModal />,
    sendBox: <SendBoxModal />,
  });
  const [modalName, setModalName] = useState("");
  const changeModal = (nameOfModal) => {
    setModalName(nameOfModal);
  };
  const [searchBar, setSeachBar] = useState("");
  ////////////////////////////////////////////////////////////////////
  //Left Menu Change
  const [jobFreelanceMenu] = useState({
    freelance: <FreelancerMenu />,
    jobs: <JobsMenu />,
  });
  const [menuName, setMenuName] = useState("freelance");
  const leftMenuChange = (nameOfMenu) => {
    setMenuName(nameOfMenu);
  }; ////////////////////////////////////////////////////////////////
  //Right Menu Change
  const [rightMenus] = useState([<UserMenu />, {'filterList':<FilterList />, 'userDetail':<UserDetailMenu />}])
  const [menuController, setMenuController] = useState(true)
  const rightMenuChange = () => {
    setMenuController(!menuController)
  }; //////////////////////////////////////////////////////////////////////////
  ///Alert Hidden
  const [alertHidden, setAlertHidden] = useState(false);
  const changeAlert = () => {
    setAlertHidden(true);
    setTimeout(() => {
      setAlertHidden(false);
    }, 2000);
  }; /////////////////////////////////////////////////////////////////////////////
  //Hover Left Menu
  const [clickButton, setClickButton] = useState(true);
  const changeLeftButtonsHover = () => {
    setClickButton(!clickButton);
  };

  return (
    <ScriptsContext.Provider
      value={{
        modalControl,
        openModal,
        modalComponents,
        modalName,
        changeModal,
        rightMenuChange,
        leftMenuChange,
        menuName,
        jobFreelanceMenu,
        changeAlert,
        alertHidden,
        searchBar,
        clickButton,
        setSeachBar,
        changeLeftButtonsHover,
        setInboxMessageID,
        inboxMessageID,
        menuController,
        rightMenus,
        modalNameW, setModalNameW
      }}
    >
      {props.children}
    </ScriptsContext.Provider>
  );
};
export default ScriptsContextProvider;
