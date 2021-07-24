import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { OrderActionType, updateReceived } from '../actions/orderActions'
import { Order, OrderUpdateResponse } from 'src/models/OrderUpdateResponse'
import { OrderSide } from 'src/models/OrderSide'
import { mergeData } from './utils/orderReducerUtils'

const DEFAULT_GROUP = 0.5

export interface OrdersState {
  group: number
  bids: OrderSide
  asks: OrderSide
  largestBidOrder: Order | null
  largestAskOrder: Order | null
}

export const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    group: DEFAULT_GROUP,
    bids: {},
    asks: {},
    largestBidOrder: null,
    largestAskOrder: null,
  } as OrdersState,
  reducers: {
    ['update-received']: (
      state,
      { payload }: PayloadAction<OrderUpdateResponse[]>
    ) => {
      let {
        bids: previousBids,
        asks: previousAsks,
        largestAskOrder: previousAskOrder,
        largestBidOrder: previousBidOrder,
      } = state
      let bids = {}
      let asks = {}
      let largestAskOrder = previousAskOrder
      let largestBidOrder = previousBidOrder

      payload.forEach((item) => {
        const bidsRes = mergeData(previousBids, item.bids, previousBidOrder)
        bids = bidsRes.side
        largestBidOrder = bidsRes.whaleOrder

        const asksRes = mergeData(previousAsks, item.asks, previousAskOrder)
        asks = asksRes.side
        largestAskOrder = asksRes.whaleOrder
      })
      return {
        ...state,
        bids,
        asks,
        largestAskOrder,
        largestBidOrder,
      }
    },
  },
})

export const ordersReducer = ordersSlice.reducer
