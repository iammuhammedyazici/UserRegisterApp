import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {useFormik} from 'formik';
import moment from 'moment';
import {ScrollView} from 'react-native-gesture-handler';
import {RadioButton} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import CustomInput from '../components/CustomInput';
import {IUserCareerInfo, IUserSkill} from '../types';
import {palette} from '../theme';
import DatePicker from 'react-native-date-picker';
import CustomDropdown from '../components/CustomDropdown';
import { userCareerInfoSchema } from '../utils/userCareerInfoSchema';

const educationLevels = [
  {label: 'Lise', value: 'Lise'},
  {label: 'Önlisans Derecesi', value: 'Önlisans Derecesi'},
  {label: 'Lisans Derecesi', value: 'Lisans Derecesi'},
  {label: 'Yüksek Lisans Derecesi', value: 'Yüksek Lisans Derecesi'},
  {label: 'Doktora Derecesi', value: 'Doktora Derecesi'},
];

const skillLevels = [
  {text: '1', value: '1'},
  {text: '2', value: '2'},
  {text: '3', value: '3'},
  {text: '4', value: '4'},
  {text: '5', value: '5'},
];

export default function UserCareer() {
  const {navigate, goBack} = useNavigation() as any;

  const [openEducationLevelSelect, setOpenEducationLevelSelect] =
    useState(false);

  const [isDatePickerVisibleBirth, setDatePickerVisibilityBirth] =
    useState(false);

  const formik = useFormik<IUserCareerInfo>({
    initialValues: {
      employmentStatus: 'Employed',
      professionTitle: '',
      educationLevel: '',
      schoolName: '',
      studyDepartment: '',
      graduationDate: null,
      skills: [],
    },
    validationSchema: userCareerInfoSchema,
    async onSubmit(values) {
      try {
        const jsonValue = JSON.stringify(values);
        await AsyncStorage.setItem('userCareerInfo', jsonValue);
      } catch (e) {
        // saving error
      }

      navigate('UserCV');
    },
  });

  const {handleSubmit, touched, errors} = formik;

  const [skills, setSkills] = useState<IUserSkill[]>(formik.values.skills);

  const addSkill = useCallback(() => {
    const newSkill: IUserSkill = {skillName: '', skillLevel: '1'};
    setSkills([...skills, newSkill]);
  }, [skills]);

  const removeSkill = useCallback(
    (index: number) => {
      const updatedSkills = [...skills];
      updatedSkills.splice(index, 1);
      setSkills(updatedSkills);
    },
    [skills],
  );

  const handleSkillChange = useCallback(
    (value: any, field: 'skillLevel' | 'skillName', index: number) => {
      if (field === 'skillLevel') {
        const updatedSkills = [...skills];
        updatedSkills[index][field] = value.value;
        setSkills(updatedSkills);
      }

      if (field === 'skillName') {
        const updatedSkills = [...skills];
        updatedSkills[index][field] = value;
        setSkills(updatedSkills);
      }
    },
    [skills],
  );

  const ActivityIndicatorElement = useCallback(() => {
    return (
      <View style={styles.activityIndicatorStyle}>
        <ActivityIndicator color="#009688" size="large" />
      </View>
    );
  }, []);

  const setOpenEducationLevelSelectCb = useCallback(() => {
    setOpenEducationLevelSelect(!openEducationLevelSelect);
  }, [openEducationLevelSelect]);

  const showDatePickerBirth = useCallback(() => {
    setDatePickerVisibilityBirth(true);
  }, []);

  const hideDatePickerBirth = useCallback(() => {
    setDatePickerVisibilityBirth(false);
  }, []);

  const handleConfirmBirth = useCallback(
    (date: any) => {
      formik.setFieldValue('graduationDate', date);
      hideDatePickerBirth();
    },
    [formik, hideDatePickerBirth],
  );
  const renderItem = useCallback(
    ({item, index}: {item: IUserSkill; index: number}) => (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          flex: 1,
          marginVertical: 4,
        }}>
        <TextInput
          placeholder="Yetenek Adı"
          onChangeText={text => handleSkillChange(text, 'skillName', index)}
          style={styles.textInputStyle}
          value={item.skillName}
          placeholderTextColor={'#bbb'}
        />
        <TouchableOpacity
          onPress={() => removeSkill(index)}
          style={{
            alignItems: 'center',
            alignSelf: 'center',
            backgroundColor: 'red',
            borderRadius: 8,
            flexDirection: 'row',
            height: 30,
            justifyContent: 'center',
            width: 30,
          }}>
          <Text style={{fontWeight: 'bold', color: 'white'}}> X</Text>
        </TouchableOpacity>
      </View>
    ),
    [handleSkillChange, removeSkill],
  );

  const keyExtractor = useCallback(
    (item: IUserSkill, index: number) => index.toString(),
    [],
  );

  const onSubmit = useCallback(() => {
    formik.setFieldValue('skills', skills);
    handleSubmit();
  }, [formik, handleSubmit, skills]);

  const onConfirm = useCallback(() => {
    onSubmit();
  }, [onSubmit]);

  const onBack = useCallback(() => {
    goBack();
  }, [goBack]);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView style={styles.container}>
        <Text style={styles.headerText}>İş ve Eğitim</Text>
        <View style={styles.employmentStatusView}>
          <RadioButton.Android
            value="Student"
            status={
              formik.values.employmentStatus === 'Student'
                ? 'checked'
                : 'unchecked'
            }
            onPress={() => formik.setFieldValue('employmentStatus', 'Student')}
            color={palette.radioColor}
          />

          <Text
            style={{
              marginRight: 14,
            }}>
            Öğrenci
          </Text>
          <RadioButton.Android
            value="Employed"
            status={
              formik.values.employmentStatus === 'Employed'
                ? 'checked'
                : 'unchecked'
            }
            onPress={() => formik.setFieldValue('employmentStatus', 'Employed')}
            color={palette.radioColor}
          />

          <Text
            style={{
              marginRight: 14,
            }}>
            Çalışan
          </Text>

          <RadioButton.Android
            value="Free"
            status={
              formik.values.employmentStatus === 'Free'
                ? 'checked'
                : 'unchecked'
            }
            onPress={() => formik.setFieldValue('employmentStatus', 'Free')}
            color={palette.radioColor}
          />
          <Text style={{marginRight: 14}}>Serbest</Text>
        </View>

        <CustomInput
          label={'Unvan'}
          onChangeText={formik.handleChange('professionTitle')}
          value={formik.values.professionTitle}
        />

        <View style={{marginVertical: 4}}>
          <Text style={styles.titleText}>Eğitim Seviyesi</Text>
          <CustomDropdown
            data={educationLevels}
            value={formik.values.educationLevel}
            setValue={value => {
              formik.setFieldValue('educationLevel', value);
            }}
            placeholder="Eğitim Seviyesi Seç"
          />
          {touched.educationLevel && errors.educationLevel ? (
            <Text style={styles.errorText}>
              {JSON.stringify(errors.educationLevel)}
            </Text>
          ) : null}
        </View>

        <Text style={styles.titleText}>Okul Bilgisi</Text>

        <View style={styles.schoolInfoView}>
          <View style={{flexDirection: 'column'}}>
            <TextInput
              placeholder="Okul Adı"
              onChangeText={formik.handleChange('schoolName')}
              style={styles.textInputStyle}
              value={formik.values.schoolName}
            />
            {touched.schoolName && errors.schoolName ? (
              <Text style={styles.errorText}>
                {JSON.stringify(errors.schoolName)}
              </Text>
            ) : null}
          </View>

          <View style={{flexDirection: 'column'}}>
            <TextInput
              placeholder="Bölüm"
              onChangeText={formik.handleChange('studyDepartment')}
              style={styles.textInputStyle}
              value={formik.values.studyDepartment}
            />
            {touched.studyDepartment && errors.studyDepartment ? (
              <Text style={styles.errorText}>
                {JSON.stringify(errors.studyDepartment)}
              </Text>
            ) : null}
          </View>
        </View>

        <View style={{marginVertical: 0}}>
          <TouchableOpacity
            onPress={showDatePickerBirth}
            style={styles.dateTouchableOpacity}>
            <View
              style={{
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              {formik.values.graduationDate ? (
                <Text style={styles.placeHolder}>
                  {moment(formik.values.graduationDate).format('DD-MM-yyyy')}
                </Text>
              ) : (
                <Text
                  style={[styles.placeHolder, {fontSize: 16, color: 'gray'}]}>
                  Mezuniyet Tarihi
                </Text>
              )}
            </View>
          </TouchableOpacity>
          <DatePicker
            modal
            open={isDatePickerVisibleBirth}
            date={formik.values.graduationDate ?? new Date()}
            onConfirm={handleConfirmBirth}
            onCancel={hideDatePickerBirth}
          />
          {touched.graduationDate && errors.graduationDate ? (
            <Text style={styles.errorText}>
              {errors.graduationDate.toString()}
            </Text>
          ) : null}
        </View>

        <View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.titleText}>Yetenekler</Text>
            <TouchableOpacity onPress={addSkill} style={styles.addButton}>
              <Text style={styles.addButtonLabel}>+</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={skills}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
          />
        </View>

        <View style={{height: 30}} />
      </ScrollView>
      <View style={styles.buttonsView}>
        <TouchableOpacity
          onPress={onBack}
          style={[styles.button, {backgroundColor: palette.mainColor}]}
          activeOpacity={0.5}>
          <Text style={styles.buttonText}>Geri</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onConfirm}
          style={styles.button}
          activeOpacity={0.5}>
          <Text style={styles.buttonText}>İleri</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  activityIndicatorStyle: {
    flex: 1,
    justifyContent: 'center',
  },
  addButton: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: palette.secondaryColor,
    borderRadius: 8,
    flexDirection: 'row',
    height: 30,
    justifyContent: 'center',
    width: 40,
  },
  addButtonLabel: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  button: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: palette.secondaryColor,
    borderRadius: 8,
    height: 40,
    justifyContent: 'center',
    marginVertical: 8,
    width: '40%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonsView: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 16,
  },

  dateTouchableOpacity: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    flexDirection: 'row',
    marginBottom: 25,
    paddingBottom: 8,
  },
  desText: {
    color: '#3f3f3f',
    fontSize: 12,
    fontWeight: 'normal',
    marginBottom: 2,
    paddingVertical: 5,
  },
  employmentStatusView: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
  graduationDateText: {
    color: '#3f3f3f',
    fontSize: 12,
    fontWeight: 'normal',
    marginBottom: 2,
    marginLeft: 20,
  },
  headerText: {
    alignSelf: 'center',
    borderBottomColor: '#50cd89',
    borderBottomWidth: 2,
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
    maxWidth: '70%',
    paddingBottom: 10,
    textAlign: 'center',
  },
  schoolInfoView: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginVertical: 10,
    marginBottom: 0,
  },
  textDes: {
    paddingVertical: 0,
  },
  textInputStyle: {
    backgroundColor: '#f5f8fa',
    borderRadius: 5,
    color: '#000',
    minHeight: 40,
    paddingHorizontal: 10,
    marginBottom: 10,
    marginHorizontal: 5,
    paddingVertical: 0,
    minWidth: '50%',
  },
  placeHolder: {
    color: 'gray',
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
