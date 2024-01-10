import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';


import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { palette } from '../theme';
import UserDashboard from '../screens/UserDashboard';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { backgroundColor: palette.mainColor },
        tabBarInactiveTintColor: '#fff',
        tabBarActiveTintColor: 'yellow',
      }}>

       <Tab.Screen
        name="UserDashboards"
        component={UserDashboard}
        options={{
          tabBarBadge: 3,
          tabBarBadgeStyle: { backgroundColor: 'yellow' },
          tabBarIcon: ({ color, size }) => <MaterialIcons name="table-view" color={color} size={size} />,
          title: 'Tables',
          headerShown: true,
        }}
      /> 
    </Tab.Navigator>
  );
};

export default TabNavigator;