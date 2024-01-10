import * as yup from "yup";
import {IUserPersonalInfo} from '../types';
import { ValidateTckn } from './validation/TCKN';

export const userPersonalInfoSchema = yup.object<IUserPersonalInfo>().shape({
  avatarUrl: yup.string(),
  fullName: yup.string().required('Lütfen isim girin'),
  phone: yup.string().required('Lütfen telefon numarası girin'),
  state: yup.string().required('Lütfen il seçin'),
  country: yup.string().required('Lütfen ülke seçin'),
  idNo: yup.string().test("isValidTCKimlik", "Tanımsız TC Kimlik Numarası", ValidateTckn),
  birthDate: yup.date().required('Lütfen doğum tarihi seçin'),
  KVKKApproval: yup.bool().required('KVKK onay verin'),
  gender: yup.string().required('Cinsiyet Seçin'),
});
