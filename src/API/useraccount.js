import api, { getHeaders } from './api';


//Live Account

export const getCreateLiveAccountUser= async (data) => {
    try {
        const response = await api.post('/user/account/create',data, {
            headers: getHeaders()
        });
        return response.data;
    } catch (error) {
        console.error('Error Registering User ', error);
        throw error;
    }
};



export const getUserLiveAccount = async (user_Id) => {
  try {
    const response = await api.get(`/user/account/${user_Id}`,  {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error('Failed to log in User', error);
    throw error; 
  }
};

export const getUserLiveDeposit = async (user_Id) => {
  try {
    const response = await api.put( `/user/account/${user_Id}`,data,  {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error('Failed to get User Profile', error);
    throw error; 
  }
};



export const getUserLiveWithdraw = async (user_Id) => {
  try {
    const response = await api.put(`/user/account/${user_Id}`, data, {
      headers: getHeaders(),
    });
    return response;
  } catch (error) {
    console.error('Failed to log in', error);
    throw error; 
  }
};




// Demo Account

export const getCreateDemoAccountUser= async (data) => {
  try {
      const response = await api.post('/user/account/createdemo',data, {
          headers: getHeaders()
      });
      return response.data;
  } catch (error) {
      console.error('Error Registering User ', error);
      throw error;
  }
};



export const getUserDemoAccount = async (user_Id) => {
try {
  const response = await api.get(`/user/account/${user_Id}`,  {
    headers: getHeaders(),
  });
  return response.data;
} catch (error) {
  console.error('Failed to log in User', error);
  throw error; 
}
};

export const getUserDemoDeposit = async (user_Id) => {
try {
  const response = await api.put( `/user/account/${user_Id}`,data,  {
    headers: getHeaders(),
  });
  return response.data;
} catch (error) {
  console.error('Failed to get User Profile', error);
  throw error; 
}
};



export const getUserDemoWithdraw = async (user_Id) => {
try {
  const response = await api.put(`/user/account/${user_Id}`, data, {
    headers: getHeaders(),
  });
  return response;
} catch (error) {
  console.error('Failed to log in', error);
  throw error; 
}
};
