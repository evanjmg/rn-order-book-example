import { StyleSheet } from "react-native";
import { colors } from "src/styles/colors.styles";
import { isWeb } from "src/styles/mediaHelpers";
import { CONTENT_PADDING, SPACE, SPACE_2 } from "src/styles/spacers.styles";

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: CONTENT_PADDING,
    paddingVertical: SPACE_2,
    flexDirection: 'row',
    backgroundColor: colors.BACKGROUND,
    bottom: 0,
    justifyContent: 'space-around',
    position: isWeb ? 'fixed' as any : 'relative',
    width: '100%',
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