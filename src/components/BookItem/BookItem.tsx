import React from 'react'
import { Text, View } from 'react-native'
import { SectionType } from 'src/enums/SectionType'
import { BookItemCell } from 'src/models/BookItemCell'
import { colors } from 'src/styles/colors.styles'
import { styles } from './BookItem.styles'

export interface BookItemProps {
  data: BookItemCell
  type: SectionType
}

export const BookItem = ({ type, data: { priceString,sizeString, totalString, relativeSize } }: BookItemProps) => {
  const isAsk = type === SectionType.asks
  const color = isAsk ? colors.ASK : colors.BID;
  const textStyle = [{ color }]

  return (
    <View>
      <View style={styles.content}>
        <Text style={textStyle}>{priceString}</Text>
        <Text style={textStyle}>{sizeString}</Text>
        <Text style={textStyle}>{totalString}</Text>
      </View>
      <View style={[styles.bar, { width: `${relativeSize * 100}%` },  { backgroundColor: color  }]} />
    </View>
  )
}