import getAllLocation from "@/controllers/LocationTypeController"

const getAllLocations = async () => {
  // esperando promise ser resolvida
  const result = await getAllLocation();
    return result.status != 200 ? [] : result.data;
}
export default getAllLocations;