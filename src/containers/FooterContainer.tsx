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
import { isWeb } from 'src/styles/mediaHelpers'

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
          const message = 'Please press reconnect in order to continue'
          isWeb ? alert(message) : Alert.alert(
            'Connection Failure',
          )
        } else {
          dispatch(toggleInitialize())
        }
      }}
    />
  )
}
