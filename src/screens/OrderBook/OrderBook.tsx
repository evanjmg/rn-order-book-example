import React from 'react'
import { View } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { BookContainer } from 'src/containers/BookContainer'
import { FooterContainer } from 'src/containers/FooterContainer'
import { HeaderContainer } from 'src/containers/HeaderContainer'
import { styles } from './OrderBook.styles'

export const OrderBook = () => {
    const { top, bottom } = useSafeAreaInsets()
    return (
      <View style={styles.container}>
          <View style={{ flex: 1, paddingBottom: bottom, paddingTop: top }}>
            <View style={{ flex: 0.1 }}>
              <HeaderContainer />
            </View>
            <View style={{ flex: 0.8 }}>
              <BookContainer />
            </View>
            <View style={{ flex: 0.1 }}>
              <FooterContainer />
            </View>
          </View>
      </View>
    )
}