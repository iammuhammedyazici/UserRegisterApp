import {createDrawerNavigator} from '@react-navigation/drawer';
import AboutScreen from '../pages/AboutScreen';
import HomeScreen from '../pages/HomeScreen';
import {NavigationContainer} from '@react-navigation/native';

const Drawer = createDrawerNavigator();

export default function MyDrawer() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Feed" component={HomeScreen} />
        <Drawer.Screen name="Article" component={AboutScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
