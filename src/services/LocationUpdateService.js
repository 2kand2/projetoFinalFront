import { updateLocation } from "@/controllers/LocationController";



const updateLocations = async (updatelocationprod) => {
    const result = await updateLocation(updatelocationprod);
    console.log(updateLocations)
    return result.data;
};
export default updateLocations;
