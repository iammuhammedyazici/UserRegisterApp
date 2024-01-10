import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import UserRegister from '../screens/UserRegister';
import UserCareer from '../screens/UserCareer';
import UserCV from '../screens/UserCV';
import UserLogin from '../screens/UserLogin';

const Stack = createStackNavigator();

export function Form() {
  return (
    <Stack.Navigator initialRouteName={'UserRegister'}>
      <Stack.Screen
        name="UserRegister"
        component={UserRegister}
        options={{
          title: 'Kayıt Ekranı',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="UserCareer"
        component={UserCareer}
        options={{
          title: 'Kariyer',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="UserCV"
        component={UserCV}
        options={{
          title: 'CV ve Projeler',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="UserLogin"
        component={UserLogin}
        options={{
          title: 'Giriş Ekranı',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
