import { createSlice } from '@reduxjs/toolkit';
import { saveState } from '../utils/asyncStorage';

const initialState = {
    wallets: [
        { name: 'Salary', balance: 0 },
        { name: 'Freelance', balance: 0 },
    ],
};

const walletSlice = createSlice({
    name: 'wallets',
    initialState,
    reducers: {
        addWallet: (state, action) => {
            const { name } = action.payload;
            state.wallets.push({ name, balance: 0 });
            saveState('wallets', state); // Save updated state to AsyncStorage
        },
        updateWalletBalance: (state, action) => {
            const { walletName, amount } = action.payload;
            const wallet = state.wallets.find((w) => w.name === walletName);
            if (wallet) {
                wallet.balance += amount;
                saveState('wallets', state); // Save updated state to AsyncStorage
            }
        },
    },
});

export const { addWallet, updateWalletBalance } = walletSlice.actions;
export default walletSlice.reducer;