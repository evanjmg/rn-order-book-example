import React, { FunctionComponent } from 'react'
import RNPickerSelect from 'react-native-picker-select'
import { styles } from './GroupSelect.styles'

export const SUPPORTED_GROUPS = [0.5, 1, 2.5]

export interface GroupSelectProps {
  value: number
  onValueChange: (value: string) => void
}
export const GroupSelect: FunctionComponent<GroupSelectProps> = ({
  onValueChange,
  value,
}) => {
  console.log(value)
  return (
    <RNPickerSelect
      onValueChange={onValueChange}
      value={String(value)}
      style={styles}
      placeholder={{}}
      items={SUPPORTED_GROUPS.map((item) => ({
        label: `Group ${item}`,
        value: String(item),
      }))}
    />
  )
}
