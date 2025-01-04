import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from 'screens/home';
import FavoriteScreen from 'screens/favorite';
import DetailsScreen from 'screens/details';
import TabBar from 'components/tab-bar';
import ListHeader from 'components/list-header';
import DetailsHeader from 'screens/details/header';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator tabBar={TabBar}>
      <Tab.Screen name="Home" component={HomeScreen} options={{
        headerShown: false,
      }}/>
      <Tab.Screen name="Favorite" component={FavoriteScreen} options={{
        headerShown: false,
      }}/>
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="List" component={TabNavigation} options={{
        header: ListHeader,
      }}/>
      <Stack.Screen name="Details" component={DetailsScreen} options={{
        header: DetailsHeader,
      }}/>
    </Stack.Navigator>
  );
}