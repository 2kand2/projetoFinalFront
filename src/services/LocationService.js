import LocationController from "@/controllers/LocationController";

const createLocations = async (locationprod) => {
    const result = await LocationController.createLocation(locationprod);
    return result.data;
};

const getAllLocations = async () => {
   const result = await LocationController.getAllLocation();
   console.log(result.data);
   return result.data;
};

const updateLocation = async (parameters) =>{
    return result = await LocationController.updateLocation(parameters);
}

export default {
    createLocations,
    getAllLocations,
    updateLocation
};
