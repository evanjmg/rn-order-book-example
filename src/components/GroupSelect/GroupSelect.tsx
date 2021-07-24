import React, { FunctionComponent }  from 'react'
import RNPickerSelect from 'react-native-picker-select'

export interface GroupSelectProps {
  onValueChange: (value: number) => void
}
export const GroupSelect: FunctionComponent<GroupSelectProps> = ({ onValueChange }) => {
  return <RNPickerSelect
    onValueChange={onValueChange}
    items={[
      { label: 'Football', value: 'football' },
      { label: 'Baseball', value: 'baseball' },
      { label: 'Hockey', value: 'hockey' },
    ]}
  />
}