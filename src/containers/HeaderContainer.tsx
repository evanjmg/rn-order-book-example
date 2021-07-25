import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Header } from 'src/components/Header/Header'
import { selectGroup } from 'src/state/reducers/ordersReducer'
import { getGroup } from 'src/state/selectors/ordersSelectors'

export const HeaderContainer = () => {
  const group = useSelector(getGroup)
  const dispatch = useDispatch();

  return <Header value={group} onValueChange={(value) => {
    dispatch(selectGroup(value))
  }}></Header>
}