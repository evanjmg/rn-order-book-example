import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Header } from 'src/components/Header/Header'
import { selectGroup } from 'src/state/reducers/ordersReducer'
import { getGroup, getSpread } from 'src/state/selectors/ordersSelectors'
import { useIsHorizontal } from 'src/styles/mediaHelpers'

export const HeaderContainer = () => {
  const group = useSelector(getGroup)
  const dispatch = useDispatch()
  const isHorizontal = useIsHorizontal()
  const spread = useSelector(getSpread)

  return (
    <Header
      spread={isHorizontal ? spread : null}
      value={group}
      onValueChange={(value) => {
        dispatch(selectGroup(value))
      }}
    ></Header>
  )
}
