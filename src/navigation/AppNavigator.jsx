import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/Splash/SplashScreen';
import BottomTabNavigator from './BottomTabNavigator';


const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Splash" component={SplashScreen} />
                {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
                <Stack.Screen name="Home" component={BottomTabNavigator} />
                {/* <Stack.Screen name="SearchResultsPage" component={SearchResultsPage} /> */}
                {/* <Stack.Screen name="WebView" component={WebViewScreen} /> */}

            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;