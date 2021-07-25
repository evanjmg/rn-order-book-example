import { StyleSheet } from "react-native";
import { CONTENT_PADDING, SPACE } from "src/styles/spacers.styles";

export const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  content: {
    flexDirection: 'row',
    paddingVertical: SPACE,
    flex: 1,
    display: 'flex',
    paddingHorizontal: CONTENT_PADDING,
    justifyContent: 'space-between',
    zIndex: 2,
  },
  bar: {
    height: '100%',
    position: 'absolute',
    opacity: 0.5,
    zIndex: 1,
  }
})