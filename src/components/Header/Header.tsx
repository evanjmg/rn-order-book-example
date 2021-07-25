import React, { FunctionComponent } from 'react'
import { View, Text } from 'react-native'
import { styles } from './Header.styles'
import { GroupSelect } from '../GroupSelect/GroupSelect'

export interface HeaderProps {
  value: number
  onValueChange: (value: number) => void
}
export const Header: FunctionComponent<HeaderProps> = ({
  value,
  onValueChange,
}) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>Order Book</Text>
      </View>
      <GroupSelect value={value} onValueChange={onValueChange} />
    </View>
  )
}
