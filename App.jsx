import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppNavigator from './src/navigation/AppNavigator'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';


const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1, }}>
      <Provider store={store}>
        <PaperProvider>
          <AppNavigator />
        </PaperProvider>
      </Provider>
    </GestureHandlerRootView>
  )
}

export default App

const styles = StyleSheet.create({})