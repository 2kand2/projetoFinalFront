import Logout from "@/controllers/AccountController";


const GetLogOut = async()=>{
    try {
        const teste = Logout();
    } catch (error) {
        console.error(error);
    }finally{
        console.log("Fim");
    }
}

export {GetLogOut};