import { StyleSheet } from "react-native";
import { colors } from "src/styles/colors.styles";
import { SPACE } from "src/styles/spacers.styles";

const inputStyle = {
  color: colors.WHITE,

}
export const styles = StyleSheet.create({
  inputIOS: inputStyle,
  viewContainer: {
    backgroundColor: colors.NEUTRAL_1,
    flex: 0,
    padding: SPACE / 2,
    borderRadius: SPACE / 2,
  },
  inputAndroid: inputStyle,
})