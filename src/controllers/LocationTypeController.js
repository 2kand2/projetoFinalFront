import { http } from '@/api/http'; 

  const getAllLocation = () => {
    return http.get('/api/LocationType/GetAll');
  }

  export default getAllLocation;
