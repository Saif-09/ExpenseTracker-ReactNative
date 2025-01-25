// utils/asyncStorage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveState = async (key, state) => {
    try {
        const serializedState = JSON.stringify(state);
        await AsyncStorage.setItem(key, serializedState);
    } catch (error) {
        console.error('Error saving state to AsyncStorage:', error);
    }
};

export const loadState = async (key) => {
    try {
        const serializedState = await AsyncStorage.getItem(key);
        if (serializedState === null) return undefined;
        return JSON.parse(serializedState);
    } catch (error) {
        console.error('Error loading state from AsyncStorage:', error);
        return undefined;
    }
};