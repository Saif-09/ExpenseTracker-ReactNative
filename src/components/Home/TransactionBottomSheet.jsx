import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, ScrollView, StyleSheet, KeyboardAvoidingView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-date-picker';
import { launchImageLibrary } from 'react-native-image-picker';
import CustomDropdown from '../../utils/CustomDropdown';
import { isIOS } from '../../utils/responsiveUtil';
import { categoryOptions } from '../../assets/expenseCategory';
import { useDispatch, useSelector } from 'react-redux';
import { addTransaction, updateTransaction } from '../../redux/transactionSlice';
import { updateWalletBalance } from '../../redux/walletSlice';


const TransactionBottomSheet = ({ modalizeRef, closeModal, transaction }) => {
    const dispatch = useDispatch();
    const wallets = useSelector((state) => state.wallets.wallets); // Fetch wallets from walletSlice
    const [type, setType] = useState(transaction?.type ? { label: transaction.type === 'income' ? 'Income' : 'Expense', value: transaction.type } : null);
    const [wallet, setWallet] = useState(transaction?.wallet ? { label: transaction.wallet, value: transaction.wallet } : null);
    const [category, setCategory] = useState(transaction?.category ? { label: transaction.category, value: transaction.category } : null);
    const [date, setDate] = useState(transaction?.date ? new Date(transaction.date) : new Date());
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [amount, setAmount] = useState(transaction?.amount?.toString() || '');
    const [description, setDescription] = useState(transaction?.description || '');

    const typeOptions = [
        { label: 'Expense', value: 'expense' },
        { label: 'Income', value: 'income' },
    ];

    const walletOptions = wallets.map((wallet) => ({
        label: wallet.name,
        value: wallet.name,
    }));

    const handleDateConfirm = (selectedDate) => {
        setDatePickerVisible(false);
        setDate(selectedDate);
    };

    const formatDate = (date) => {
        return date.toLocaleDateString();
    };

    const handleUploadReceipt = () => {
        const options = {
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 2000,
            maxWidth: 2000,
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.assets && response.assets.length > 0) {
                const source = { uri: response.assets[0].uri };
                setUploadedImage(source);
            }
        });
    };

    const handleRemoveImage = () => {
        setUploadedImage(null);
    };

    const handleSubmit = () => {
        if (!type || !amount || !description || !wallet) {
            alert('Please fill all required fields');
            return;
        }

        const transactionData = {
            id: transaction?.id || Date.now().toString(),
            type: type.value,
            amount,
            category: category?.value || 'Other',
            description,
            date,
            wallet: wallet.value,
        };

        if (transaction) {
            // Revert old transaction amounts
            dispatch(
                updateWalletBalance({
                    walletName: transaction.wallet,
                    amount: transaction.type === 'income' ? -transaction.amount : transaction.amount,
                })
            );

            // Apply new transaction amounts
            dispatch(
                updateWalletBalance({
                    walletName: wallet.value,
                    amount: type.value === 'income' ? parseFloat(amount) : -parseFloat(amount),
                })
            );

            dispatch(updateTransaction(transactionData));
        } else {
            dispatch(
                updateWalletBalance({
                    walletName: wallet.value,
                    amount: type.value === 'income' ? parseFloat(amount) : -parseFloat(amount),
                })
            );

            dispatch(addTransaction(transactionData));
        }

        closeModal();
        setAmount('');
        setDescription('');
        setType(null);
        setCategory(null);
        setWallet(null);
        setUploadedImage(null);
    };

    return (
        <KeyboardAvoidingView
            behavior={isIOS ? 'padding' : 'height'}
            style={{ flex: 1 }}
            keyboardVerticalOffset={isIOS ? 40 : 0}
        >
            <ScrollView contentContainerStyle={styles.modalContent} nestedScrollEnabled>
                <CustomDropdown
                    label="Type"
                    options={typeOptions}
                    selectedValue={type}
                    onSelect={setType}
                />

                <CustomDropdown
                    label="Wallet"
                    options={walletOptions}
                    selectedValue={wallet}
                    onSelect={setWallet}
                />

                {type?.value === 'expense' && (
                    <CustomDropdown
                        label="Expense Category"
                        options={categoryOptions}
                        selectedValue={category}
                        onSelect={setCategory}
                    />
                )}

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Date</Text>
                    <TouchableOpacity
                        style={styles.input}
                        onPress={() => setDatePickerVisible(true)}
                    >
                        <Text style={styles.dateText}>{formatDate(date)}</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Amount</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Amount"
                        placeholderTextColor="#888"
                        keyboardType="numeric"
                        value={amount}
                        onChangeText={setAmount}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Description"
                        placeholderTextColor="#888"
                        multiline
                        value={description}
                        onChangeText={setDescription}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Receipt</Text>
                    <TouchableOpacity style={styles.uploadButton} onPress={handleUploadReceipt}>
                        <Text style={styles.uploadText}>Upload Receipt</Text>
                    </TouchableOpacity>
                    {uploadedImage && (
                        <View style={styles.uploadedImageContainer}>
                            <Image source={uploadedImage} style={styles.uploadedImage} />
                            <TouchableOpacity
                                style={styles.removeImageButton}
                                onPress={handleRemoveImage}
                            >
                                <Icon name="trash-outline" size={20} color="#fff" />
                            </TouchableOpacity>
                        </View>
                    )}
                </View>

                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitText}>{transaction ? 'Update' : 'Submit'}</Text>
                </TouchableOpacity>
            </ScrollView>

            <DatePicker
                modal
                open={isDatePickerVisible}
                date={date}
                mode="date"
                onConfirm={handleDateConfirm}
                onCancel={() => setDatePickerVisible(false)}
            />
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    modalContent: {
        padding: 20,
        paddingBottom: 100,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#210124',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#E2DFD0',
        borderRadius: 10,
        padding: 12,
        fontSize: 16,
        color: '#210124',
    },
    uploadButton: {
        borderWidth: 1,
        borderColor: '#E2DFD0',
        borderRadius: 10,
        padding: 12,
        alignItems: 'center',
    },
    uploadText: {
        fontSize: 16,
        color: '#210124',
    },
    uploadedImageContainer: {
        position: 'relative',
        marginTop: 10,
        width: '50%',
    },
    uploadedImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    removeImageButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderRadius: 15,
        padding: 5,
    },
    submitButton: {
        backgroundColor: '#210124',
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
    },
    submitText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
});

export default TransactionBottomSheet;