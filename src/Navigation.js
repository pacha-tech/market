import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from './screens/HomeScreen';
import Choix from './screens/Choix';
import Moi from './screens/Moi';
import Historique from './screens/Historique';

const Tab = createBottomTabNavigator();

const screenOptions = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let iconName;

    if (route.name === 'Home') {
      iconName = focused ? 'home' : 'home-outline';
    } else if (route.name === 'Choix') {
      iconName = focused ? 'options' : 'options-outline'; // ✅ Icône valide pour "choix"
    } else if (route.name === 'Historique') {
      iconName = focused ? 'time' : 'time-outline'; // ✅ Icône valide pour "historique"
    } else if (route.name === 'Moi') {
      iconName = focused ? 'person' : 'person-outline';
    }

    return <Icon name={iconName} size={size} color={color} />;
  },
  tabBarActiveTintColor: 'green',
  tabBarInactiveTintColor: 'gray',
});

export default function Navigation() {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Choix" component={Choix} />
      <Tab.Screen name="Historique" component={Historique} />
      <Tab.Screen name="Moi" component={Moi} />
    </Tab.Navigator>
  );
}
