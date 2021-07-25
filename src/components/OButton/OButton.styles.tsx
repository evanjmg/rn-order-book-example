import { StyleSheet } from "react-native";
import { colors } from "src/styles/colors.styles";
import { SPACE, SPACE_2 } from "src/styles/spacers.styles";

export const styles = StyleSheet.create({
  container: {
    minHeight: 40, // min height for buttons
    paddingVertical: SPACE,
    paddingHorizontal: SPACE_2,
    borderRadius: SPACE,
  },
  text: {
    color: colors.WHITE,
    fontSize: 16,
    textAlign: 'center',
  },
})