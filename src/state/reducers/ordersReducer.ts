import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Order, OrderUpdateResponse } from 'src/models/OrderUpdateResponse'
import { OrderSide } from 'src/models/OrderSide'
import { mergeData } from './utils/orderReducerUtils'
import { MarketsEnum } from 'src/enums/MarketsEnum'

export const DEFAULT_GROUP = 0.5

export interface OrdersState {
  group: number
  bids: OrderSide
  asks: OrderSide
  feed: MarketsEnum[]
  largestBidOrder: Order | null
  largestAskOrder: Order | null
  hasError: boolean
}
const DEFAULT_STATE: OrdersState = {
  hasError: false,
  group: DEFAULT_GROUP,
  feed: [MarketsEnum.btc],
  bids: {},
  asks: {},
  largestBidOrder: null,
  largestAskOrder: null,
}

export const ordersSlice = createSlice({
  name: 'orders',
  initialState: DEFAULT_STATE,
  reducers: {
    toggleInitialize: (state) => state,
    selectGroup: (state, { payload: group }) => ({ ...state, group }),
    initialize: (_, { payload: feed }: PayloadAction<MarketsEnum[]>) => {
      return { ...DEFAULT_STATE, feed, hasError: false }
    },
    invalidate: ({ feed }) => {
      return { ...DEFAULT_STATE, feed, hasError: true }
    },
    updateReceived: (
      state,
      { payload }: PayloadAction<OrderUpdateResponse[]>
    ) => {
      let {
        bids: previousBids,
        asks: previousAsks,
        largestAskOrder: previousAskOrder,
        largestBidOrder: previousBidOrder,
      } = state
      let bids = previousBids
      let asks = previousAsks
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
export const {
  initialize,
  updateReceived,
  invalidate,
  toggleInitialize,
  selectGroup,
} = ordersSlice.actions
export const ordersReducer = ordersSlice.reducer
