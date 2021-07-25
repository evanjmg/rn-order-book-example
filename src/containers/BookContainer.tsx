import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Book } from 'src/components/Book/Book'
import { SocketError } from 'src/components/SocketError/SocketError'
import { connectSocket } from 'src/state/actions/socketActions'
import { getErrorState, getOrderBook } from 'src/state/selectors/ordersSelectors'

export const BookContainer = () => {
  const book = useSelector(getOrderBook)
  const hasError = useSelector(getErrorState)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(connectSocket())
  },[])

  return hasError ?  <SocketError /> : <Book sections={book}  />
}