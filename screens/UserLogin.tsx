import React, {useCallback, useState} from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import LoginSVG from '../../../assets/images/misc/LoginSVG.svg';

import CustomButton from '../components/CustomButton';
import { useUserContext } from '../navigation/Routes';
import CustomInput from '../components/CustomInput';

export default function UserLogin() {
  const {login} = useUserContext();

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = useCallback(async () => {
    await login();
    if (!(userName?.length > 0 && password?.length > 0)) {
      Alert.alert('Lütfen tüm alanları doldurun.');
      return;
    }
    await login();
  }, [userName, login, password]);

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <View style={{paddingHorizontal: 25}}>
        <Text style={styles.headerTitle}>Giriş Yapın</Text>
        <CustomInput
          label={'Kullanıcı Adı'}
          value={userName}
          onChangeText={setUserName}
        />

        <CustomInput
          label={'Şifre'}
          inputType="password"
          value={password}
          onChangeText={setPassword}
        />

        <CustomButton label={'Giriş'} onPress={onLogin} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    color: '#FF4433',
    fontSize: 28,
    fontWeight: '500',
    marginBottom: 30,
  },
  logoButton: {
    borderColor: '#ddd',
    borderRadius: 10,
    borderWidth: 2,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
});
