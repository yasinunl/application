import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:5000/api/"

/* axios.interceptors.response.use(
    res => res,async error => {
        if(error.response.status === 401){
            try{
                const response = await axios.post('/user/refresh', {},{
                    headers:{
                        Authorization: 'Bearer ' + localStorage.getItem("refresh_token")
                      }
                });
                console.log("401")
                localStorage.setItem("access_token", response.headers.access_token)
            if (response.status === 200){
                console.log("200")
                return axios(error.config)
            }
            }catch{
                console.log("carch")
            }
                
        }
        return error;
    }
) */