import React from 'react'
import { Alert } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Footer } from 'src/components/Footer/Footer'
import {
  disconnectSocket,
  connectSocket,
} from 'src/state/actions/socketActions'
import { toggleInitialize } from 'src/state/reducers/ordersReducer'
import { getErrorState } from 'src/state/selectors/ordersSelectors'

export const FooterContainer = () => {
  const hasError = useSelector(getErrorState)
  const dispatch = useDispatch()

  return (
    <Footer
      isSocketDead={hasError}
      onToggleSocket={() => {
        dispatch(hasError ? connectSocket() : disconnectSocket())
      }}
      onToggleFeed={() => {
        if (hasError) {
          Alert.alert(
            'Connection Failure',
            'Please press reconnect in order to continue'
          )
        } else {
          dispatch(toggleInitialize())
        }
      }}
    />
  )
}
