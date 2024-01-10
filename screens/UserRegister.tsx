import {useQuery} from '@tanstack/react-query';
import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {useFormik} from 'formik';
import moment from 'moment';

import {useNavigation} from '@react-navigation/native';
import {
  PaperProvider,
  Portal,
  RadioButton,
} from 'react-native-paper';
import {userPersonalInfoSchema} from '../utils/userPersonalInfoSchema';
import AsyncStorage from '@react-native-community/async-storage';
import {IUserPersonalInfo} from '../types';
import CustomInput from '../components/CustomInput';
import {palette} from '../theme';
import DatePicker from 'react-native-date-picker';
import KVKKDialog from '../components/KVKKDialog';
import {ScrollView} from 'react-native-gesture-handler';
import CustomDropdown from '../components/CustomDropdown';
import { getAllCountries } from '../services/country';
import { getCityByCountry } from '../services/city';

const includeExtra = true;

export default function UserRegister() {
  const {navigate} = useNavigation() as any;

  const [visible, setVisible] = useState(false);

  const showDialog = useCallback(() => {
    console.log('Deneme');
    setVisible(true);
  }, []);

  const hideDialog = useCallback(() => {
    setVisible(false);
  }, []);

  const [openCountrySelect, setOpenCountrySelect] = useState(false);
  const [valueCountrySelect, setValueCountrySelect] = useState<string | null>(
    null,
  );
  const [itemsCountries, setItemsCountries] = useState<
    {label: string; value: string}[]
  >([]);

  const [openStateSelect, setOpenStateSelect] = useState(false);
  const [valueStateSelect, setValueStateSelect] = useState<string | null>(null);
  const [itemsStates, setItemsStates] = useState<
    {label: string; value: string}[]
  >([]);

  const [isDatePickerVisibleBirth, setDatePickerVisibilityBirth] =
    useState(false);

  const formik = useFormik<IUserPersonalInfo>({
    initialValues: {
      avatarUrl: '',
      fullName: '',
      phone: '',
      state: '',
      country: '',
      idNo: '',
      birthDate: null,
      KVKKApproval: true,
      gender: 'Erkek',
    },
    validationSchema: userPersonalInfoSchema,
    async onSubmit(values) {
      try {
        const jsonValue = JSON.stringify(values);
        await AsyncStorage.setItem('userPersonalInfo', jsonValue);
      } catch (e) {
        console.log('submit error => ', JSON.stringify(e));
      }

      setVisible(false);

      navigate('UserCareer');
    },
  });

  const {handleSubmit, touched, errors, isValid} = formik;

  const {
    data: countries,
    isLoading: isLoadingCountries,
    error: errorCountries,
  } = useQuery({
    queryKey: ['countries'],
    queryFn: () => getAllCountries(),
  });

  const {
    data: states,
    isLoading: isLoadingStates,
    error: errorStates,
  } = useQuery({
    queryKey: ['states', formik.values.country],
    queryFn: () => {
      if (formik.values.country !== '') {
        return getCityByCountry({country: formik.values.country});
      }
      return Promise.resolve(null); // Return a resolved promise for empty country
    },
  });

  const ActivityIndicatorElement = useCallback(() => {
    return (
      <View style={styles.activityIndicatorStyle}>
        <ActivityIndicator color="#009688" size="large" />
      </View>
    );
  }, []);

  const setOpenCountrySelectCb = useCallback(() => {
    setOpenCountrySelect(!openCountrySelect);
    setOpenStateSelect(false);
  }, [openCountrySelect]);

  const setOpenStateSelectCb = useCallback(() => {
    setOpenStateSelect(!openStateSelect);
    setOpenCountrySelect(false);
  }, [openStateSelect]);

  const onGetPhotoFromGallery = useCallback(async () => {
    // You can also use as a promise without 'callback':
    await ImagePicker.launchImageLibrary(
      {
        selectionLimit: 0,
        mediaType: 'photo',
        includeBase64: false,
        includeExtra: true,
      },
      e => {
        formik.setFieldValue('avatarUrl', e?.assets?.[0]?.uri);
      },
    );
  }, [formik]);

  const showDatePickerBirth = useCallback(() => {
    setDatePickerVisibilityBirth(true);
  }, []);

  const hideDatePickerBirth = useCallback(() => {
    setDatePickerVisibilityBirth(false);
  }, []);

  const handleConfirmBirth = useCallback(
    (date: any) => {
      formik.setFieldValue('birthDate', date);
      hideDatePickerBirth();
    },
    [formik, hideDatePickerBirth],
  );

  const onSubmit = useCallback(() => {
    handleSubmit();
  }, [handleSubmit]);

  const onConfirm = useCallback(() => {
    if (!isValid) {
      setVisible(false);
      return;
    }
    onSubmit();
  }, [isValid, onSubmit]);

  useEffect(() => {
    if (countries) {
      setItemsCountries(
        countries.map((item: any) => ({
          label: item.name.common,
          value: item.name.common,
        })),
      );
    }
  }, [countries]);

  useEffect(() => {
    if (states?.data?.states) {
      setItemsStates(
        states?.data?.states?.map((item: any) => ({
          label: item.name,
          value: item.state_code,
        })),
      );
    }
  }, [states]);

  useEffect(() => {
    if (valueCountrySelect) {
      const myCountry = itemsCountries?.find(
        x => x.value === valueCountrySelect,
      );
      if (myCountry) {
        formik.handleChange('country')(myCountry.value);
        setValueStateSelect(null);
        setItemsStates([]);
      }
    }
  }, [countries, valueCountrySelect]);

  useEffect(() => {
    if (valueStateSelect) {
      const myState = itemsStates?.find(x => x.value === valueStateSelect);
      if (myState) {
        formik.handleChange('state')(myState.value);
      }
    }
  }, [states, valueStateSelect]);

  return (
    <PaperProvider>
      <SafeAreaView style={{flex: 1}}>
        <Portal>
          <View style={styles.container}>
            <Text style={styles.headerText}>Kişi Bilgileri</Text>
            <KVKKDialog
              hideDialog={hideDialog}
              showDialog={showDialog}
              onConfirm={onConfirm}
              visible={visible}
            />
            <ScrollView>
              <Text style={styles.titleText}>Resim</Text>

              <View
                style={{
                  margin: 4,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}>
                <TouchableOpacity onPress={onGetPhotoFromGallery}>
                  <Image
                    source={
                      formik.values.avatarUrl
                        ? {uri: `file://${formik.values.avatarUrl}`}
                        : require('../assets/user.png')
                    }
                    style={styles.image}
                    resizeMethod="scale"
                    resizeMode="cover"
                  />

                  {errors.avatarUrl && touched.avatarUrl ? (
                    <Text style={styles.errorText}>
                      {errors.avatarUrl.toString()}
                    </Text>
                  ) : null}
                </TouchableOpacity>
              </View>

              <CustomInput
                label={'Ad Soyad'}
                icon={
                  <Ionicons
                    name="person-outline"
                    size={20}
                    color="#666"
                    style={{marginRight: 5}}
                  />
                }
                onChangeText={formik.handleChange('fullName')}
                value={formik.values.fullName}
              />
              {touched.fullName && errors.fullName ? (
                <Text style={styles.errorText}>
                  {JSON.stringify(errors.fullName)}
                </Text>
              ) : null}
              <CustomInput
                label={'TC Kimlik Numarası'}
                onChangeText={formik.handleChange('idNo')}
                value={formik.values.idNo}
                keyboardType="number-pad"
              />

              <CustomInput
                label={'Telefon Numarası'}
                onChangeText={formik.handleChange('phone')}
                value={formik.values.phone}
                keyboardType="number-pad"
              />

              <View>
                <TouchableOpacity
                  onPress={showDatePickerBirth}
                  style={{
                    flexDirection: 'row',
                    borderBottomColor: '#ccc',
                    borderBottomWidth: 1,
                    paddingBottom: 8,
                    marginBottom: 25,
                    paddingHorizontal: 20,
                  }}>
                  {formik.values.birthDate ? (
                    <Text style={styles.placeHolder}>
                      {moment(formik.values.birthDate).format('DD-MM-yyyy')}
                    </Text>
                  ) : (
                    <Text
                      style={[
                        styles.placeHolder,
                        {fontSize: 16, color: 'gray'},
                      ]}>
                      Doğum Tarihi
                    </Text>
                  )}
                </TouchableOpacity>
                <DatePicker
                  modal
                  open={isDatePickerVisibleBirth}
                  date={formik.values.birthDate ?? new Date()}
                  onConfirm={(date: any) => {
                    handleConfirmBirth(date);
                  }}
                  onCancel={hideDatePickerBirth}
                />
                {touched.birthDate && errors.birthDate ? (
                  <Text style={styles.errorText}>
                    {errors.birthDate.toString()}
                  </Text>
                ) : null}
              </View>

              <View style={{marginVertical: 2, flexDirection: 'column'}}>
                <CustomDropdown
                  data={itemsCountries}
                  value={valueCountrySelect as string}
                  setValue={setValueCountrySelect}
                  placeholder="Ülke Seçin"
                />
                {touched.country && errors.country ? (
                  <Text style={styles.errorText}>
                    {JSON.stringify(errors.country)}
                  </Text>
                ) : null}
              </View>

              <View
                style={{margin: 4, marginBottom: 12, flexDirection: 'column'}}>
                <CustomDropdown
                  data={itemsStates}
                  value={valueStateSelect as string}
                  setValue={setValueStateSelect}
                  placeholder="İl Seçin"
                />
                {touched.state && errors.state ? (
                  <Text style={styles.errorText}>
                    {JSON.stringify(errors.state)}
                  </Text>
                ) : null}
              </View>

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <RadioButton.Android
                  value="Erkek"
                  status={
                    formik.values.gender === 'Erkek' ? 'checked' : 'unchecked'
                  }
                  onPress={() => formik.setFieldValue('gender', 'Erkek')}
                  color={palette.radioColor}
                />

                <Text
                  style={{
                    marginRight: 20,
                  }}>
                  Erkek
                </Text>

                <RadioButton.Android
                  value="Kadın"
                  status={
                    formik.values.gender === 'Kadın' ? 'checked' : 'unchecked'
                  }
                  onPress={() => formik.setFieldValue('gender', 'Kadın')}
                  color={palette.radioColor}
                />
                <Text style={{marginRight: 20}}>Kadın</Text>
              </View>
              <View style={{height: 90}} />

              <TouchableOpacity
                onPress={showDialog}
                style={styles.button}
                activeOpacity={0.5}>
                <Text style={styles.buttonText}>İleri</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </Portal>
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  activityIndicatorStyle: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: palette.secondaryColor,
    borderRadius: 8,
    bottom: 0,
    height: 40,
    justifyContent: 'center',
    marginVertical: 8,
    position: 'absolute',
    width: '90%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
  headerText: {
    alignSelf: 'center',
    borderBottomColor: '#50cd89',
    borderBottomWidth: 2,
    color: palette.secondaryColor,
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
    maxWidth: '70%',
    paddingBottom: 10,
    textAlign: 'center',
  },
  image: {
    borderColor: 'white',
    borderRadius: 12,
    borderWidth: 6,
    height: 140,
    padding: 4,
    width: 140,
  },
  placeHolder: {
    color: '#000',
    flex: 1,
    paddingVertical: 0,
  },
  titleText: {
    alignSelf: 'flex-start',
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
});
