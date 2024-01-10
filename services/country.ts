import axios from 'axios';
import { Country } from 'react-native-country-picker-modal';

export async function getAllCountries(): Promise<Country[]> {
    const response = await axios.get('https://restcountries.com/v3.1/all?fields=name,flags');
  
    return response.data;
  }