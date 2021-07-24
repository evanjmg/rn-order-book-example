import React,  { FunctionComponent }  from 'react'
import { View, Text } from 'react-native'
import { GroupSelect } from '../GroupSelect/GroupSelect'

export interface HeaderProps {
  onValueChange: (value: number) => void
}
export const Header: FunctionComponent<HeaderProps> = () => {
  return <View>
    <View>
      <Text>Order Book</Text>
    </View>
    <GroupSelect onValueChange={console.log} />
  </View>
}