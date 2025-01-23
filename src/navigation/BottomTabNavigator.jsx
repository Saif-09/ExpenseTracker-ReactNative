import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from '../screens/Home/HomeScreen';
import StatisticsScreen from '../screens/Statistics/StatisticsScreen';
import WalletScreen from '../screens/Wallet/WalletScreen';
import UserScreen from '../screens/UserProfile/UserScreen';


const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Statistics') {
                        iconName = focused ? 'bar-chart' : 'bar-chart-outline';
                    } else if (route.name === 'Wallets') {
                        iconName = focused ? 'wallet' : 'wallet-outline';
                    } else if (route.name === 'User') {
                        iconName = focused ? 'person' : 'person-outline';
                    }

                    return <Icon name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#6200ee',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: { paddingBottom: 5, height: 60 },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
            <Tab.Screen name="Statistics" component={StatisticsScreen} options={{ title: 'Stats' }} />
            <Tab.Screen name="Wallets" component={WalletScreen} options={{ title: 'Wallets' }} />
            <Tab.Screen name="User" component={UserScreen} options={{ title: 'Profile' }} />
        </Tab.Navigator>
    );
};

export default BottomTabNavigator;