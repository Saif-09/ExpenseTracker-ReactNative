import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';

const BalanceCard = () => {
    const { balance, income, expense } = useSelector((state) => state.transactions);

    return (
        <View style={styles.card}>
            <Text style={styles.totalBalanceLabel}>Total Balance</Text>
            <Text style={styles.totalBalanceValue}>₹ {balance.toFixed(2)}</Text>

            <View style={styles.row}>
                <View style={styles.column}>
                    <View style={styles.row}>
                        <Icon name="arrow-downward" size={20} color="#889E73" />
                        <Text style={styles.incomeLabel}> Income</Text>
                    </View>
                    <Text style={styles.incomeValue}>₹ {income.toFixed(2)}</Text>
                </View>

                <View style={styles.column}>
                    <View style={styles.row}>
                        <Icon name="arrow-upward" size={20} color="#A94A4A" />
                        <Text style={styles.expenseLabel}> Expense</Text>
                    </View>
                    <Text style={styles.expenseValue}>₹ {expense.toFixed(2)}</Text>
                </View>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    card: {
        backgroundColor: "#EFF3EA",
        borderRadius: 24,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 25,
        width: "88%",
        alignSelf: "center",
    },
    totalBalanceLabel: {
        fontSize: 16,
        color: "#888",
        marginBottom: 8,
    },
    totalBalanceValue: {
        fontSize: 36,
        fontWeight: "bold",
        color: "#000",
        marginBottom: 20,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    column: {
        alignItems: "center",
    },
    incomeLabel: {
        fontSize: 16,
        color: "#888",
    },
    expenseLabel: {
        fontSize: 16,
        color: "#888",
    },
    incomeValue: {
        fontSize: 20,
        color: "#889E73",
        fontWeight: "bold",
        marginTop: 5,
    },
    expenseValue: {
        fontSize: 20,
        color: "#A94A4A",
        fontWeight: "bold",
        marginTop: 5,
    },
});

export default BalanceCard;