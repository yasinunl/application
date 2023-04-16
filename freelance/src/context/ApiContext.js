import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const ApiContext = createContext();

const ApiContextProvider = (props) => {
  const [accessToken, setAccessToken] = useState("");
  const [success, setSuccess] = useState(false);
  const [messageID, setMessageID] = useState();
  const [messageName, setMessageName] = useState();
  //Posts
  const [allJobs, setAllJobs] = useState([]);

  //Users
  const [userDetail, setUserDetail] = useState({});
  const [userAllDetails, setUserAllDetails] = useState({});

  //UserInfos
  const [userInfo, setUserInfo] = useState([]);

  //Inbox
  const [userInbox, setUserInbox] = useState([]);

  //SendBox
  const [userSendBox, setUserSendBox] = useState([]);

  // SignUp
  const signUp = (user) => {
    axios({
      url: "api/user/create",
      method: "POST",
      data: user,
    })
      .then((response) => {
        console.log(response.data.success);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //https://snyk.io/advisor/npm-package/react-cookie/functions/react-cookie.Cookies
  const userLogin = async (user) => {
    const axiosCreate = axios.create({});
    const response = await axiosCreate.post("user/login", user);
    setSuccess(response.data.success);
    if (response.data.success) {
      setAccessToken(true);
      localStorage.setItem("access_token", response.headers.access_token);
      localStorage.setItem("refresh_token", response.headers.refresh_token);
      getUserDetail();
      getUsersAllDetails();
    }
    return response;
  };

  //User Details
  const getUsersAllDetails = async () => {
    const access_token = localStorage.getItem("access_token");
    if (access_token !== "") {
      await axios
        .get("userProfile/user_profile", {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
        .then((response) => {
          setUserAllDetails(response.data);
        })
        .catch(async (error) => {
          if (error.response.status === 401) {
            await refreshToken();
            getUsersAllDetails();
            return null;
          }
        });
    }
  };
  //User Root Infos
  const getUserDetail = async () => {
    const access_token = localStorage.getItem("access_token");
    await axios
      .post(
        `user/getuser`,
        {},
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
      .then((response) => {
        setUserDetail(response.data.data);
      })
      .catch(async (error) => {
        if (error.response.status === 401) {
          await refreshToken();
          getUserDetail();
        }
      });
  };

  // Get All Users Profile
  const getAllUsersProfile = async () => {
    const access_token = localStorage.getItem("access_token");
    if (access_token){
      const response = await axios.post("userProfile/nouser", {}, 
      {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      });
      setUserInfo(response.data.data);
    }else{
    const response = await axios.get("userProfile/getinfos");
    setUserInfo(response.data.data);
  }
};

  // Get Jobs Infos
  const getJobInfos = async () => {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      const response = await axios.post(
        "new_post/nouser",
        {},
        {
          headers: {
            Authorization: "Bearer " + access_token,
          },
        }
      );
      setAllJobs(response.data.data);
    } else {
      const response = await axios.get("new_post");
      setAllJobs(response.data.data);
    }
  };
  const refreshToken = async () => {
    const response = await axios.post(
      "/user/refresh",
      {},
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("refresh_token"),
        },
      }
    );
    localStorage.setItem("access_token", response.headers.access_token);
  };

  //Get Send Messages
  const getSendMessages = () => {
    if (localStorage.getItem("access_token")) {
      axios
        .post(
          "send/user",
          {},
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("access_token"),
            },
          }
        )
        .then((response) => {
          setUserSendBox(response.data.data);
        })
        .catch((error) => {
          if (error.response.status === 401) {
            refreshToken();
            getSendMessages();
          } else {
            console.log(error);
          }
        });
    }
  }; //SendBox Focused Message
  const getSendFocusedMessage = async (id) => {
    const response = await axios.get(`send/${id}`);
    return response.data.data;
  };

  //Get Inbox Messages
  const getInboxMessages = () => {
    if (localStorage.getItem("access_token")) {
      axios
        .post(
          "inbox/user",
          {},
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("access_token"),
            },
          }
        )
        .then((response) => {
          setUserInbox(response.data.data);
        })
        .catch((error) => {
          if (error.response.status === 401) {
            refreshToken();
          } else {
            console.log(error);
          }
        });
    }
  }; //Inbox Focused Message
  const getInboxFocusedMessage = async (id) => {
    const response = await axios.get(`inbox/${id}`);
    return response.data.data;
  };
  //Share New Post
  const postNewJob = async (job) => {
    axios
      .post("new_post/add", job, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((response) => {
        return response.data.success;
      })
      .catch((error) => {
        return false;
      });
  };
  useEffect(() => {
    if (localStorage.getItem("access_token") !== null) {
      setAccessToken(() => localStorage.getItem("access_token"));
      setSuccess(() => true);
    } else setSuccess(() => false);
    getJobInfos();
    getAllUsersProfile();
  }, []);
  useEffect(() => {
    if (localStorage.getItem("access_token") !== null) {
      setAccessToken(() => localStorage.getItem("access_token"));
      setSuccess(() => true);
      getInboxMessages();
      getSendMessages();
      getUserDetail();
      getUsersAllDetails();
    } else setSuccess(() => false);
    
    getJobInfos();
    getAllUsersProfile();
  }, [accessToken]);
  useEffect(()=> {setUserAllDetails({})}, [success])
  return (
    <ApiContext.Provider
      value={{
        userInfo,
        signUp,
        userLogin,
        success,
        accessToken,
        setAccessToken,
        setSuccess,
        allJobs,
        userDetail,
        userAllDetails,
        userInbox,
        getInboxFocusedMessage,
        postNewJob,
        setAllJobs,
        messageID,
        messageName,
        setMessageID,
        setMessageName,
        userSendBox,
        getSendFocusedMessage,
      }}
    >
      {props.children}
    </ApiContext.Provider>
  );
};
export default ApiContextProvider;
