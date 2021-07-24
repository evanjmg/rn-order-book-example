import { StyleSheet } from "react-native";
import { colors } from "src/styles/colors.styles";
import { SPACE } from "src/styles/spacers.styles";

export const styles = StyleSheet.create({
  container: {
    padding: SPACE,
  },
  text: {
    color: colors.WHITE,
    textAlign: 'center'
  }
})