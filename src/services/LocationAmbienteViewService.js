import { getAllLocation } from "@/controllers/LocationController";

const getAllLocations = async () => {
  const result = await getAllLocation();
  console.log(result.data);
  return result.data;
};
export default getAllLocations;
