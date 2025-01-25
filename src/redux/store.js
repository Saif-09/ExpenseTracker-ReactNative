import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import transactionReducer from './transactionSlice';
import walletReducer from './walletSlice';
import { loadState, saveState } from '../utils/asyncStorage';

const rootReducer = combineReducers({
    transactions: transactionReducer,
    wallets: walletReducer,
});

const initializeStore = async () => {
    const persistedState = await loadState('reduxState'); 

    const store = configureStore({
        reducer: rootReducer,
        preloadedState: persistedState || undefined, 
    });

    store.subscribe(() => {
        const state = store.getState();
        saveState('reduxState', state); 
    });

    return store;
};

export default initializeStore;