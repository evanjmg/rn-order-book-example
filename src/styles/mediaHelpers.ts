import { Platform, useWindowDimensions } from 'react-native'

export const isWeb = Platform.OS === 'web'
export const minDesktopDimension = 1080

export const useIsHorizontal = () => {
  const { width } = useWindowDimensions()
  return isWeb && width > minDesktopDimension
}
