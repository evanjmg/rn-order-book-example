import React, { FunctionComponent } from 'react'
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { styles } from './OButton.styles'

export interface OButtonProps extends TouchableOpacityProps {
  backgroundColor: string
  title: string
}

export const OButton: FunctionComponent<OButtonProps> = ({
  title,
  backgroundColor,
  ...props
}) => {
  return (
    <TouchableOpacity {...props} style={[styles.container, { backgroundColor }, props.style]}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}
