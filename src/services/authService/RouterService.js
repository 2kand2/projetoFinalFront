import { JTE_COOKIE } from "@/constants";
import { getCookie } from "./CookieService";
import { useAuthStore } from "@/stores";



export const DefaultConfig = async () =>{
    try {
        let canEnterRoute = false;
        canEnterRoute = tokenGuard();
        if(!canEnterRoute) return canEnterRoute

        return canEnterRoute;
    } catch (error){
       throw error;
    }
};


const Expired = ()=>{
    const expirationTime = new Date(getCookie(JTE_COOKIE)).getTime();
    const timeNow = new Date().getTime();
    // debugger;
    if(!!expirationTime && expirationTime < timeNow){
        return true;
    }else{
        return false;
    }
};


const tokenGuard = ()=>{
    const auth = useAuthStore();
    if(Expired() && auth.isAuthenticated){
        auth.updateRefreshToken();
        return auth.isAuthenticated;
    }

    if(auth.isAuthenticated){
        return true
    }

    return false;
}