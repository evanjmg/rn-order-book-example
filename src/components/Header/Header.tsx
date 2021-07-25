import React, { FunctionComponent } from 'react'
import { View, Text } from 'react-native'
import { styles } from './Header.styles'
import { GroupSelect } from '../GroupSelect/GroupSelect'
import { SpreadCell } from '../SpreadCell/SpreadCell'

export interface HeaderProps {
  value: number
  spread: string | null | undefined
  onValueChange: (value: string) => void
}
export const Header: FunctionComponent<HeaderProps> = ({
  value,
  spread,
  onValueChange,
}) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>Order Book</Text>
      </View>
      {spread && <SpreadCell spread={spread} />}
      <GroupSelect value={value} onValueChange={onValueChange} />
    </View>
  )
}
