import React from 'react'
import { Text, View } from 'react-native'
import { styles } from './SpreadCell.styles'

export interface SpreadCellProps {
  spread: string
}
export const SpreadCell = ({ spread }) => {
  return <View style={styles.container}>
    <Text style={styles.text}>Spread: {spread}</Text>
  </View>
}