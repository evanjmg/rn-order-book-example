import { MarketsEnum } from 'src/enums/MarketsEnum'
import { OrderUpdateResponse } from 'src/models/OrderUpdateResponse'

const buildActionType = (key: string, parent: string) => parent + '/' + key

// @TODO: clean up and use typesafe actions
export const ORDERS_PARENT_KEY = 'orders'
export const INITIALIZE_ORDERS = 'initialize'
export const UPDATE_RECEIVED = 'updateReceived'

export const ORDERS_INITIALIZE_ORDERS = buildActionType(
  INITIALIZE_ORDERS,
  ORDERS_PARENT_KEY
)
export const ORDERS_UPDATE_RECEIVED = buildActionType(
  UPDATE_RECEIVED,
  ORDERS_PARENT_KEY
)

export const initializeOrders = (payload: MarketsEnum[]) => ({
  type: ORDERS_INITIALIZE_ORDERS,
  payload,
})

export const updateReceived = (payload: OrderUpdateResponse[]) => ({
  type: ORDERS_UPDATE_RECEIVED,
  payload,
})
