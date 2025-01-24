import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    transactions: [],
    balance: 0,
    income: 0,
    expense: 0,
    wallets: {
        salary: 0,
        freelancing: 0,
        sideHustle: 0,
    },
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
                state.wallets[wallet] += parseFloat(amount);
            } else {
                state.balance -= parseFloat(amount);
                state.expense += parseFloat(amount);
                state.wallets[wallet] -= parseFloat(amount);
            }
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

            // Revert old transaction amounts
            if (oldTransaction.type === 'income') {
                state.balance -= oldTransaction.amount;
                state.income -= oldTransaction.amount;
                state.wallets[oldTransaction.wallet] -= oldTransaction.amount;
            } else {
                state.balance += oldTransaction.amount;
                state.expense -= oldTransaction.amount;
                state.wallets[oldTransaction.wallet] += oldTransaction.amount;
            }

            // Apply new transaction amounts
            if (type === 'income') {
                state.balance += parseFloat(amount);
                state.income += parseFloat(amount);
                state.wallets[wallet] += parseFloat(amount);
            } else {
                state.balance -= parseFloat(amount);
                state.expense += parseFloat(amount);
                state.wallets[wallet] -= parseFloat(amount);
            }

            state.transactions[transactionIndex] = newTransaction;
        },
    },
});

export const { addTransaction, updateTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;