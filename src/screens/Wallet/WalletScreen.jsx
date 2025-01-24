import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux';
import { addWallet } from '../../redux/walletSlice';

const WalletScreen = () => {
    const dispatch = useDispatch();
    const wallets = useSelector((state) => state.wallets.wallets); // Fetch wallets from walletSlice
    const [newWalletName, setNewWalletName] = useState('');
    const [isAddingWallet, setIsAddingWallet] = useState(false);

    const handleAddWallet = () => {
        if (newWalletName.trim()) {
            dispatch(addWallet({ name: newWalletName })); // Dispatch addWallet action
            setNewWalletName('');
            setIsAddingWallet(false);
        }
    };

    return (
        <SafeAreaView style={{flex:1}}>
            <ScrollView contentContainerStyle={styles.container}>
            {/* Total Balance Section */}
            <View style={styles.totalBalanceContainer}>
                <Text style={styles.totalBalanceLabel}>Total Balance</Text>
                <Text style={styles.totalBalanceAmount}>
                    ₹{wallets.reduce((total, wallet) => total + wallet.balance, 0).toFixed(2)}
                </Text>
            </View>

            {/* Individual Wallets Section */}
            <View style={styles.walletsContainer}>
                <Text style={styles.walletsTitle}>Your Wallets</Text>
                {wallets.map((wallet, index) => (
                    <View key={index} style={styles.walletCard}>
                        <Text style={styles.walletName}>{wallet.name}</Text>
                        <Text style={styles.walletBalance}>₹{wallet.balance.toFixed(2)}</Text>
                    </View>
                ))}
            </View>

            {/* Add Wallet Section */}
            {isAddingWallet ? (
                <View style={styles.addWalletContainer}>
                    <TextInput
                        style={styles.addWalletInput}
                        placeholder="Enter wallet name"
                        placeholderTextColor="#888"
                        value={newWalletName}
                        onChangeText={setNewWalletName}
                    />
                    <TouchableOpacity style={styles.addWalletButton} onPress={handleAddWallet}>
                        <Text style={styles.addWalletButtonText}>Add Wallet</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <TouchableOpacity style={styles.addWalletToggle} onPress={() => setIsAddingWallet(true)}>
                    <Icon name="add" size={24} color="#210124" />
                    <Text style={styles.addWalletToggleText}>Add Wallet</Text>
                </TouchableOpacity>
            )}
        </ScrollView>
        </SafeAreaView>
        
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#f7f7f7',
    },
    totalBalanceContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    totalBalanceLabel: {
        fontSize: 18,
        color: '#888',
    },
    totalBalanceAmount: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#210124',
    },
    walletsContainer: {
        marginBottom: 20,
    },
    walletsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#210124',
        marginBottom: 15,
    },
    walletCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    walletName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#210124',
    },
    walletBalance: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#210124',
    },
    addWalletContainer: {
        marginTop: 20,
    },
    addWalletInput: {
        borderWidth: 1,
        borderColor: '#E2DFD0',
        borderRadius: 10,
        padding: 12,
        fontSize: 16,
        color: '#210124',
        marginBottom: 10,
    },
    addWalletButton: {
        backgroundColor: '#210124',
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
    },
    addWalletButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    addWalletToggle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    addWalletToggleText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#210124',
        marginLeft: 10,
    },
});

export default WalletScreen;