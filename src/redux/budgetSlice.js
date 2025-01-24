import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
    budgets: [],
};

const budgetSlice = createSlice({
    name: 'budgets',
    initialState,
    reducers: {
        setBudgets: (state, action) => {
            state.budgets = action.payload;
        },
        addBudget: (state, action) => {
            state.budgets.push(action.payload);
        },
        updateBudgetSpentAmount: (state, action) => {
            const { category, amount } = action.payload;
            const budget = state.budgets.find((b) => b.category === category);
            if (budget) {
                budget.spentAmount += amount;
            }
        },
    },
});

// Helper function to save budgets to AsyncStorage
export const saveBudgetsToStorage = (budgets) => async (dispatch) => {
    try {
        await AsyncStorage.setItem('budgets', JSON.stringify(budgets));
    } catch (error) {
        console.error('Failed to save budgets:', error);
    }
};

// Helper function to load budgets from AsyncStorage
export const loadBudgetsFromStorage = () => async (dispatch) => {
    try {
        const savedBudgets = await AsyncStorage.getItem('budgets');
        if (savedBudgets) {
            dispatch(setBudgets(JSON.parse(savedBudgets)));
        }
    } catch (error) {
        console.error('Failed to load budgets:', error);
    }
};

export const { setBudgets, addBudget, updateBudgetSpentAmount } = budgetSlice.actions;
export default budgetSlice.reducer;