import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { Provider } from 'react-redux'
import { store } from 'src/state/store'
import { OrderBook } from 'src/screens/OrderBook/OrderBook'
import { colors } from 'src/styles/colors.styles'

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor={colors.BACKGROUND} style="light" />
      <Provider store={store}>
        <OrderBook />
      </Provider>
    </SafeAreaProvider>
  )
}