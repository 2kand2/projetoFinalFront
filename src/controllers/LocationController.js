import { http } from '@/api/http';

const createLocation = (locationprod) => {
  return http.post('/api/Location/CreateLocation', locationprod);
};

const getAllLocation = () => {
  return http.get('/api/Location/GetLocationsWithQuantity');
};

const updateLocation = (updatelocationprod) => {
  return http.put('/api/Location', updatelocationprod);
}

export default {
  createLocation,
  getAllLocation,
  updateLocation
};