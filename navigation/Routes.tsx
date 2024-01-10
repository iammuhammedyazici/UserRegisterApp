import { NavigationContainer } from '@react-navigation/native';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import { palette } from '../theme';
import { IUserPersonalInfo, IUserCV, IUserCareerInfo } from '../types';
import Dashbord from './Dashbord';
import AsyncStorage from '@react-native-community/async-storage';
import { Form } from './Form';

interface IUserContext {
  userPersonalInfo: IUserPersonalInfo | null;
  userCareerInfo: IUserCareerInfo | null;
  userCv: IUserCV | null;
  logout: () => Promise<void>;
  login: () => Promise<void>;
}

interface IAuthContext {
  isLoggedIn: boolean;
}

export const UserContext = createContext<IUserContext>(null as any);

export const useUserContext = () => useContext(UserContext);

const Routes = () => {
  const [userPersonalInfo, setSerPersonalInfo] = useState<IUserPersonalInfo | null>(null);
  const [userCareerInfo, setUserCareerInfo] = useState<IUserCareerInfo | null>(null);
  const [userCv, setUserCv] = useState<IUserCV | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<IAuthContext | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await Promise.all([
        AsyncStorage.removeItem('userPersonalInfo'),
        AsyncStorage.removeItem('userCareerInfo'),
        AsyncStorage.removeItem('userCv'),
        AsyncStorage.removeItem('isLoggedIn'),
      ]);
      setSerPersonalInfo(null);
      setUserCareerInfo(null);
      setUserCv(null);
      setIsLoggedIn(null);
    } catch (e) {
      // saving error
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async () => {
    setIsLoading(true);
    try {
      await AsyncStorage.setItem('isLoggedIn', JSON.stringify({ isLoggedIn: true }));
      setIsLoggedIn({ isLoggedIn: true });
    } catch (e) {
      // saving error
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userPersonalInfoStr, userCareerInfoStr, userCVStr, isLoggedInStr] =
          await Promise.all([
            AsyncStorage.getItem('userPersonalInfo'),
            AsyncStorage.getItem('userCareerInfo'),
            AsyncStorage.getItem('userCv'),
            AsyncStorage.getItem('isLoggedIn'),
          ]);

        if (userPersonalInfoStr) {
          const userPersonalInfoData = JSON.parse(userPersonalInfoStr) as IUserPersonalInfo;
          if (userPersonalInfoData) {
            setSerPersonalInfo(userPersonalInfoData);
          }
        }

        if (userCareerInfoStr) {
          const userCareerInfoData = JSON.parse(userCareerInfoStr) as IUserCareerInfo;
          if (userCareerInfoData) {
            setUserCareerInfo(userCareerInfoData);
          }
        }

        if (userCVStr) {
          const userCVData = JSON.parse(userCVStr) as IUserCV;
          if (userCVData) {
            setUserCv(userCVData);
          }
        }

        if (isLoggedInStr) {
          const isLoggedInData = JSON.parse(isLoggedInStr);
          if (isLoggedInData !== null) {
            setIsLoggedIn(isLoggedInData);
          }
        }
      } catch (error) {
        // console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.containerIndicator}>
        <ActivityIndicator size="large" color={palette.mainColor} />
      </View>
    );
  }

  return (
    <UserContext.Provider value={{ userPersonalInfo, userCareerInfo, userCv, logout, login }}>
      <NavigationContainer>{isLoggedIn ? <Dashbord /> : <Form />}</NavigationContainer>
    </UserContext.Provider>
  );
};

export default Routes;

const styles = StyleSheet.create({
  containerIndicator: {
    alignItems: 'center',
    backgroundColor: '#ccc',
    flex: 1,
    justifyContent: 'center',
  },
});