import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/Home/HomeScreen';
import StatisticsScreen from '../screens/Statistics/StatisticsScreen';
import WalletScreen from '../screens/Wallet/WalletScreen';
import UserScreen from '../screens/UserProfile/UserScreen';
import { isIOS } from '../utils/responsiveUtil';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home-sharp' : 'home-outline';
                    } else if (route.name === 'Statistics') {
                        iconName = focused ? 'bar-chart' : 'bar-chart-outline';
                    } else if (route.name === 'Wallets') {
                        iconName = focused ? 'wallet' : 'wallet-outline';
                    } else if (route.name === 'User') {
                        iconName = focused ? 'person' : 'person-outline';
                    }

                    return <Icon name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#210124',
                tabBarInactiveTintColor: 'gray',
                tabBarShowLabel: false,
                tabBarStyle: {
                    height: isIOS ? 80 : 60,
                    paddingTop: 10,
                    backgroundColor: '#F7F9F7',
                    borderTopWidth: 0,
                    elevation: 20,
                    shadowOpacity: 0.1,
                    shadowRadius: 5,
                    borderTopLeftRadius: 32,
                    borderTopRightRadius: 32,

                    shadowOffset: { width: 0, height: -3 },
                },
                headerShown: false,
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Statistics" component={StatisticsScreen} />
            <Tab.Screen name="Wallets" component={WalletScreen} />
            <Tab.Screen name="User" component={UserScreen} />
        </Tab.Navigator>
    );
};

export default BottomTabNavigator;