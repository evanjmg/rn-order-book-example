import React, { FunctionComponent } from 'react'
import {
  FlatList,
  SectionList,
  Text,
  useWindowDimensions,
  View,
} from 'react-native'
import { SectionType } from 'src/enums/SectionType'
import { BookItemCell } from 'src/models/BookItemCell'
import { BookSection } from 'src/models/BookSection'
import { BookItem } from '../BookItem/BookItem'
import { styles } from './Book.styles'
import { SpreadCell } from '../SpreadCell/SpreadCell'
import {
  useIsHorizontal,
} from 'src/styles/mediaHelpers'

const TopBar = () => (
  <View style={styles.head}>
    <Text style={styles.headTitle}>Price</Text>
    <Text style={styles.headTitle}>Size</Text>
    <Text style={styles.headTitle}>Total</Text>
  </View>
)

export interface BookProps {
  sections: BookSection[]
}
export const Book: FunctionComponent<BookProps> = ({ sections }) => {
  const isHorizontal = useIsHorizontal()

  return (
      <SectionList
        horizontal={isHorizontal}
        renderSectionHeader={({ section }) =>
          isHorizontal || section.key !== SectionType.asks ? <></> : <TopBar />
        }
        stickySectionHeadersEnabled
        renderItem={({ item: sectionItem }) => (
          <FlatList
            data={sectionItem.data}
            ListHeaderComponent={isHorizontal ? <TopBar /> : <></>}
            contentContainerStyle={{
              flex: 1,
              width: isHorizontal ? '50vw' : 'auto',
            }}
            renderItem={({ item }) =>
              sectionItem.key === SectionType.spread ? (
                <SpreadCell spread={item.priceString} />
              ) : (
                <BookItem type={sectionItem.key} data={item as BookItemCell} />
              )
            }
          />
        )}
        sections={sections
          .map((section) => ({ ...section, data: [{ ...section }] }))
          .filter(
            (section) =>
              section.data.length &&
              !(section.key === SectionType.spread && isHorizontal)
          )}
      />
  )
}
