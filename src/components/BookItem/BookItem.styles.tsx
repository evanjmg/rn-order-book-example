import { StyleSheet } from "react-native";
import { SPACE } from "src/styles/spacers.styles";

export const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  content: {
    flexDirection: 'row',
    paddingVertical: SPACE,
    paddingHorizontal: SPACE * 6,
    justifyContent: 'space-between',
    zIndex: 2,
  },
  text: {

  },
  bar: {
    height: '100%',
    position: 'absolute',
    opacity: 0.5,
    zIndex: 1,
  }
})