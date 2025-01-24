import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import FastImage from 'react-native-fast-image';

const SplashScreen = () => {
    const image = require('../../assets/images/splashImageGif.gif');
    const navigation = useNavigation();
    const handleGetStarted = () => {
        navigation.navigate('Home');
    }
    return (
        <View style={styles.container}>
            <FastImage
                style={styles.image}
                source={image}
                resizeMode={FastImage.resizeMode.contain}
            />

            <View style={styles.footer}>
                <Text style={styles.footerText}>Master your money, master your life</Text>
                <Text style={styles.footerSubText}>Smart finances today, freedom tomorrow</Text>
            </View>

            <TouchableOpacity
                onPress={handleGetStarted}
                style={styles.button}>
                <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
        </View>
    );
};

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F7F9F7',
        paddingHorizontal: 20,
    },
    image: {
        width: 250,
        height: 250,
        marginBottom: 100,
    },
    footer: {
        alignItems: 'center',
        marginBottom: 40,
    },
    footerText: {
        fontSize: 32,
        fontWeight: '800',
        color: '#120114',
        textAlign: 'center',
        marginBottom: 18,
    },
    footerSubText: {
        fontSize: 16,
        color: '#35033A',
        textAlign: 'center',
        fontWeight: '400',
    },
    button: {
        width: '100%',
        backgroundColor: '#210124',
        paddingVertical: 18,
        borderRadius: 12,
        position: 'absolute',
        bottom: 40,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#ffffff',
    },
});