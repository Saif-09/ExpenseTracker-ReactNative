import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Modalize } from 'react-native-modalize';
import BalanceCard from '../../components/Home/BalanceCard';
import RecentTransactions from '../../components/Home/RecentTransactions';
import TransactionBottomSheet from '../../components/Home/TransactionBottomSheet';
import SearchBottomSheet from '../../components/Home/SearchBottomSheet';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const HomeScreen = () => {
    const modalizeRef = useRef(null);
    const searchModalizeRef = useRef(null);
    const [selectedTransaction, setSelectedTransaction] = useState(null);

    const openModal = (transaction = null) => {
        setSelectedTransaction(transaction);
        modalizeRef.current?.open();
    };

    const closeModal = () => {
        setSelectedTransaction(null);
        modalizeRef.current?.close();
    };

    const openSearchModal = () => {
        searchModalizeRef.current?.open();
    };

    const closeSearchModal = () => {
        searchModalizeRef.current?.close();
    };

    const handleTransactionPress = (transaction) => {
        setSelectedTransaction(transaction); // Set the selected transaction
        closeSearchModal(); // Close the search bottom sheet
        openModal(transaction); // Open the update transaction bottom sheet
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.greeting}>Hey,</Text>
                    <Text style={styles.username}>Saif Siddiqui</Text>
                </View>
                <TouchableOpacity style={styles.searchButton} onPress={openSearchModal}>
                    <Icon name="search-outline" size={26} color="#f7f7f7" />
                </TouchableOpacity>
            </View>
            <BalanceCard />

            <RecentTransactions onTransactionPress={openModal} />

            <TouchableOpacity style={styles.floatingButton} onPress={() => openModal()}>
                <Icon name="add" size={30} color="#fff" />
            </TouchableOpacity>

            {/* Add Transaction/Update Transaction Bottom Sheet */}
            <Modalize
                ref={modalizeRef}
                snapPoint={SCREEN_HEIGHT * 0.9}
                modalHeight={SCREEN_HEIGHT}
                handlePosition="inside"
                handleStyle={{ display: 'none' }}
                HeaderComponent={
                    <SafeAreaView>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>
                                {selectedTransaction ? 'Update Transaction' : 'Add Transaction'}
                            </Text>
                            <TouchableOpacity onPress={closeModal}>
                                <Icon name="close" size={24} color="#f7f7f7" />
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                }
            >
                <TransactionBottomSheet
                    modalizeRef={modalizeRef}
                    closeModal={closeModal}
                    transaction={selectedTransaction}
                />
            </Modalize>

            {/* Search Bottom Sheet */}
            <Modalize
                ref={searchModalizeRef}
                snapPoint={SCREEN_HEIGHT * 0.9}
                modalHeight={SCREEN_HEIGHT}
                handlePosition="inside"
                handleStyle={{ display: 'none' }}
                HeaderComponent={
                    <SafeAreaView>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Search</Text>
                            <TouchableOpacity onPress={closeSearchModal}>
                                <Icon name="close" size={24} color="#f7f7f7" />
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                }
            >
                <SearchBottomSheet
                    closeModal={closeSearchModal}
                    onTransactionPress={handleTransactionPress} // Pass the handler
                />
            </Modalize>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
    },
    header: {
        width: '100%',
        paddingVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    greeting: {
        fontSize: 18,
        color: '#333',
    },
    username: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#210124',
    },
    searchButton: {
        padding: 10,
        backgroundColor: '#888',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    floatingButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#210124',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#210124',
        borderBottomWidth: 1,
        borderBottomColor: '#E2DFD0',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#f7f7f7',
    },
});

export default HomeScreen;