import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Book } from 'src/components/Book/Book'
import { connectSocket } from 'src/state/actions/socketActions'
import { getOrderBook } from 'src/state/selectors/ordersSelectors'

export const BookContainer = () => {
  const book = useSelector(getOrderBook)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(connectSocket())
  },[])
  return  <Book sections={book} />
}