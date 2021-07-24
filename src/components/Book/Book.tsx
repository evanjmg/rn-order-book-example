import React, { FunctionComponent } from 'react'
import { SectionList, Text, View } from 'react-native'
import { SectionType } from 'src/enums/SectionType'
import { BookItemCell } from 'src/models/BookItemCell'
import { BookSection } from 'src/models/BookSection'
import { BookItem } from '../BookItem/BookItem'
import { styles } from './Book.styles'
import { SpreadCell } from '../SpreadCell/SpreadCell'
import { SPACE_2, TOP_HEADER_HEIGHT } from 'src/styles/spacers.styles'

export interface BookProps {
  sections: BookSection[]
}
export const Book: FunctionComponent<BookProps> = ({ sections }) => {
  return (
    <>
      <View style={styles.head}>
        <Text style={styles.headTitle}>Price</Text>
        <Text style={styles.headTitle}>Size</Text>
        <Text style={styles.headTitle}>Total</Text>
      </View>
      <SectionList
        renderItem={({ item, section: { key } }) =>
          key === SectionType.spread ? (
            <SpreadCell spread={item.priceString} />
          ) : (
            <BookItem type={key} data={item as BookItemCell} />
          )
        }
        contentContainerStyle={{ paddingBottom: TOP_HEADER_HEIGHT + SPACE_2 }}
        sections={sections}
      />
    </>
  )
}
