// /src/api/schoolApi.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api'; 

// Add a new school
export const addSchool = async (schoolData) => {
  try {
    const response = await axios.post(`${API_URL}/addSchool`, schoolData);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.error : 'Something went wrong');
  }
};

// Get schools based on latitude and longitude
export const getSchools = async (lat, lon) => {
  try {
    const response = await axios.get(`${API_URL}/listSchools`, {
      params: { latitude: lat, longitude: lon },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.error : 'Something went wrong');
  }
};
