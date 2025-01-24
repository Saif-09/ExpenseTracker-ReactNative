import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { categoryIcons } from '../../assets/icons/categoryIcons';

const SearchBottomSheet = ({ closeModal, onTransactionPress }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const transactions = useSelector((state) => state.transactions.transactions);

    // Filter transactions based on search query
    const filteredTransactions = transactions.filter((transaction) =>
        transaction.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search transactions..."
                    placeholderTextColor="#888"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>

            <ScrollView contentContainerStyle={styles.transactionList}>
                {filteredTransactions.length > 0 ? (
                    filteredTransactions.map((transaction) => (
                        <TouchableOpacity
                            key={transaction.id}
                            style={styles.transactionCard}
                            onPress={() => onTransactionPress(transaction)} // Handle transaction click
                        >
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
                        </TouchableOpacity>
                    ))
                ) : (
                    <View style={styles.emptyStateContainer}>
                        <Icon name="search-outline" size={50} color="#888" />
                        <Text style={styles.emptyStateText}>No transactions found</Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    searchInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#E2DFD0',
        borderRadius: 24,
        padding: 12,
        fontSize: 16,
        color: '#210124',
        marginRight: 10,
    },
    transactionList: {
        paddingBottom: 20,
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
        marginTop: 200,
    },
    emptyStateText: {
        fontSize: 18,
        color: '#888',
        marginTop: 10,
    },
});

export default SearchBottomSheet;