import { createSelector } from 'reselect'
import numeral from 'numeral'
import { BookItemCell } from 'src/models/BookItemCell'
import { OrderSide } from 'src/models/OrderSide'
import { Order } from 'src/models/OrderUpdateResponse'
import { AppRootState } from '../store'
import { SectionType } from 'src/enums/SectionType'

export const getOrdersState = (state: AppRootState) => state.orders

export const getErrorState = createSelector(
  getOrdersState,
  ({ hasError }) => hasError
)
export const getFeed = createSelector(getOrdersState, ({ feed }) => feed)

const DEFAULT_FORMAT = '0,0'
const DEFAULT_PRICE_FORMAT = '0,0.00'
const PERCENTAGE_FORMAT = '0.00%'
const SLICE_AMOUNT = 12

const getSide = (
  side: OrderSide,
  largestOrder: Order | null,
  willTakeLastItems: boolean
): BookItemCell[] => {
  const sortedKeys = Object.keys(side).sort(
    (a, b) => parseFloat(b) - parseFloat(a)
  )
  const length = sortedKeys.length
  const filtered =
    willTakeLastItems && length > SLICE_AMOUNT
      ? sortedKeys.slice(length - SLICE_AMOUNT, length)
      : sortedKeys.slice(0, SLICE_AMOUNT)

  return filtered.map((key) => {
    const size = side[key]
    const price = parseFloat(key)
    const priceString = numeral(price).format(DEFAULT_PRICE_FORMAT)
    return {
      price,
      priceString,
      key: priceString,
      sizeString: numeral(size).format(DEFAULT_FORMAT),
      totalString: numeral(price * size).format(DEFAULT_FORMAT),
      relativeSize: largestOrder ? size / largestOrder[1] : 0,
    }
  })
}

const getAsks = createSelector(getOrdersState, ({ asks, largestAskOrder }) =>
  getSide(asks, largestAskOrder, true)
)

const getBids = createSelector(getOrdersState, ({ bids, largestBidOrder }) =>
  getSide(bids, largestBidOrder, false)
)

export const getOrderBook = createSelector(getBids, getAsks, (bids, asks) => {
  const lastAsk = asks[asks.length - 1]
  const [firstBid] = bids
  const hasBoth = lastAsk && firstBid
  const spreadDiff = hasBoth ? lastAsk.price - firstBid.price : 0
  const spread = `${numeral(spreadDiff).format(DEFAULT_FORMAT)} (${numeral(
    hasBoth ? spreadDiff / firstBid.price : 0
  ).format(PERCENTAGE_FORMAT)})`
  return [
    { data: asks, key: SectionType.asks },
    { data: [{ priceString: spread, key: spread }], key: SectionType.spread },
    { data: bids, key: SectionType.bids },
  ]
})
