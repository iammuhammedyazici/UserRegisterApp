import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import CustomDrawer from '../components/CustomDrawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { palette } from '../theme';
import UserSkills from '../screens/UserSkills';
import UserProjects from '../screens/UserProjects';



const Drawer = createDrawerNavigator();

const Dashbord = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: palette.mainColor,
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          marginLeft: -25,
          fontFamily: 'Roboto-Medium',
          fontSize: 15,
        },
      }}>
      <Drawer.Screen
        name="Skills"
        component={UserSkills}
        options={{
          drawerIcon: ({ color }) => <Ionicons name="code-slash-outline" size={22} color={color} />,
          title: 'Skills',
          headerShown: true,
        }}
      />
      <Drawer.Screen
        name="Projects"
        component={UserProjects}
        options={{
          drawerIcon: ({ color }) => <Ionicons name="rocket-outline" size={22} color={color} />,
          title: 'Projects',
          headerShown: true,
        }}
      /> 
      
    </Drawer.Navigator>
  );
};

export default Dashbord;