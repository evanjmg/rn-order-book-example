import { MarketsEnum } from 'src/enums/MarketsEnum'

export type Price = number
export type Size = number
export type Order = [Price, Size]

export interface OrderUpdateResponse {
  feed: string
  bids: Order[]
  asks: Order[]
  product_id: MarketsEnum
}
