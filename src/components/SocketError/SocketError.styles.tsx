import { StyleSheet } from "react-native";
import { colors } from "src/styles/colors.styles";
import { SPACE } from "src/styles/spacers.styles";

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: SPACE * 3
  },
  text: {
    color: colors.WHITE,
    textAlign: 'center',
  },
})