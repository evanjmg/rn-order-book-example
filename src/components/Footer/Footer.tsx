import React, { FunctionComponent } from 'react'
import { View } from 'react-native'
import { colors } from 'src/styles/colors.styles'
import { OButton } from '../OButton/OButton'
import { styles } from './Footer.styles'

export interface FooterProps {
  isSocketDead: boolean
  onToggleFeed: () => void
  onToggleSocket: () => void
}

export const Footer: FunctionComponent<FooterProps> = ({
  onToggleFeed,
  onToggleSocket,
  isSocketDead,
}) => {
  return (
    <View style={styles.container}>
      <OButton
        style={[styles.button, styles.left]}
        backgroundColor={colors.PRIMARY}
        title="Toggle Feed"
        onPress={onToggleFeed}
      />
      <OButton
        style={[styles.button, styles.right]}
        backgroundColor={colors.NEGATIVE}
        title={isSocketDead ? 'Reconnect' : 'Kill Feed'}
        onPress={onToggleSocket}
      />
    </View>
  )
}
