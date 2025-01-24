import { configureStore } from '@reduxjs/toolkit';
import transactionReducer from './transactionSlice';
import walletReducer from './walletSlice'; 
import budgetReducer from './budgetSlice';

export const store = configureStore({
    reducer: {
        transactions: transactionReducer,
        wallets: walletReducer,
        budgets: budgetReducer,
    },
});