import { createSelector } from 'reselect'
import numeral from 'numeral'
import { BookItemCell } from 'src/models/BookItemCell'
import { OrderSide } from 'src/models/OrderSide'
import { Order } from 'src/models/OrderUpdateResponse'
import { SectionType } from 'src/enums/SectionType'
import { AppRootState } from '../store'
import { DEFAULT_GROUP } from '../reducers/ordersReducer'
import { isWeb } from 'src/styles/mediaHelpers'

export const getOrdersState = (state: AppRootState) => state.orders

export const getErrorState = createSelector(
  getOrdersState,
  ({ hasError }) => hasError
)
export const getFeed = createSelector(getOrdersState, ({ feed }) => feed)
export const getGroup = createSelector(getOrdersState, ({ group }) => group)

const DEFAULT_FORMAT = '0,0'
const DEFAULT_PRICE_FORMAT = '0,0.00'
const PERCENTAGE_FORMAT = '0.00%'
const SLICE_AMOUNT = isWeb ? 18 : 12

interface GroupResponse {
  groupedKeys: { displayKey: number; key: string }[]
  strippedKeyMap: { [key: string]: string[] }
}
const roundKey = (key: string, group: number) => {
  const currentKey = parseFloat(key)
  return Math.round(currentKey / group) * group
}

const groupKeys = (group: number, keys: string[]): GroupResponse => {
  if (group === DEFAULT_GROUP) {
    return {
      groupedKeys: keys.map((key) => ({ key, displayKey: parseFloat(key) })),
      strippedKeyMap: {},
    }
  }
  return keys.reduce(
    (acc, key) => {
      const lastGrouped = acc.groupedKeys[acc.groupedKeys.length - 1]
      const rounded = roundKey(key, group)

      if (lastGrouped && rounded === lastGrouped.displayKey) {
        // create association between groupedKey and stripped one
        acc.strippedKeyMap[lastGrouped.key] = [
          ...(acc.strippedKeyMap[key] || []),
          key,
        ]
      } else {
        acc.groupedKeys.push({ key, displayKey: roundKey(key, group) })
      }

      return acc
    },
    { groupedKeys: [], strippedKeyMap: {} } as GroupResponse
  )
}

const getSide = (
  side: OrderSide,
  largestOrder: Order | null,
  willTakeLastItems: boolean,
  group: number
): BookItemCell[] => {
  const sortedKeys = Object.keys(side).sort(
    (a, b) => parseFloat(b) - parseFloat(a)
  )
  const length = sortedKeys.length
  const { groupedKeys, strippedKeyMap } = groupKeys(group, sortedKeys)
  const filtered =
    willTakeLastItems && length > SLICE_AMOUNT
      ? groupedKeys.slice(length - SLICE_AMOUNT, length)
      : groupedKeys.slice(0, SLICE_AMOUNT)

  return filtered.map(({ key, displayKey }) => {
    const size = side[key]
    const otherSizes = (strippedKeyMap[key] || []).map((val) => side[val])
    const combinedSize = [size, ...otherSizes].reduce(
      (acc, val) => acc + val,
      0
    )

    const priceString = numeral(displayKey).format(DEFAULT_PRICE_FORMAT)
    return {
      price: displayKey,
      priceString,
      key: priceString,
      sizeString: numeral(combinedSize).format(DEFAULT_FORMAT),
      totalString: numeral(displayKey * combinedSize).format(DEFAULT_FORMAT),
      relativeSize: largestOrder ? combinedSize / largestOrder[1] : 0,
    }
  })
}

const getAsks = createSelector(
  getOrdersState,
  ({ asks, largestAskOrder, group }) =>
    getSide(asks, largestAskOrder, true, group)
)

const getBids = createSelector(
  getOrdersState,
  ({ bids, largestBidOrder, group }) =>
    getSide(bids, largestBidOrder, false, group)
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

export const getSpread = createSelector(getOrderBook, (book) => {
  return book.find(({ key }) => key === SectionType.spread)?.data[0].priceString
})
