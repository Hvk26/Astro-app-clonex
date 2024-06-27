import axios from 'axios';
import Service_URL from './Constant';
import KeyCenter from './KeyCenter';

const API_KEY = KeyCenter.vedicastroapi.API_KEY;
export async function getStaticdata() {
  try {
    const response = await axios.get(`${Service_URL}/data/getNumberData`);

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getGeoLocation(city) {
  try {
    const response = await axios.get(
      `https://api.vedicastroapi.com/v3-json/utilities/geo-search?city=${city}&api_key=${API_KEY}`,
    );

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
}
