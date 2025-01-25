import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import AppNavigator from './src/navigation/AppNavigator';
import initializeStore from './src/redux/store'; 
const App = () => {
  const [store, setStore] = useState(null); 
  const [isLoading, setIsLoading] = useState(true); 
  useEffect(() => {
    const initStore = async () => {
      const storeInstance = await initializeStore(); 
      setStore(storeInstance); 
      setIsLoading(false); 
    };

    initStore(); 
  }, []);

  if (isLoading || !store) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PaperProvider>
          <AppNavigator />
        </PaperProvider>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});