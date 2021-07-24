import { StyleSheet } from "react-native";
import { colors } from "src/styles/colors.styles";
import { styles as bookItemStyles } from '../BookItem/BookItem.styles'

export const styles = StyleSheet.create({
  headTitle: {
    color: colors.WHITE,
    opacity: 0.4,
    textTransform: 'uppercase',
  },
  head: bookItemStyles.content,
})