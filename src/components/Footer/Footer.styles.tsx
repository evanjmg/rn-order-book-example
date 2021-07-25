import { StyleSheet } from "react-native";
import { CONTENT_PADDING, SPACE, SPACE_2 } from "src/styles/spacers.styles";

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: CONTENT_PADDING,
    paddingVertical: SPACE_2,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    flex: 1,
  },
  right: {
    marginLeft: SPACE,
  },
  left: {
    marginRight: SPACE,
  },
})