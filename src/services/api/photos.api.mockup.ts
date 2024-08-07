// src/services/api/photos.api.mockup.ts
import axios from 'axios';

export const getPhotos = async () => {
  try {
    const response = await axios.get('/src/data/photos.mockup.json'); // Adjust the path accordingly
    return response.data;
  } catch (error) {
    console.error('Error fetching photos:', error);
    throw error;
  }
};
