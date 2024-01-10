import { array, date, object, string } from 'yup';
import { IUserCareerInfo } from '../types';

export const userCareerInfoSchema = object<IUserCareerInfo>().shape({
  employmentStatus: string().required('İş durumu zorunludur'),
  professionTitle: string().required('Meslek unvanı zorunludur'),
  educationLevel: string().required('Eğitim seviyesi zorunludur'),
  schoolName: string().required('Okul adı zorunludur'),
  studyDepartment: string().required('Bölüm bilgisi zorunludur'),
  graduationDate: date().required('Mezuniyet tarihi zorunludur'),
  skills: array(),
});
