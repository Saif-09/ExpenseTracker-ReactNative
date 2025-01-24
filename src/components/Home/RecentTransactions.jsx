import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { categoryIcons } from '../../assets/icons/categoryIcons';

const RecentTransactions = ({ onTransactionPress }) => {
    const transactions = useSelector((state) => state.transactions.transactions);

    if (transactions.length === 0) {
        return (
            <View style={styles.emptyStateContainer}>
                <Icon name="wallet-outline" size={60} color="#888" />
                <Text style={styles.emptyStateText}>No transactions yet</Text>
                <Text style={styles.emptyStateSubText}>Start adding transactions to see them here.</Text>
            </View>
        );
    }

    return (
        <View style={styles.recentTransactionsContainer}>
            <View style={{ width: '100%', paddingHorizontal: 18 }}>
                <Text style={styles.recentTransactionsTitle}>Recent Transactions</Text>
            </View>

            <ScrollView contentContainerStyle={{ paddingBottom: 70 }}>
                {transactions.map((transaction) => (
                    <TouchableOpacity
                        key={transaction.id}
                        onPress={() => onTransactionPress(transaction)}
                    >
                        <View style={styles.transactionCard}>
                            <View style={styles.transactionLeft}>
                                <View style={styles.iconContainer}>
                                    <Icon
                                        name={categoryIcons[transaction.category] || 'ellipsis-horizontal-outline'}
                                        size={24}
                                        color="#210124"
                                    />
                                </View>
                                <View>
                                    <Text style={styles.categoryText}>{transaction.category}</Text>
                                    <Text style={styles.descriptionText}>{transaction.description}</Text>
                                    <Text style={styles.walletText}>Wallet: {transaction.wallet}</Text>
                                </View>
                            </View>
                            <View style={styles.transactionRight}>
                                <Text
                                    style={[
                                        styles.amountText,
                                        transaction.type === 'income' ? styles.income : styles.expense,
                                    ]}
                                >
                                    {transaction.type === 'income' ? '+₹' : '-₹'}
                                    {Math.abs(transaction.amount)}
                                </Text>
                                <Text style={styles.dateText}>{transaction.date}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    recentTransactionsContainer: {
        flex: 1,
        marginTop: 40,
        paddingHorizontal: 10,
    },
    recentTransactionsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#210124',
        marginBottom: 10,
    },
    transactionCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#E2DFD0',
    },
    transactionLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        backgroundColor: '#f0f0f0',
        borderRadius: 20,
        padding: 10,
        marginRight: 15,
    },
    categoryText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#210124',
        textTransform: 'capitalize',
    },
    descriptionText: {
        fontSize: 14,
        color: '#555',
        marginTop: 2,
    },
    walletText: {
        fontSize: 12,
        color: '#888',
        marginTop: 2,
    },
    transactionRight: {
        alignItems: 'flex-end',
    },
    amountText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    income: {
        color: '#889E73',
    },
    expense: {
        color: '#A94A4A',
    },
    dateText: {
        fontSize: 12,
        color: '#888',
        marginTop: 4,
    },
    emptyStateContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyStateText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#888',
        marginTop: 10,
    },
    emptyStateSubText: {
        fontSize: 14,
        color: '#888',
        marginTop: 5,
        textAlign: 'center',
    },
});

export default RecentTransactions;