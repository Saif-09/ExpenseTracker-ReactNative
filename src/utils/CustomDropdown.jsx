import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Platform } from 'react-native';
import { Portal, Modal } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

const CustomDropdown = ({ label, options, selectedValue, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleSelect = (value) => {
        onSelect(value);
        setIsOpen(false);
    };

    return (
        <View style={styles.dropdownContainer}>
            <Text style={styles.label}>{label}</Text>
            <TouchableOpacity style={styles.dropdownHeader} onPress={toggleDropdown}>
                <Text style={styles.selectedValue}>
                    {selectedValue ? selectedValue.label : `Select ${label}`}
                </Text>
                <Icon name={isOpen ? 'chevron-up' : 'chevron-down'} size={20} color="#210124" />
            </TouchableOpacity>

            {/* Modal with improved UI */}
            <Portal>
                <Modal
                    visible={isOpen}
                    onDismiss={() => setIsOpen(false)}
                    contentContainerStyle={styles.modalContainer}
                >
                    <View style={styles.modalContent}>
                        <FlatList
                            data={options}
                            keyExtractor={(item) => item.value}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity
                                    style={[
                                        styles.modalItem,
                                        index === options.length - 1 && styles.noBorderBottom
                                    ]}
                                    onPress={() => handleSelect(item)}
                                >
                                    <Text style={styles.modalItemText}>{item.label}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </Modal>
            </Portal>
        </View>
    );
};

const styles = StyleSheet.create({
    dropdownContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#210124',
        marginBottom: 8,
    },
    dropdownHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E2DFD0',
        borderRadius: 10,
        padding: 12,
    },
    selectedValue: {
        fontSize: 16,
        color: '#210124',
    },
    // Improved Modal Styles
    modalContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    modalContent: {
        width: '90%',
        maxHeight: 300,
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 15,
    },
    modalItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E2DFD0',
    },
    noBorderBottom: {
        borderBottomWidth: 0, // Remove the bottom border for the last item
    },
    modalItemText: {
        fontSize: 16,
        color: '#210124',
    },
});

export default CustomDropdown;