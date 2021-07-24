import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Header } from 'src/components/Header/Header'
import { selectGroup } from 'src/state/actions/groupActions'

export const HeaderContainer = () => {
  const toggle = useSelector(() => {})
  const dispatch = useDispatch();

  return <Header onValueChange={(value) => {
    dispatch(selectGroup(value))
  }}></Header>
}