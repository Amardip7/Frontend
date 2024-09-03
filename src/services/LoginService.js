import axios from 'axios';

export const logindata = async (formData) => {
  try {
    const response = await axios.post('http://localhost:5000/login', formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
