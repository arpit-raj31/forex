import api, { getHeaders } from './api';


export const getRegisterUser = async (data) => {
    try {
        const response = await api.post('/user/register',data, {
            headers: getHeaders()
        });
        return response.data;
    } catch (error) {
        console.error('Error Registering User ', error);
        throw error;
    }
};



export const getUserLogin = async (data) => {
  try {
    const response = await api.post('/user/login', data, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error('Failed to log in User', error);
    throw error; 
  }
};


export const getUserProfile = async (username) => {
  try {
    const response = await api.get( `/user/${username}`,  {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error('Failed to get User Profile', error);
    throw error; 
  }
};




