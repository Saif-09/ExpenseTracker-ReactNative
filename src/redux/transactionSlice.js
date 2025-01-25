import { createSlice } from '@reduxjs/toolkit';
import { saveState } from '../utils/asyncStorage';

const initialState = {
    transactions: [],
    balance: 0,
    income: 0,
    expense: 0,
};

const transactionSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        addTransaction: (state, action) => {
            const { type, amount, category, description, date, wallet } = action.payload;

            const transactionCategory = type === 'income' ? 'Income' : category;

            const newTransaction = {
                id: Date.now().toString(),
                type,
                amount: parseFloat(amount),
                category: transactionCategory,
                description,
                date: date.toLocaleDateString(),
                icon: type === 'income' ? 'arrow-downward' : 'arrow-upward',
                wallet,
            };

            state.transactions.unshift(newTransaction);

            if (type === 'income') {
                state.balance += parseFloat(amount);
                state.income += parseFloat(amount);
            } else {
                state.balance -= parseFloat(amount);
                state.expense += parseFloat(amount);
            }

            saveState('transactions', state);
        },
        updateTransaction: (state, action) => {
            const { id, type, amount, category, description, date, wallet } = action.payload;

            const transactionIndex = state.transactions.findIndex((t) => t.id === id);
            if (transactionIndex === -1) return;

            const oldTransaction = state.transactions[transactionIndex];
            const newTransaction = {
                ...oldTransaction,
                type,
                amount: parseFloat(amount),
                category: type === 'income' ? 'Income' : category,
                description,
                date: date.toLocaleDateString(),
                wallet,
            };

            if (oldTransaction.type === 'income') {
                state.balance -= oldTransaction.amount;
                state.income -= oldTransaction.amount;
            } else {
                state.balance += oldTransaction.amount;
                state.expense -= oldTransaction.amount;
            }

            if (type === 'income') {
                state.balance += parseFloat(amount);
                state.income += parseFloat(amount);
            } else {
                state.balance -= parseFloat(amount);
                state.expense += parseFloat(amount);
            }

            state.transactions[transactionIndex] = newTransaction;

            saveState('transactions', state);
        },
    },
});

export const { addTransaction, updateTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;