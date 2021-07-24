import React from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BookContainer } from 'src/containers/BookContainer'
import { HeaderContainer } from 'src/containers/HeaderContainer'
import { styles } from './OrderBook.styles'

export const OrderBook = () => {
    return (
      <View style={styles.container}>
        <SafeAreaView>
          <View>
            <HeaderContainer />
            <BookContainer />
          </View>
        </SafeAreaView>
      </View>
    )
}