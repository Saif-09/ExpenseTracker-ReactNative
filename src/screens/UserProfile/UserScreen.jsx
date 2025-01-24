import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    ScrollView,
    Alert,
    SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // For icons
import { launchImageLibrary } from 'react-native-image-picker'; // For image picker functionality
import { useNavigation } from '@react-navigation/native'; // For navigation

const UserScreen = () => {
    const [profilePic, setProfilePic] = useState(null); // State for profile picture
    const [userName, setUserName] = useState('John Doe'); // State for user name
    const navigation = useNavigation();

    // Function to handle profile picture selection
    const openImagePicker = () => {
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
                console.log('Image picker error: ', response.error);
            } else {
                let imageUri = response.uri || response.assets?.[0]?.uri;
                setProfilePic(imageUri); // Set the selected image URI
            }
        });
    };

    // Function to handle logout
    const handleLogout = () => {
        Alert.alert('Logout', 'Are you sure you want to logout?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Logout', onPress: () => navigation.navigate('Login') }, // Navigate to Login screen
        ]);
    };

    // Function to handle change name
    const handleChangeName = () => {
        Alert.prompt('Change Name', 'Enter your new name', (newName) => {
            if (newName) {
                setUserName(newName); // Update the user name
                Alert.alert('Success', 'Name updated successfully!');
            }
        });
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.container}>
                {/* Profile Picture Section */}
                <View style={styles.profileSection}>
                    <TouchableOpacity onPress={openImagePicker}>
                        {profilePic ? (
                            <Image source={{ uri: profilePic }} style={styles.profilePic} />
                        ) : (
                            <View style={styles.profilePicPlaceholder}>
                                <Icon name="person" size={60} color="#888" />
                            </View>
                        )}
                    </TouchableOpacity>
                    <Text style={styles.userName}>{userName}</Text> {/* Display user name */}
                    <Text style={styles.profileText}>Tap to change profile picture</Text>
                </View>

                {/* More Options Section */}
                <View style={styles.optionsSection}>
                    <TouchableOpacity style={styles.optionItem} onPress={handleChangeName}>
                        <Icon name="edit" size={24} color="#210124" />
                        <Text style={styles.optionText}>Change Name</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.optionItem} onPress={() => navigation.navigate('Settings')}>
                        <Icon name="settings" size={24} color="#210124" />
                        <Text style={styles.optionText}>Settings</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.optionItem} onPress={handleLogout}>
                        <Icon name="logout" size={24} color="#210124" />
                        <Text style={styles.optionText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#f7f7f7',
        padding: 20,
    },
    profileSection: {
        alignItems: 'center',
        marginBottom: 30,
    },
    profilePic: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    profilePicPlaceholder: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#e0e0e0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    userName: {
        marginTop: 10,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#210124',
    },
    profileText: {
        marginTop: 5,
        fontSize: 16,
        color: '#888',
    },
    optionsSection: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    optionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    optionText: {
        marginLeft: 15,
        fontSize: 16,
        color: '#210124',
    },
});

export default UserScreen;