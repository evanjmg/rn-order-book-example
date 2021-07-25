import { StyleSheet } from "react-native";
import { colors } from "src/styles/colors.styles";
import { SPACE, SPACE_2 } from "src/styles/spacers.styles";

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACE_2,
    borderBottomColor: colors.NEUTRAL_1,
    borderBottomWidth: 1,
    paddingVertical: SPACE,
  },
  text: {
    color: colors.WHITE
  }
})