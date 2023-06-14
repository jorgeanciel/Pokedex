import axios from 'axios';

export const getAllTypes = async () => {
  try {
    const res = await axios.get('https://pokeapi.co/api/v2/type/');
    return res.data.results;
  } catch (error) {
    console.error('failed to get all types', error);
  }
};
