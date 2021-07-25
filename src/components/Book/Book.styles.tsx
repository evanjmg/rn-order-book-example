import { StyleSheet } from "react-native";
import { colors } from "src/styles/colors.styles";
import { CONTENT_PADDING, SPACE } from "src/styles/spacers.styles";

export const styles = StyleSheet.create({
  headTitle: {
    color: colors.WHITE,
    opacity: 0.4,
    textTransform: 'uppercase',
  },
  head: {
    flexDirection: 'row',
    paddingVertical: SPACE,
    flex: 1,
    display: 'flex',
    backgroundColor: colors.BACKGROUND,
    paddingHorizontal: CONTENT_PADDING,
    justifyContent: 'space-between',
    zIndex: 2,
  },
})