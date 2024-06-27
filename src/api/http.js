import { getCookie } from "@/services/authService/CookieService"; 
import { TOKEN_COOKIE } from "@/constants";
// import { GetLogOut } from "@/services/authService/AccountService";
import axios from "axios";
import router from "@/router";

axios.defaults.baseURL = import.meta.env.VITE_API_URL

const http = axios.create({
    headers:{
        Accept: "application/json",
        Content: "application/json"
    }
});

http.interceptors.request.use((config) =>{
    const token = getCookie(TOKEN_COOKIE);

    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    
    return config;
});

http.interceptors.response.use(
     response => {
         return response;
     },
     error => {
       if (error.response.status === 401 || error.response.status === 403) {
        router.push("login")
       }
       return Promise.reject(error);
     }
   );

export { http };