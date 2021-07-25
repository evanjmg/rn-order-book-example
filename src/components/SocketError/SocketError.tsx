import React from 'react'
import { Text, View } from 'react-native'
import { styles } from './SocketError.styles'

export const SocketError = () => (
  <View style={styles.container}>
    <Text style={styles.text}>
      An error occurred please check your connection and reconnect below
    </Text>
  </View>
)
