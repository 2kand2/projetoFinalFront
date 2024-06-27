import { http } from "@/api/http";


const getAllWiQuantity = () =>{
    return http.get("api/Location/GetLocationsWithQuantity")
}

export default {
    getAllWiQuantity
}