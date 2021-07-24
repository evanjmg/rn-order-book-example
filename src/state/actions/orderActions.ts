import { MarketsEnum } from 'src/enums/MarketsEnum'
import { OrderUpdateResponse } from 'src/models/OrderUpdateResponse'

export enum OrderActionType {
  initializeOrders = 'orders/initialize',
  updateReceived = 'orders/update-received',
}

export const initializeOrders = (payload: MarketsEnum[]) => ({
  type: OrderActionType.initializeOrders,
  payload,
})

export const updateReceived = (payload: OrderUpdateResponse[]) => ({
  type: OrderActionType.updateReceived,
  payload,
})
