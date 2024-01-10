import axios from 'axios';
import { Country } from 'react-native-country-picker-modal';

export async function getCityByCountry({ country }: { country: string }): Promise<any> {
  const response = await axios.post('https://countriesnow.space/api/v0.1/countries/states', {
    country: country,
  });

  return response.data;
}
