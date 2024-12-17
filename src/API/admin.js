import api, { getHeaders } from './api';

export const getAdminLogin = async (data) => {
    try {
      const response = await api.post('/admin/login', data, {
        headers: getHeaders(),
      });
      return response;
    } catch (error) {
      console.error('Failed to login Admin', error);
      throw error; 
    }
  };
  
  
  export const getAdminProfile = async (data) => {
    try {
      const response = await api.get('/admin/users', data, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error('Failed to log in', error);
      throw error; 
    }
  };
  
  